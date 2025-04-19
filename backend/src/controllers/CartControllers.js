const { where } = require("sequelize");
const {
	gio_hang,
	chi_tiet_gio_hang,
	khach_hang,
	san_pham,
	kho_san_pham,
	chi_tiet_chau_cay,
	chi_tiet_phu_kien,
	chi_tiet_cay_trong,
} = require("../models");

const addToCart = async (req, res) => {
	try {
		const { id_khach_hang, quantity, id_product } = req.body;

		if (!Number.isInteger(quantity) || quantity <= 0) {
			return res.status(400).json({
				status: 400,
				message: "Số lượng sản phẩm phải là số nguyên dương",
			});
		}

		const MAX_QUANTITY = 5;

		const checkUser = await khach_hang.findOne({
			where: { id_khach_hang },
		});
		if (!checkUser) {
			return res.status(400).json({
				status: 400,
				message: "Khách hàng không tồn tại",
			});
		}

		let checkCart = await gio_hang.findOne({ where: { id_khach_hang } });
		if (!checkCart) {
			checkCart = await gio_hang.create({ id_khach_hang });
		}

		const checkProducts = await san_pham.findOne({
			where: { id_san_pham: id_product },
		});
		if (!checkProducts) {
			return res.status(400).json({
				status: 400,
				message: "Không tồn tại sản phẩm",
			});
		}

		const kho = await kho_san_pham.findOne({
			where: { id_san_pham: id_product },
		});

		if (!kho) {
			return res.status(400).json({
				status: 400,
				message: "Kho không tồn tại sản phẩm này",
			});
		}

		if (kho.tinh_trang < quantity) {
			return res.status(400).json({
				status: 400,
				message: "Không đủ số lượng sản phẩm trong kho",
			});
		}

		const checkExisting = await chi_tiet_gio_hang.findOne({
			where: {
				id_gio_hang: checkCart.id_gio_hang,
				id_san_pham: id_product,
			},
		});

		if (checkExisting) {
			const newQuantity = checkExisting.so_luong + quantity;

			if (newQuantity > MAX_QUANTITY) {
				return res.status(400).json({
					status: 400,
					message: `Chỉ được mua tối đa ${MAX_QUANTITY} sản phẩm cho mỗi loại.`,
				});
			}

			checkExisting.so_luong = newQuantity;
			checkExisting.tong_tien = checkProducts.gia_san_pham * newQuantity;
			await checkExisting.save();

			return res.status(200).json({
				status: 200,
				message: "Cập nhật số lượng thành công",
				data: checkExisting,
			});
		} else {
			if (quantity > MAX_QUANTITY) {
				return res.status(400).json({
					status: 400,
					message: `Chỉ được mua tối đa ${MAX_QUANTITY} sản phẩm cho mỗi loại.`,
				});
			}

			const newItems = await chi_tiet_gio_hang.create({
				id_gio_hang: checkCart.id_gio_hang,
				id_san_pham: id_product,
				tong_tien: checkProducts.gia_san_pham * quantity,
				so_luong: quantity,
			});
			return res.status(200).json({
				status: 200,
				message: "Thêm sản phẩm vào giỏ hàng thành công",
				data: newItems,
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			status: 500,
			message: error.message,
		});
	}
};

const cartList = async (req, res) => {
	try {
		const { id_khach_hang } = req.params;
		const checkUser = await khach_hang.findOne({
			where: { id_khach_hang: id_khach_hang },
		});
		if (!checkUser) {
			return res.status(400).json({
				status: 400,
				message: "Khách hàng không tồn tại",
			});
		}

		const result = await chi_tiet_gio_hang.findAll({
			include: [
				{
					model: gio_hang,
					where: { id_khach_hang: id_khach_hang },
				},
				{
					model: san_pham,
					include: [
						{
							model: chi_tiet_cay_trong,
							attributes: ["dac_diem"],
							required: false,
						},
					],
				},
			],
		});
		if (result.length > 0) {
			res.json({
				status: 200,
				message: "Lấy danh sách giỏ hàng thành công",
				data: result,
			});
		} else {
			res.json({
				status: 404,
				message: "Lấy danh sách giỏ hàng thất bại",
				data: [],
			});
		}
	} catch (error) {
		console.log(error);
		res.json({
			status: 500,
			message: error.message,
		});
	}
};
// const updateQuantity = async (req, res) => {
// 	try {
// 		const { id_san_pham, id_khach_hang } = req.params;
// 		const { quantity } = req.body;

// 		// Kiểm tra khách hàng tồn tại
// 		const user = await khach_hang.findByPk(id_khach_hang);
// 		if (!user) {
// 			return res.status(400).json({
// 				status: 400,
// 				message: "Khách hàng không tồn tại",
// 			});
// 		}
// 		console.log("User : ", user);

// 		// Tìm giỏ hàng của khách hàng
// 		const cart = await gio_hang.findOne({
// 			where: { id_khach_hang: id_khach_hang },
// 		});
// 		if (!cart) {
// 			return res.status(400).json({
// 				status: 400,
// 				message: "Giỏ hàng không tồn tại",
// 			});
// 		}

// 		// Tìm chi tiết sản phẩm trong giỏ hàng
// 		const existing = await chi_tiet_gio_hang.findOne({
// 			where: {
// 				id_gio_hang: cart.id_gio_hang,
// 				id_san_pham: id_san_pham,
// 			},
// 		});
// 		if (!existing) {
// 			return res.status(400).json({
// 				status: 400,
// 				message: "Sản phẩm không tồn tại trong giỏ hàng",
// 			});
// 		}

// 		// Lấy giá sản phẩm
// 		const product = await san_pham.findByPk(id_san_pham);
// 		if (!product) {
// 			return res.status(400).json({
// 				status: 400,
// 				message: "Không tìm thấy sản phẩm",
// 			});
// 		}

// 		const tong_tien = quantity * product.gia_san_pham;

// 		// Cập nhật số lượng và tổng tiền
// 		await chi_tiet_gio_hang.update(
// 			{ so_luong: quantity, tong_tien: tong_tien },
// 			{
// 				where: {
// 					id_gio_hang: cart.id_gio_hang,
// 					id_san_pham: id_san_pham,
// 				},
// 			}
// 		);

// 		// Lấy dữ liệu mới cập nhật
// 		const updatedData = await chi_tiet_gio_hang.findOne({
// 			where: {
// 				id_gio_hang: cart.id_gio_hang,
// 				id_san_pham: id_san_pham,
// 			},
// 		});

// 		return res.status(200).json({
// 			status: 200,
// 			message: "Cập nhật số lượng thành công",
// 			data: updatedData,
// 		});
// 	} catch (error) {
// 		console.error(error);
// 		return res.status(500).json({
// 			status: 500,
// 			message: error.message,
// 		});
// 	}
// };

const deleteItemCart = async (req, res) => {
	try {
		const { id_san_pham, id_khach_hang } = req.params;

		const user = await khach_hang.findOne({
			where: { id_khach_hang: id_khach_hang },
		});

		if (!user) {
			return res.status(400).json({
				status: 400,
				message: "Người dùng không tồn tại",
			});
		}

		const cart = await gio_hang.findOne({
			where: { id_khach_hang: id_khach_hang },
		});

		if (!cart) {
			return res.status(400).json({
				status: 400,
				message: "Giỏ hàng không tồn tại",
			});
		}

		const checkId = await chi_tiet_gio_hang.findOne({
			where: { id_san_pham: id_san_pham, id_gio_hang: cart.id_gio_hang },
		});

		if (!checkId) {
			return res.status(400).json({
				status: 400,
				message: "Sản phẩm này không tồn tại trong giỏ hàng",
			});
		}

		const result = await chi_tiet_gio_hang.destroy({
			where: {
				id_san_pham: id_san_pham,
				id_gio_hang: cart.id_gio_hang,
			},
		});

		if (result) {
			res.json({
				status: 200,
				message: "Xóa sản phẩm thành công",
				data: result,
			});
		} else {
			res.json({
				status: 404,
				message: "Xóa sản phẩm thất bại",
			});
		}
	} catch (error) {
		console.log(error);
		res.json({
			status: 500,
			message: error.message,
		});
	}
};

const deleteAllItemInCart = async (req, res) => {
	try {
		const { id_khach_hang } = req.params;

		const user = await khach_hang.findOne({
			where: { id_khach_hang: id_khach_hang },
		});

		if (!user) {
			return res.status(400).json({
				status: 400,
				message: "Khách hàng không tồn tại",
			});
		}

		const cart = await gio_hang.findOne({
			where: { id_khach_hang: id_khach_hang },
		});

		if (!cart) {
			return res.status(400).json({
				status: 400,
				message: "Giỏ hàng không tồn tại",
			});
		}

		const cartEmpty = await chi_tiet_gio_hang.findAll();

		if (!cartEmpty.length > 0) {
			return res.status(400).json({
				status: 400,
				message: "Giỏ hàng hiện tại chưa có sản phẩm",
			});
		}

		const result = await chi_tiet_gio_hang.destroy({
			where: {
				id_gio_hang: cart.id_gio_hang,
			},
		});

		if (result > 0) {
			return res.status(200).json({
				status: 200,
				message: "Xóa giỏ hàng thành công",
				data: result,
			});
		} else {
			return res.status(404).json({
				status: 404,
				message: "Xóa giỏ hàng thất bại",
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
	addToCart,
	cartList,
	// updateQuantity,
	deleteItemCart,
	deleteAllItemInCart,
};
