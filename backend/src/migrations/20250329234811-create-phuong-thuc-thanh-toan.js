"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("phuong_thuc_thanh_toan", {
			id_thanh_toan: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			id_don_hang: {
				type: Sequelize.INTEGER,
				references: {
					model: "don_hang",
					key: "id_don_hang",
				},
			},
			id_pt_thanh_toan: {
				type: Sequelize.INTEGER,
				references: {
					model: "danh_sach_phuong_thuc_thanh_toan",
					key: "id_pt_thanh_toan",
				},
			},
			trang_thai: {
				type: Sequelize.ENUM(
					"Chưa thanh toán",
					"Đang xử lý",
					"Đã thanh toán",
					"Thanh toán thất bại",
					"Hoàn tiền"
				),
				allowNull: false,
				defaultValue: "Chưa thanh toán",
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("phuong_thuc_thanh_toan");
	},
};
