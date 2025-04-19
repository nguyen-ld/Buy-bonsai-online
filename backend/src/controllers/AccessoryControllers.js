const { chi_tiet_phu_kien, san_pham } = require("../models");

const addAccessory = async (req, res) => {
	try {
		const {
			id_san_pham,
			loai_phu_kien,
			huong_dan_su_dung,
			kich_thuoc,
			chat_lieu,
		} = req.body;

		const check_id = await san_pham.findOne({
			where: { id_san_pham: id_san_pham },
		});
		if (!check_id) {
			return res.status(400).json({
				status: 400,
				message: "id sản phẩm không tồn tại",
			});
		}

		if (check_id.id_danh_muc !== 3) {
			return res.status(400).json({
				status: 400,
				message: "Sản phẩm không phải là phụ kiện",
			});
		}

		const existingPotted = await chi_tiet_phu_kien.findOne({
			where: { id_san_pham: id_san_pham },
		});

		if (existingPotted) {
			return res.status(400).json({
				status: 400,
				message: "phụ kiện này đã tồn tại!",
			});
		}

		const result = await chi_tiet_phu_kien.create(req.body);

		if (result) {
			res.json({
				status: 200,
				message: "Thêm phụ kiện thành công",
				data: result,
			});
		} else {
			res.json({
				status: 404,
				message: "Thêm phụ kiện thất bại",
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
	addAccessory,
};
