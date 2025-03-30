"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("phuong_thuc_van_chuyen", {
			id_van_chuyen: {
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
			id_pt_van_chuyen: {
				type: Sequelize.INTEGER,
				references: {
					model: "danh_sach_phuong_thuc_van_chuyen",
					key: "id_pt_van_chuyen",
				},
			},
			status: {
				type: Sequelize.ENUM(
					"Chờ xác nhận",
					"Đang chuẩn bị hàng",
					"Đang vận chuyển",
					"Giao thành công",
					"Giao thất bại",
					"Hoàn hàng"
				),
				allowNull: false,
				defaultValue: "Chờ xác nhận",
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("phuong_thuc_van_chuyen");
	},
};
