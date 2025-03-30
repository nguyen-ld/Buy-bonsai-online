"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("chi_tiet_don_hang", {
			id_ct_don_hang: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			id_don_hang: {
				type: Sequelize.INTEGER,
				references: {
					model: "don_hang",
					key: "id_don_hang",
				},
			},
			id_san_pham: {
				type: Sequelize.INTEGER,
				references: {
					model: "san_pham",
					key: "id_san_pham",
				},
			},
			so_luong: {
				type: Sequelize.INTEGER,
			},
			tong_tien: {
				type: Sequelize.INTEGER,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("chi_tiet_don_hang");
	},
};
