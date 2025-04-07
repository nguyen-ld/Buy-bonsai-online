const { where } = require("sequelize");
const { kho_san_pham, san_pham } = require("../models");

const addQuantity = async (req, res) => {
	try {
		const { id_san_pham, tinh_trang } = req.body;
		const check_id = await san_pham.findOne({
			where: { id_san_pham: id_san_pham },
		});
		if (!check_id) {
			return res.status(400).json({
				status: 400,
				message: "id sản phẩm không tồn tại ",
			});
		}

		if (!(tinh_trang > 0 && tinh_trang <= 300)) {
			return res.status(400).json({
				status: 400,
				message: "Tình trạng phải lớn hơn 0 & nhỏ hơn 300 ",
			});
		}

		const result = await kho_san_pham.create(req.body);
		if (result) {
			res.json({
				status: 200,
				message: "Thêm số lượng thành công",
				data: result,
			});
		} else {
			res.json({
				status: 404,
				message: "Thêm số lượng thất bại",
				data: "",
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

module.exports = { addQuantity };
