const { where } = require("sequelize");
const { khach_hang } = require("../models");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const createAccount = async (req, res) => {
	try {
		const { email, so_dt, ho_ten, mat_khau } = req.body;

		const validEmail =
			/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

		if (!validEmail.test(email)) {
			return res.status(400).json({
				status: 400,
				message: "email không hợp lệ ",
				type: "email-failed",
			});
		}

		const regexPhoneNumber = /(0[3|5|7|8|9])+([0-9]{8})\b/g;
		if (!regexPhoneNumber.test(so_dt)) {
			return res.status(400).json({
				status: 400,
				message: "số điện thoại không hợp lệ ",
				type: "phone-failed",
			});
		}

		if (mat_khau < 8 || mat_khau > 16) {
			return res.status(400).json({
				status: 400,
				message: "mật khẩu phải có độ dài từ 8-16 kí tự",
				type: "pass-length",
			});
		}

		const regexPassword = /[@#!&*/$.,]/;
		if (!regexPassword.test(mat_khau)) {
			return res.status(400).json({
				status: 400,
				message: "Mật khẩu phải chứa 1 ký tự đặc biệt /[@#!&*/$.,]/",
				type: "pass-special",
			});
		}

		const nameRegex = /^[A-Za-zÀ-ỹ\s]+$/;
		if (!nameRegex.test(ho_ten)) {
			return res.status(400).json({
				status: 400,
				message: "họ và tên chỉ chứa khoảng trắng và chữ cái ",
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
		const { email, password } = req.body;

		const validEmail =
			/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

		if (!validEmail.test(email)) {
			return res.status(400).json({
				status: 400,
				message: "Email không hợp lệ ",
				type: "email-not-exists",
			});
		}

		const customer = await khach_hang.findOne({ where: { email: email } });
		console.log("khách hàng : ", customer);

		if (!customer) {
			return res.status(400).json({
				status: 400,
				message: "Người dùng không tồn tại",
				type: "customer-not-exists",
			});
		}

		if (!email === customer.email) {
			return res.status(400).json({
				status: 400,
				message: "Email không đúng",
				type: "email-failed",
			});
		}

		const isCompare = await bcrypt.compare(password, customer.mat_khau);
		if (!isCompare) {
			res.status(400).json({
				status: 400,
				message: "Mật khẩu không đúng",
				type: "pass-failed",
			});
		}

		const token = jwt.sign({ email: email }, process.env.SECRET_KEY, {
			expiresIn: "1 days",
		});

		const refreshToken = jwt.sign(
			{ email: email },
			process.env.SECRET_REFRESH_TOKEN_KEY,
			{
				expiresIn: "30 days",
			}
		);

		// res.cookies("refreshToken", refreshToken, {
		// 	httpOnly: true,
		// 	secure: false,
		// 	path: "/",
		// 	sameSite: "strict",
		// });

		res.json({
			status: 200,
			message: "Đăng nhập thành công",
			data: {
				email,
				accessToken: token,
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

module.exports = {
	createAccount,
	login,
};
