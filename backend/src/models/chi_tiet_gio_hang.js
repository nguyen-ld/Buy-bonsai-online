"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class chi_tiet_gio_hang extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			chi_tiet_gio_hang.belongsTo(models.gio_hang, {
				foreignKey: "id_gio_hang",
			});
			chi_tiet_gio_hang.belongsTo(models.san_pham, {
				foreignKey: "id_san_pham",
			});
		}
	}
	chi_tiet_gio_hang.init(
		{
			id_chi_tiet_gio_hang: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			id_gio_hang: {
				allowNull: false,
				type: DataTypes.INTEGER,
			},
			id_san_pham: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			tong_tien: {
				type: DataTypes.INTEGER,
			},
			so_luong: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "chi_tiet_gio_hang",
			tableName: "chi_tiet_gio_hang",
			timestamps: false,
		}
	);
	return chi_tiet_gio_hang;
};
