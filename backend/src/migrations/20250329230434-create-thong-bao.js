"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("thong_bao", {
			id_thong_bao: {
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
			id_don_hang: {
				type: Sequelize.INTEGER,
				references: {
					model: "don_hang",
					key: "id_don_hang",
				},
			},
			thong_bao: {
				type: Sequelize.STRING,
			},
			ngay_hien_tai: {
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("thong_bao");
	},
};
