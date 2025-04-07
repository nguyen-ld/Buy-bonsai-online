const { where, Op } = require("sequelize");
const { chi_tiet_cay_trong, san_pham } = require("../models");

const addPlant = async (req, res) => {
	try {
		const { id_san_pham, dac_diem, xuat_xu, size } = req.body;

		const product = await san_pham.findByPk(id_san_pham);
		if (!product) {
			return res.status(400).json({
				status: 400,
				message: "Id sản phẩm không tồn tại!",
			});
		}
		if (product.id_danh_muc !== 1) {
			return res.status(400).json({
				status: 400,
				message: "Sản phẩm không phải là cây trồng",
			});
		}
		// check xem đã tồn tại id_san_pham đã tồn tại ở cây trồng chưa
		const existingPlant = await chi_tiet_cay_trong.findOne({
			where: { id_san_pham: id_san_pham },
		});

		if (existingPlant) {
			return res.status(400).json({
				status: 400,
				message: "Cây trồng cho sản phẩm này đã tồn tại!",
			});
		}

		const result = await chi_tiet_cay_trong.create(req.body);

		if (result) {
			res.json({
				status: 200,
				message: "Thêm cây trồng thành công",
				data: result,
			});
		} else {
			res.json({
				status: 200,
				message: "Thêm cây trồng thất bại",
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

module.exports = {
	addPlant,
};
