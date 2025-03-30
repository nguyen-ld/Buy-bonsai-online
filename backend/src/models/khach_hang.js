"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class khach_hang extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			khach_hang.hasOne(models.gio_hang, {
				foreignKey: "id_khach_hang",
			});
			khach_hang.hasMany(models.don_hang, {
				foreignKey: "id_khach_hang",
			});
			khach_hang.hasMany(models.thong_bao, {
				foreignKey: "id_khach_hang",
			});
		}
	}
	khach_hang.init(
		{
			id_khach_hang: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			ho_ten: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			mat_khau: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			hinh_anh: DataTypes.STRING,
			dia_chi: DataTypes.STRING,
			email: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			so_dt: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "khach_hang",
			tableName: "khach_hang",
			timestamps: false,
		}
	);
	return khach_hang;
};
