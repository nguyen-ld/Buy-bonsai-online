"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("chi_tiet_cay_trong", {
			id_chi_tiet_cay_trong: {
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
			dac_diem: {
				type: Sequelize.STRING,
			},
			xuat_xu: {
				type: Sequelize.STRING,
			},
			size: {
				type: Sequelize.STRING,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("chi_tiet_cay_trong");
	},
};
