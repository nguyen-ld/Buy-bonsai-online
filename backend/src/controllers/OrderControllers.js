const { where, Op } = require("sequelize");
const {
	don_hang,
	chi_tiet_don_hang,
	khach_hang,
	chi_tiet_gio_hang,
	gio_hang,
	san_pham,
	danh_sach_phuong_thuc_van_chuyen,
	phuong_thuc_thanh_toan,
	phuong_thuc_van_chuyen,
} = require("../models");

const checkOut = async (req, res) => {
	try {
		const {
			id_khach_hang,
			id_pt_van_chuyen,
			id_pt_thanh_toan,
			ItemProducts,
			dia_chi,
			so_dt,
			ho_ten,
			email,
		} = req.body;

		// check khach_hang

		const customer = await khach_hang.findOne({
			where: { id_khach_hang: id_khach_hang },
		});

		if (!customer) {
			return res.status(400).json({
				status: 400,
				message: "user not exist",
			});
		}
		// validate
		if (!so_dt) {
			return res.status(400).json({
				status: 400,
				message: "Vui lòng nhập Số điện thoại",
				type: "phone-empty",
			});
		}

		if (!dia_chi) {
			return res.status(400).json({
				status: 400,
				message: "Vui lòng nhập Địa chỉ",
				type: "address-empty",
			});
		}

		const regexPhone = /(0[3|5|7|8|9])+([0-9]{8})\b/g;
		if (!regexPhone.test(so_dt)) {
			return res.status(400).json({
				status: 400,
				message: "Số điện thoại không hợp lệ",
				type: "phone-valid",
			});
		}

		// update user
		const updatedData = {};

		if (dia_chi) updatedData.dia_chi = dia_chi;
		if (so_dt) updatedData.so_dt = so_dt;
		if (email) updatedData.email = email;
		if (ho_ten) updatedData.ho_ten = ho_ten;

		const updateUser = await khach_hang.update(updatedData, {
			where: { id_khach_hang: id_khach_hang },
		});

		console.log(updateUser);

		// get cart by user
		const cart = await gio_hang.findOne({
			where: { id_khach_hang: id_khach_hang },
		});

		if (!cart || cart.length === 0) {
			return res.status(400).json({
				status: 400,
				message: "Giỏ hàng không tồn tại",
			});
		}

		const productList = await san_pham.findAll({
			where: {
				id_san_pham: {
					[Op.in]: ItemProducts.map((item) => item.id_san_pham),
				},
			},
		});

		if (productList.length !== ItemProducts.length) {
			return res.status(400).json({
				status: 400,
				message: "Có sản phẩm không tồn tại trong hệ thống",
			});
		}

		const item = await chi_tiet_gio_hang.findOne({
			where: {
				id_gio_hang: cart.id_gio_hang,
				id_san_pham: {
					[Op.in]: ItemProducts.map((item) => item.id_san_pham),
				},
			},
		});

		if (!item) {
			return res.status(400).json({
				status: 400,
				message: "Không có sản phẩm nào được chọn",
			});
		}

		const shipping = await danh_sach_phuong_thuc_van_chuyen.findOne({
			where: { id_pt_van_chuyen: id_pt_van_chuyen },
		});

		if (!shipping) {
			return res.status(400).json({
				status: 400,
				message: "Phương thức vận chuyển không tồn tại",
			});
		}

		const priceMethod = shipping.gia_phuong_thuc;
		console.log("price", priceMethod);

		// total cart
		const productTotal = ItemProducts.reduce(
			(sum, item) => sum + item.gia_san_pham * item.so_luong,
			0
		);

		console.log(productTotal);

		const total = productTotal + priceMethod;

		// total quantity
		const quantity = ItemProducts.reduce(
			(sum, item) => sum + item.so_luong,
			0
		);

		// create order

		const newOrder = await don_hang.create({
			id_khach_hang: id_khach_hang,
			tong_tien: total,
			trang_thai: "Chờ xác nhận",
			tong_so_luong: quantity,
			ngay_dat_don: Date.now(),
		});

		// create order details

		for (const item of ItemProducts) {
			await chi_tiet_don_hang.create({
				id_don_hang: newOrder.id_don_hang,
				id_san_pham: item.id_san_pham,
				so_luong: item.so_luong,
				tong_tien: item.tong_tien,
			});
		}

		// create method

		await phuong_thuc_thanh_toan.create({
			id_don_hang: newOrder.id_don_hang,
			id_pt_thanh_toan: id_pt_thanh_toan,
		});

		await phuong_thuc_van_chuyen.create({
			id_don_hang: newOrder.id_don_hang,
			id_pt_van_chuyen: id_pt_van_chuyen,
		});

		// delete item selected

		await chi_tiet_gio_hang.destroy({
			where: {
				id_gio_hang: cart.id_gio_hang,
				id_san_pham: {
					[Op.in]: ItemProducts.map((item) => item.id_san_pham),
				},
			},
		});

		return res.status(200).json({
			status: 200,
			message: "Thanh toán thành công",
			data: newOrder.id_don_hang,
		});
	} catch (error) {
		console.log(error);
		res.json({
			status: 500,
			message: error.message,
		});
	}
};

const updateOrder = async (req, res) => {
	try {
	} catch (error) {
		console.log(error);
	}
};

module.exports = { checkOut };
