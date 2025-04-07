"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class san_pham extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			san_pham.belongsTo(models.danh_muc, {
				foreignKey: "id_danh_muc",
			});
			san_pham.hasMany(models.chi_tiet_cay_trong, {
				foreignKey: "id_san_pham",
			});
			san_pham.hasMany(models.chi_tiet_chau_cay, {
				foreignKey: "id_san_pham",
			});
			san_pham.hasMany(models.chi_tiet_phu_kien, {
				foreignKey: "id_san_pham",
			});
			san_pham.hasMany(models.kho_san_pham, {
				foreignKey: "id_san_pham",
			});
			san_pham.hasMany(models.kien_thuc, {
				foreignKey: "id_san_pham",
			});
			san_pham.hasMany(models.giai_doan, {
				foreignKey: "id_san_pham",
			});
			san_pham.hasMany(models.chi_tiet_gio_hang, {
				foreignKey: "id_san_pham",
			});
			san_pham.hasMany(models.chi_tiet_don_hang, {
				foreignKey: "id_san_pham",
			});
		}
	}
	san_pham.init(
		{
			id_san_pham: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			id_danh_muc: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			ten_san_pham: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			gia_san_pham: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			hinh_anh: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			ngay_tao: {
				type: DataTypes.DATE,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "san_pham",
			tableName: "san_pham",
			timestamps: false,
		}
	);
	return san_pham;
};
