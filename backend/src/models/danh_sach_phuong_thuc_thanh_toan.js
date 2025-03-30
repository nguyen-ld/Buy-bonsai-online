"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class danh_sach_phuong_thuc_thanh_toan extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			danh_sach_phuong_thuc_thanh_toan.hasOne(
				models.phuong_thuc_thanh_toan,
				{
					foreignKey: "id_pt_thanh_toan",
				}
			);
		}
	}
	danh_sach_phuong_thuc_thanh_toan.init(
		{
			id_pt_thanh_toan: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			ten_phuong_thuc: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "danh_sach_phuong_thuc_thanh_toan",
			tableName: "danh_sach_phuong_thuc_thanh_toan",
			timestamps: false,
		}
	);
	return danh_sach_phuong_thuc_thanh_toan;
};
