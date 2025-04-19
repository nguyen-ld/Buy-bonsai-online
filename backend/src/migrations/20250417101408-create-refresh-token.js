"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("refreshToken", {
			id_refresh_token: {
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
			refreshToken: {
				type: Sequelize.STRING,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("refreshToken");
	},
};
