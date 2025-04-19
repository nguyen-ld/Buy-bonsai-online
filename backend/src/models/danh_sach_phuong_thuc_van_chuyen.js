"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class danh_sach_phuong_thuc_van_chuyen extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			danh_sach_phuong_thuc_van_chuyen.hasOne(
				models.phuong_thuc_van_chuyen,
				{
					foreignKey: "id_pt_van_chuyen",
				}
			);
		}
	}
	danh_sach_phuong_thuc_van_chuyen.init(
		{
			id_pt_van_chuyen: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			ten_phuong_thuc: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			gia_phuong_thuc: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			ngay_giao_du_kien: {
				type: DataTypes.DATE,
			},
		},
		{
			sequelize,
			modelName: "danh_sach_phuong_thuc_van_chuyen",
			tableName: "danh_sach_phuong_thuc_van_chuyen",
			timestamps: false,
		}
	);
	return danh_sach_phuong_thuc_van_chuyen;
};
