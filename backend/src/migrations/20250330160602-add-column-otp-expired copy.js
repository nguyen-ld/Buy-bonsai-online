"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		queryInterface.addColumn("khach_hang", "otp", {
			type: Sequelize.INTEGER,
		});
		queryInterface.addColumn("khach_hang", "expired", {
			type: Sequelize.INTEGER,
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn("khach_hang", "otp");
		await queryInterface.removeColumn("khach_hang", "expired");
	},
};
