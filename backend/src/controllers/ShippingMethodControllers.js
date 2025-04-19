const { danh_sach_phuong_thuc_van_chuyen } = require("../models");

const addShippingMethod = async (req, res) => {
	try {
		const { ten_phuong_thuc, gia_phuong_thuc } = req.body;
		const result = await danh_sach_phuong_thuc_van_chuyen.create(req.body);
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
const formatDateRange = (startDate, endDate) => {
	const start = new Date(startDate);
	const end = new Date(endDate);

	const startDay = start.getDate();
	const endDay = end.getDate();
	const month = start.getMonth() + 1;

	return `${startDay}-${endDay}/${month}`;
};

const shippingMethodInfo = async (req, res) => {
	try {
		const methods = await danh_sach_phuong_thuc_van_chuyen.findAll();

		const result = methods.map((method) => {
			let so_ngay_bat_dau = 0;
			let so_ngay_ket_thuc = 3;

			if (method.id_pt_van_chuyen === 1) {
				so_ngay_bat_dau = 2;
				so_ngay_ket_thuc = 3;
			} else if (method.id_pt_van_chuyen === 2) {
				so_ngay_bat_dau = 3;
				so_ngay_ket_thuc = 5;
			}

			const today = Date.now();
			const ngay_bat_dau = new Date(
				today + so_ngay_bat_dau * 24 * 60 * 60 * 1000
			);
			const ngay_ket_thuc = new Date(
				today + so_ngay_ket_thuc * 24 * 60 * 60 * 1000
			);

			return {
				...method.dataValues,
				ngay_giao_du_kien: formatDateRange(ngay_bat_dau, ngay_ket_thuc),
			};
		});

		res.json({
			status: 200,
			message: "Lấy danh sách phương thức thành công",
			data: result,
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
	addShippingMethod,
	shippingMethodInfo,
};
