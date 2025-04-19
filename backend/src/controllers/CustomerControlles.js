const { where } = require("sequelize");
const { Op } = require("sequelize");
const { khach_hang, refreshtoken } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const transporter = require("../config/mail");

const createAccount = async (req, res) => {
	try {
		const { email, so_dt, ho_ten, mat_khau } = req.body;

		const validEmail =
			/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

		if (!validEmail.test(email)) {
			return res.status(400).json({
				status: 400,
				message: "Email không hợp lệ. Thử lại ",
				type: "email-failed",
			});
		}

		const existsEmail = await khach_hang.findOne({
			where: { email: email },
		});
		if (existsEmail) {
			return res.status(400).json({
				status: 400,
				message: "Email đã tồn tại. Thử lại ",
				type: "email-exists",
			});
		}

		const regexPhoneNumber = /(0[3|5|7|8|9])+([0-9]{8})\b/g;
		if (!regexPhoneNumber.test(so_dt)) {
			return res.status(400).json({
				status: 400,
				message: "Số điện thoại không hợp lệ. Thử lại ",
				type: "phone-failed",
			});
		}

		if (mat_khau < 8 || mat_khau > 16) {
			return res.status(400).json({
				status: 400,
				message: "Mật khẩu phải có độ dài từ 8-16 kí tự. Thử lại",
				type: "pass-length",
			});
		}

		const regexPassword = /[@#!&*/$.,]/;
		if (!regexPassword.test(mat_khau)) {
			return res.status(400).json({
				status: 400,
				message:
					"Mật khẩu phải chứa 1 ký tự đặc biệt [@#!&*/$.,]. Thử lại",
				type: "pass-special",
			});
		}

		const nameRegex = /^[A-Za-zÀ-ỹ\s]+$/;
		if (!nameRegex.test(ho_ten)) {
			return res.status(400).json({
				status: 400,
				message: "Họ và tên chỉ chứa khoảng trắng và chữ cái. Thử lại ",
				type: "name-failed",
			});
		}

		const saltRounds = parseInt(process.env.SALT_ROUNDS);
		console.log(saltRounds);

		const hashPassword = await bcrypt.hash(mat_khau, saltRounds);

		const result = await khach_hang.create({
			email,
			so_dt,
			ho_ten,
			mat_khau: hashPassword,
		});
		if (result) {
			res.json({
				status: 200,
				message: "Tạo tài khoản thành công",
				data: result,
			});
		} else {
			res.json({
				status: 400,
				message: "Tạo tài khoản thất bại",
				data: "",
			});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			status: 500,
			message: error.message,
		});
	}
};

const login = async (req, res) => {
	try {
		const { inputData, password } = req.body;

		const validEmail =
			/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;
		const isEmail = validEmail.test(inputData);

		const regexPhoneNumber = /^(0[3|5|7|8|9])[0-9]{8}$/;
		const isPhoneNumber = regexPhoneNumber.test(inputData);

		if (!isEmail && !isPhoneNumber) {
			return res.status(400).json({
				status: 400,
				message: "Email hoặc số điện thoại không hợp lệ!",
				type: "invalid-input",
			});
		}

		const customer = await khach_hang.findOne({
			where: {
				[Op.or]: [{ email: inputData }, { so_dt: inputData }],
			},
		});
		console.log("khách hàng : ", customer);

		if (!customer) {
			return res.status(400).json({
				status: 400,
				message: "Người dùng không tồn tại",
				type: "customer-not-exists",
			});
		}

		if (isEmail && customer.email !== inputData) {
			return res.status(400).json({
				status: 400,
				message: "Email không đúng !",
				type: "email-mismatch",
			});
		}

		if (isPhoneNumber && customer.so_dt !== inputData) {
			return res.status(400).json({
				status: 400,
				message: "Số điện thoại không đúng!",
				type: "phone-mismatch",
			});
		}

		const isCompare = await bcrypt.compare(password, customer.mat_khau);
		if (!isCompare) {
			return res.status(400).json({
				status: 400,
				message: "Mật khẩu không đúng",
				type: "pass-failed",
			});
		}

		await refreshtoken.destroy({
			where: { id_khach_hang: customer.id_khach_hang },
		});

		const token = jwt.sign({ email: inputData }, process.env.SECRET_KEY, {
			expiresIn: "60s",
		});

		const refreshToken = jwt.sign(
			{ email: inputData },
			process.env.SECRET_REFRESH_TOKEN_KEY,
			{
				expiresIn: "30 days",
			}
		);
		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: false,
			path: "/",
			sameSite: "strict",
		});

		await refreshtoken.create({
			id_khach_hang: customer.id_khach_hang,
			refreshToken: refreshToken,
		});

		res.json({
			status: 200,
			message: "Đăng nhập thành công",
			data: {
				accessToken: token,
				id_khach_hang: customer.id_khach_hang,
			},
		});
	} catch (error) {
		console.log(error);
		res.json({
			status: 500,
			message: error.message,
		});
	}
};

