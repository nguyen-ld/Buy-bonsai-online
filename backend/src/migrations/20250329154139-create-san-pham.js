"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("san_pham", {
			id_san_pham: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			id_danh_muc: {
				type: Sequelize.INTEGER,
				references: {
					model: "danh_muc",
					key: "id_danh_muc",
				},
			},
			ten_san_pham: {
				type: Sequelize.STRING,
			},
			gia_san_pham: {
				type: Sequelize.INTEGER,
			},
			hinh_anh: {
				type: Sequelize.STRING,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("san_pham");
	},
};
