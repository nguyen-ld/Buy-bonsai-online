"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.removeColumn("qa", "noi_dung");
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.addColumn("qa", "noi_dung", {
			type: Sequelize.STRING,
		});
	},
};
