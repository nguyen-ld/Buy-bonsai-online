"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class chi_tiet_chau_cay extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			chi_tiet_chau_cay.belongsTo(models.san_pham, {
				foreignKey: "id_san_pham",
			});
		}
	}
	chi_tiet_chau_cay.init(
		{
			id_chi_tiet_chau_cay: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			id_san_pham: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			mau_sac: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			chieu_cao: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
			trong_luong: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
			chat_lieu: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			duong_kinh: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
			hinh_dang: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			lo_thoat_nuoc: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "chi_tiet_chau_cay",
			tableName: "chi_tiet_chau_cay",
			timestamps: false,
		}
	);
	return chi_tiet_chau_cay;
};
