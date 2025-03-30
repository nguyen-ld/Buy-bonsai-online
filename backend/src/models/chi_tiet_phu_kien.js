"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class chi_tiet_phu_kien extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			chi_tiet_phu_kien.belongsTo(models.san_pham, {
				foreignKey: "id_san_pham",
			});
		}
	}
	chi_tiet_phu_kien.init(
		{
			id_chi_tiet_phu_kien: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			id_san_pham: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			loai_phu_kien: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			huong_dan_su_dung: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			kich_thuoc: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
			chat_lieu: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "chi_tiet_phu_kien",
			tableName: "chi_tiet_phu_kien",
			timestamps: false,
		}
	);
	return chi_tiet_phu_kien;
};
