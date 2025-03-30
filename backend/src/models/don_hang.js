"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class don_hang extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			don_hang.hasMany(models.chi_tiet_don_hang, {
				foreignKey: "id_don_hang",
			});
			don_hang.belongsTo(models.khach_hang, {
				foreignKey: "id_khach_hang",
			});
			don_hang.hasOne(models.thong_bao, {
				foreignKey: "id_don_hang",
			});
			don_hang.hasOne(models.phuong_thuc_thanh_toan, {
				foreignKey: "id_don_hang",
			});
			don_hang.hasOne(models.phuong_thuc_van_chuyen, {
				foreignKey: "id_don_hang",
			});
		}
	}
	don_hang.init(
		{
			id_don_hang: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			id_khach_hang: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			tong_tien: DataTypes.INTEGER,
			tong_so_luong: DataTypes.INTEGER,
			trang_thai: {
				type: DataTypes.ENUM(
					"Chờ xác nhận",
					"Đang xử lý",
					"Đã hoàn thành",
					"Đã hủy"
				),
				allowNull: false,
				defaultValue: "Chờ xác nhận",
			},
			ngay_dat_don: DataTypes.DATE,
		},
		{
			sequelize,
			modelName: "don_hang",
			tableName: "don_hang",
			timestamps: false,
		}
	);
	return don_hang;
};
