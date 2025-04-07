"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn("san_pham", "ngay_tao", {
			type: Sequelize.DATE,
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn("san_pham", "ngay_tao");
	},
};
