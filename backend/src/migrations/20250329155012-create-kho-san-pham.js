"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("kho_san_pham", {
			id_kho: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			tinh_trang: {
				type: Sequelize.INTEGER,
			},
			id_san_pham: {
				type: Sequelize.INTEGER,
				references: {
					model: "san_pham",
					key: "id_san_pham",
				},
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("kho_san_pham");
	},
};
