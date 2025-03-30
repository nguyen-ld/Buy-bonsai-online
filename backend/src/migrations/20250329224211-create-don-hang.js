"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("don_hang", {
			id_don_hang: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			id_khach_hang: {
				type: Sequelize.INTEGER,
				references: {
					model: "khach_hang",
					key: "id_khach_hang",
				},
			},
			tong_tien: {
				type: Sequelize.INTEGER,
			},
			tong_so_luong: {
				type: Sequelize.INTEGER,
			},
			trang_thai: {
				type: Sequelize.ENUM(
					"Chờ xác nhận",
					"Đang xử lý",
					"Đã hoàn thành",
					"Đã hủy"
				),
				allowNull: false,
				defaultValue: "Chờ xác nhận",
			},
			ngay_dat_don: {
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("don_hang");
	},
};
