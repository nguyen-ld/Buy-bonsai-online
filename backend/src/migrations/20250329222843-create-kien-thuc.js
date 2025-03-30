"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("kien_thuc", {
			id_kien_thuc: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			tieu_de: {
				type: Sequelize.STRING,
			},
			id_san_pham: {
				type: Sequelize.INTEGER,
				references: {
					model: "san_pham",
					key: "id_san_pham",
				},
			},
			noi_dung: {
				type: Sequelize.STRING,
			},
			chi_tiet_noi_dung: {
				type: Sequelize.STRING,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("kien_thuc");
	},
};
