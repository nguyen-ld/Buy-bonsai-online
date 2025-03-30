"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("danh_sach_phuong_thuc_van_chuyen", {
			id_pt_van_chuyen: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			ten_phuong_thuc: {
				type: Sequelize.STRING,
			},
			gia_phuong_thuc: {
				type: Sequelize.INTEGER,
			},
			ngay_giao_du_kien: {
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("danh_sach_phuong_thuc_van_chuyen");
	},
};
