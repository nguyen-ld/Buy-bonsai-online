"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn("danh_muc", "ten_man_hinh", {
			type: Sequelize.STRING,
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn("danh_muc", "ten_man_hinh");
	},
};
