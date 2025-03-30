"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("khach_hang", {
			id_khach_hang: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			ho_ten: {
				type: Sequelize.STRING,
			},
			mat_khau: {
				type: Sequelize.STRING,
			},
			hinh_anh: {
				type: Sequelize.STRING,
			},
			dia_chi: {
				type: Sequelize.STRING,
			},
			email: {
				type: Sequelize.STRING,
			},
			so_dt: {
				type: Sequelize.STRING,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("khach_hang");
	},
};
