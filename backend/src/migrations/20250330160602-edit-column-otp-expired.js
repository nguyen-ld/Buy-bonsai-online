"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		queryInterface.changeColumn("khach_hang", "otp", {
			type: Sequelize.STRING,
		});
		queryInterface.changeColumn("khach_hang", "expired", {
			type: Sequelize.DATE,
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.changeColumn("khach_hang", "otp", {
			type: Sequelize.INTEGER,
		});
		await queryInterface.changeColumn("khach_hang", "expired", {
			type: Sequelize.INTEGER,
		});
	},
};
