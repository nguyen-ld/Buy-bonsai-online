const { where, Op } = require("sequelize");
const moment = require("moment");
const {
	san_pham,
	chi_tiet_cay_trong,
	kho_san_pham,
	danh_muc,
	chi_tiet_chau_cay,
	chi_tiet_phu_kien,
} = require("../models");

const addProduct = async (req, res) => {
	try {
		const { file } = req;
		const urlImages = `http://${process.env.ID_ADDRESS}:5000/upload/${file.filename}`;
		const { id_danh_muc, ten_san_pham, gia_san_pham, hinh_anh, ngay_tao } =
			req.body;

		const check_id = await danh_muc.findOne({
			where: { id_danh_muc: id_danh_muc },
		});

		if (!check_id) {
			return res.json({
				status: 404,
				message: "id danh mục không tồn tại",
			});
		}

		const result = await san_pham.create({
			id_danh_muc,
			ten_san_pham,
			gia_san_pham,
			hinh_anh: urlImages,
			ngay_tao: Date.now(),
		});

		if (result) {
			res.json({
				status: 200,
				message: "Tạo sản phẩm thành công",
				data: result,
			});
		} else {
			res.json({
				status: 200,
				message: "Tạo sản phẩm thất bại",
				data: result,
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

const productLists = async (req, res) => {
	try {
		const { id_danh_muc } = req.params;

		const check_id = await danh_muc.findOne({
			where: { id_danh_muc: id_danh_muc },
		});

		if (!check_id) {
			return res.status(400).json({
				status: 400,
				message: "id danh mục không tồn tại",
			});
		}

		let models = null;

		if (check_id.id_danh_muc === 1) {
			models = chi_tiet_cay_trong;
		} else if (check_id.id_danh_muc === 2) {
			models = chi_tiet_chau_cay;
		} else if (check_id.id_danh_muc === 3) {
			models = chi_tiet_phu_kien;
		}

		const result = await san_pham.findAll({
			where: { id_danh_muc: id_danh_muc },
			include: [
				{
					model: models,
				},
			],
		});

		if (result) {
			res.json({
				status: 200,
				message: "Lấy danh sách sản phẩm thành công",
				data: result,
			});
		} else {
			res.json({
				status: 404,
				message: "Lấy danh sách sản phẩm thất bại",
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

const detailsProducts = async (req, res) => {
	try {
		const { id_san_pham } = req.params;
		const check_id = await san_pham.findOne({
			where: { id_san_pham: id_san_pham },
		});
		if (!check_id) {
			return res.status(400).json({
				status: 400,
				message: "id sản phẩm không tồn tại",
			});
		}

		let models = null;

		if (check_id.id_danh_muc === 1) {
			models = chi_tiet_cay_trong;
		} else if (check_id.id_danh_muc === 2) {
			models = chi_tiet_chau_cay;
		} else if (check_id.id_danh_muc === 3) {
			models = chi_tiet_phu_kien;
		}

		const result = await san_pham.findOne({
			where: { id_san_pham: id_san_pham },
			include: [
				{
					model: models,
				},
				{
					model: kho_san_pham,
				},
			],
		});

		if (result) {
			res.json({
				status: 200,
				message: "Lấy thông tin sản phẩm thành công",
				data: result,
			});
		} else {
			res.json({
				status: 404,
				message: "Lấy thông tin sản phẩm thất bại",
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
const productLimitLists = async (req, res) => {
	try {
		const { id_danh_muc } = req.params;

		const check_id = await danh_muc.findOne({
			where: { id_danh_muc: id_danh_muc },
		});

		if (!check_id) {
			return res.status(400).json({
				status: 400,
				message: "id danh mục không tồn tại",
			});
		}

		let modelToInclude = null;

		if (check_id.id_danh_muc === 1) {
			modelToInclude = chi_tiet_cay_trong;
		} else if (check_id.id_danh_muc === 2 || check_id.id_danh_muc === 3) {
			modelToInclude = null;
		}

		console.log(modelToInclude);

		const result = await san_pham.findAll({
			where: { id_danh_muc: id_danh_muc },
			include: modelToInclude
				? [
						{
							model: modelToInclude,
							attributes: ["dac_diem"],
						},
				  ]
				: [],
			limit: 4,
		});

		if (result.length > 0) {
			res.status(200).json({
				status: 200,
				message: "Lấy danh sách sản phẩm thành công",
				data: result,
			});
		} else {
			res.status(404).json({
				status: 404,
				message: "Không có sản phẩm nào trong danh mục này",
				data: [],
			});
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: error.message,
		});
	}
};

const newPlantList = async (req, res) => {
	const dateNow = moment().endOf("days");
	const sevenDayAgo = moment().subtract(3, "days").startOf("days");
	try {
		const result = await san_pham.findAll({
			include: [
				{
					model: chi_tiet_cay_trong,
					attributes: ["dac_diem"],
				},
			],
			where: {
				id_danh_muc: 1,
				ngay_tao: {
					[Op.between]: [sevenDayAgo.toDate(), dateNow.toDate()],
				},
			},
		});

		if (result.length > 0) {
			res.json({
				status: 200,
				message: "Lấy danh sách sản phẩm mới về thành công",
				data: result,
			});
		} else {
			res.json({
				status: 404,
				message:
					"Không có sản phẩm mới về nào trong khoảng thời gian này",
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
const plantList = async (req, res) => {
	try {
		const { dac_diem } = req.params;

		const check_exists = await chi_tiet_cay_trong.findOne({
			where: { dac_diem: dac_diem.toLowerCase() },
		});

		if (!check_exists) {
			return res.status(400).json({
				status: 400,
				message: "Không tồn tại đặc điểm này",
			});
		}

		const result = await san_pham.findAll({
			include: [
				{
					model: chi_tiet_cay_trong,
					attributes: ["dac_diem"],
					where: {
						dac_diem: { [Op.like]: `%${dac_diem.toLowerCase()}%` },
					},
				},
			],
		});

		if (result.length > 0) {
			res.json({
				status: 200,
				message: "Lấy danh sách cây trồng thành công",
				data: result,
			});
		} else {
			res.json({
				status: 404,
				message: "Lấy danh sách cây trồng thất bại",
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
	addProduct,
	productLists,
	detailsProducts,
	productLimitLists,
	newPlantList,
	plantList,
};
