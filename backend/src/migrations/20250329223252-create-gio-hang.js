"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("gio_hang", {
			id_gio_hang: {
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
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("gio_hang");
	},
};
