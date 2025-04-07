const { where } = require("sequelize");
const { chi_tiet_chau_cay, san_pham, danh_muc } = require("../models");

const addPottedPlant = async (req, res) => {
	try {
		const {
			id_san_pham,
			mau_sac,
			chieu_cao,
			trong_luong,
			chat_lieu,
			duong_kinh,
			hinh_dang,
			lo_thoat_nuoc,
			sizes,
		} = req.body;

		const sizeList = ["S", "M", "L"];

		const check_id = await san_pham.findOne({
			where: { id_san_pham: id_san_pham },
		});
		if (!check_id) {
			return res.status(400).json({
				status: 400,
				message: "id sản phẩm không tồn tại",
			});
		}

		if (!sizeList.includes(sizes)) {
			return res.status(400).json({
				status: 400,
				message: "size không hợp lệ. Size gồm : S, M, L ",
			});
		}

		if (check_id.id_danh_muc !== 2) {
			return res.status(400).json({
				status: 400,
				message: "Sản phẩm không phải là chậu cây",
			});
		}

		const existingPotted = await chi_tiet_chau_cay.findOne({
			where: { id_san_pham: id_san_pham },
		});

		if (existingPotted) {
			return res.status(400).json({
				status: 400,
				message: "Chậu cây trồng cho sản phẩm này đã tồn tại!",
			});
		}

		const result = await chi_tiet_chau_cay.create(req.body);

		if (result) {
			res.json({
				status: 200,
				message: "Thêm chậu cây thành công",
				data: result,
			});
		} else {
			res.json({
				status: 404,
				message: "Thêm chậu cây thất bại",
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

module.exports = { addPottedPlant };
