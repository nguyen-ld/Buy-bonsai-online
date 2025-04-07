const { danh_muc } = require("../models");

const addCategories = async (req, res) => {
	try {
		const { ten_danh_muc } = req.body;

		if (!ten_danh_muc) {
			return res.status(400).json({
				status: 400,
				message: "Vui lòng nhập tên danh mục. Thử lại!",
				type: "name-empty",
			});
		}

		const result = await danh_muc.create({ ten_danh_muc });

		if (result) {
			res.json({
				status: 200,
				message: "Tạo danh mục thành công",
				data: result,
			});
		} else {
			res.json({
				status: 200,
				message: "Tạo danh mục thất bại",
				data: result,
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

const listOfCategory = async (req, res) => {
	try {
		const result = await danh_muc.findAll();

		if (result.length > 0) {
			res.json({
				status: 200,
				message: "Lấy danh sách danh mục thành công",
				data: result,
			});
		} else {
			res.json({
				status: 404,
				message: "Lấy danh sách thất bại",
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

module.exports = {
	addCategories,
	listOfCategory,
};
