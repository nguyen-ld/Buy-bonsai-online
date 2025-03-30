"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("chi_tiet_phu_kien", {
			id_chi_tiet_phu_kien: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			id_san_pham: {
				type: Sequelize.INTEGER,
				references: {
					model: "san_pham",
					key: "id_san_pham",
				},
			},
			loai_phu_kien: {
				type: Sequelize.STRING,
			},
			huong_dan_su_dung: {
				type: Sequelize.STRING,
			},
			kich_thuoc: {
				type: Sequelize.FLOAT,
			},
			chat_lieu: {
				type: Sequelize.STRING,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("chi_tiet_phu_kien");
	},
};
