"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("chi_tiet_chau_cay", {
			id_chi_tiet_chau_cay: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			id_san_pham: {
				type: Sequelize.INTEGER,
				references: {
					model: "san_pham",
					key: "id_san_pham",
				},
			},
			mau_sac: {
				type: Sequelize.INTEGER,
			},
			chieu_cao: {
				type: Sequelize.FLOAT,
			},
			trong_luong: {
				type: Sequelize.FLOAT,
			},
			chat_lieu: {
				type: Sequelize.STRING,
			},
			duong_kinh: {
				type: Sequelize.FLOAT,
			},
			hinh_dang: {
				type: Sequelize.STRING,
			},
			lo_thoat_nuoc: {
				type: Sequelize.BOOLEAN,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("chi_tiet_chau_cay");
	},
};
