const { danh_sach_phuong_thuc_thanh_toan } = require("../models");

const addPayMethod = async (req, res) => {
	try {
		const result = await danh_sach_phuong_thuc_thanh_toan.create(req.body);
		if (result) {
			res.json({
				status: 200,
				message: "Tạo phương thức thành công",
				data: result,
			});
		} else {
			res.json({
				status: 200,
				message: "Tạo phương thức thất bại",
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

const payMethodInfo = async (req, res) => {
	try {
		const result = await danh_sach_phuong_thuc_thanh_toan.findAll();
		if (result.length > 0) {
			res.json({
				status: 200,
				message: "Lấy danh sách phương thức thành công",
				data: result,
			});
		} else {
			res.json({
				status: 404,
				message: "Lấy danh sách phương thức thất bại",
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
	addPayMethod,
	payMethodInfo,
};