const sendOTP = async (req, res) => {
	try {
		const { email } = req.body;

		const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		if (!validEmail.test(email)) {
			return res.status(400).json({
				status: 400,
				message: "Email không hợp lệ. Thử lại!",
				type: "email-failure",
			});
		}

		const data = await khach_hang.findOne({ where: { email: email } });
		if (!data) {
			return res.status(400).json({
				status: 400,
				message: "Email không tồn tại. Thử lại!",
				type: "email-not-exists",
			});
		}

		const OTP = Math.floor(1000 + Math.random() * 9999);
		const isExpired = Date.now() + 5 * 60 * 1000;

		const hashOTP = await bcrypt.hash(OTP.toString(), 10);

		const mailOptions = {
			from: "nguyenldpd10357@gmail.com",
			to: email,
			subject: "Mã OTP",
			html: `
					<div style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.5; color: #333;">
						<h2 style="color: black;">Mã OTP Xác Nhận</h2>
						<p style="color: black;">Chào bạn : <strong>${email}</strong>,</p>
						<p style="color: black;">Mã OTP của bạn để đăng nhập vào hệ thống:</p>
						<div style="background: #f4f4f4; padding: 10px 20px; border-radius: 5px; display: inline-block;">
							<h3 style="font-weight: bold; font-size: 16px; margin: 0; color: #d9534f;">${OTP}</h3>
						</div>
						<p><strong  style="color: black;">Lưu ý:</strong> Mã này có hiệu lực trong <span style="color: #5B9EE1;font-weight : bold">5 phút</span>.</p>
						<p style="color: black;">Nếu bạn không yêu cầu mã này, hãy bỏ qua email này.</p>
					</div>

        		`,
		};
		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				res.status(500).json({
					error: "sendmail fail" + error,
				});
			} else {
				res.status(200).json({
					message: "sendmail success " + info.response,
				});
			}
		});

		data.otp = hashOTP;
		data.expired = isExpired;
		await data.save();

		return res.status(200).json({
			status: 200,
			message: "gửi OTP thành công",
			data: { OTP, isExpired },
		});
	} catch (error) {
		console.log(error);
		res.json({
			status: 500,
			message: error.message,
		});
	}
};

const refreshAccessToken = async (req, res) => {
	try {
		const refreshTokens = req.cookies.refreshToken;

		if (!refreshTokens) {
			return res.status(401).json({
				status: 401,
				message: "Bạn chưa đăng nhập",
			});
		}

		// check in database
		const refreshTokenDb = await refreshtoken.findOne({
			where: { refreshToken: refreshTokens },
		});

		if (!refreshTokenDb) {
			return res.status(403).json({
				status: 403,
				message: "Token không tồn tại",
			});
		}

		jwt.verify(
			refreshTokens,
			process.env.SECRET_REFRESH_TOKEN_KEY,
			async (err, decoded) => {
				if (err) {
					return res.status(403).json({
						status: 403,
						message: "Token không hợp lệ",
					});
				}

				// create new token && refreshtoken

				const newAccessToken = jwt.sign(
					{ id_khach_hang: decoded.id_khach_hang },
					process.env.SECRET_KEY,
					{ expiresIn: "60s" }
				);

				const newRefreshToken = jwt.sign(
					{ id_khach_hang: decoded.id_khach_hang },
					process.env.SECRET_REFRESH_TOKEN_KEY,
					{ expiresIn: "30 days" }
				);

				// update in database
				await refreshtoken.update(
					{
						refreshToken: newRefreshToken,
					},
					{
						where: { refreshToken: refreshTokens },
					}
				);

				res.cookie("refreshToken", newRefreshToken, {
					httpOnly: true,
					secure: false,
					path: "/",
					sameSite: "strict",
				});

				res.status(200).json({
					status: 200,
					message: "refreshToken thành công",
					accessToken: newAccessToken,
				});
			}
		);
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			status: 500,
			message: error.message,
		});
	}
};

