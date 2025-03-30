"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("chi_tiet_gio_hang", {
			id_chi_tiet_gio_hang: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			id_gio_hang: {
				type: Sequelize.INTEGER,
				references: {
					model: "gio_hang",
					key: "id_gio_hang",
				},
			},
			id_san_pham: {
				type: Sequelize.INTEGER,
				references: {
					model: "san_pham",
					key: "id_san_pham",
				},
			},
			tong_tien: {
				type: Sequelize.INTEGER,
			},
			so_luong: {
				type: Sequelize.INTEGER,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("chi_tiet_gio_hang");
	},
};
