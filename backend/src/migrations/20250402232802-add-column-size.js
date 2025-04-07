"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn("chi_tiet_chau_cay", "sizes", {
			type: Sequelize.ENUM("S", "M", "L"),
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn("chi_tiet_chau_cay", "sizes");
	},
};