const updatePassword = async (req, res) => {
	try {
		const { password, confirmPassword } = req.body;
		const { id_khach_hang } = req.params;

		const user = await khach_hang.findOne({
			where: { id_khach_hang: id_khach_hang },
		});

		if (!user) {
			return res.status(400).json({
				status: 400,
				message: "khách hàng không tồn tại",
			});
		}

		if (!(password.length >= 8 && password.length <= 16)) {
			return res.status(400).json({
				status: 400,
				message: "Độ dài mật khẩu phải từ 8-16 ký tự",
				type: "pass-length",
			});
		}
		const strongPassword =
			/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
		if (!strongPassword.test(password)) {
			return res.status(400).json({
				status: 400,
				message:
					"Mật khẩu phải chứa ít nhất 1 chữ cái, 1 số và 1 ký tự đặc biệt",
				type: "weak_password",
			});
		}

		if (confirmPassword !== password) {
			return res.status(400).json({
				status: 400,
				message: "Mật khẩu xác nhận không đúng",
				type: "confirm",
			});
		}

		const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		const resetPassword = await khach_hang.update(
			{ mat_khau: hashedPassword },
			{
				where: { id_khach_hang: id_khach_hang },
			}
		);

		if (resetPassword > 0) {
			return res.status(200).json({
				status: 200,
				message: "Đổi mật khẩu thành công",
				data: resetPassword,
			});
		} else {
			return res.status(404).json({
				status: 404,
				message: "Đổi mật khẩu thất bại",
				data: "",
			});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			status: 500,
			message: error.message,
		});
	}
};

const customerInformation = async (req, res) => {
	try {
		const { id_khach_hang } = req.params;
		const customer = await khach_hang.findOne({
			where: { id_khach_hang: id_khach_hang },
		});

		if (!customer) {
			return res.status(400).json({
				status: 400,
				message: "Khách hàng không tồn tại",
			});
		}

		return res.status(200).json({
			status: 200,
			message: "Lấy thông tin khách hàng thành công",
			data: {
				ho_ten: customer.ho_ten,
				so_dt: customer.so_dt,
				email: customer.email,
				dia_chi: customer.dia_chi,
				hinh_anh: customer.hinh_anh,
			},
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			status: 500,
			message: error.message,
		});
	}
};

const updateCustomer = async (req, res) => {
	try {
		const { id_khach_hang } = req.params;
		const { ho_ten, email, dia_chi, so_dt, hinh_anh } = req.body;

		const user = await khach_hang.findOne({
			where: {
				id_khach_hang: id_khach_hang,
			},
		});

		console.log(user);

		if (!user) {
			return res.status(400).json({
				status: 400,
				message: "Khách hàng không tồn tại",
			});
		}

		const updatedData = {};

		if (dia_chi) updatedData.dia_chi = dia_chi;
		if (so_dt) updatedData.so_dt = so_dt;
		if (email) updatedData.email = email;
		if (ho_ten) updatedData.ho_ten = ho_ten;
		if (hinh_anh) updatedData.hinh_anh = hinh_anh;

		if (Object.keys(updatedData).length === 0) {
			return res.status(404).json({
				status: 404,
				message: "Vui lòng nhập thông tin mới mà bạn muốn cập nhật",
			});
		}

		const updateUser = await khach_hang.update(updatedData, {
			where: { id_khach_hang: user.id_khach_hang },
		});

		console.log(updateUser);

		if (updateUser > 0) {
			return res.status(200).json({
				status: 200,
				message: "Cập nhật thông tin thành công",
				data: {
					ho_ten: user.ho_ten,
					so_dt: user.so_dt,
					email: user.email,
					address: user.dia_chi,
					images: user.hinh_anh,
				},
			});
		} else {
			return res.status(200).json({
				status: 200,
				message: "Cập nhật thông tin thất bại",
				data: "",
			});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			status: 500,
			message: error.message,
		});
	}
};

module.exports = {
	createAccount,
	login,
	sendOTP,
	updatePassword,
	refreshAccessToken,
	customerInformation,
	updateCustomer,
};
