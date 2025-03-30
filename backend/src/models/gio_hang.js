"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class gio_hang extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			gio_hang.belongsTo(models.khach_hang, {
				foreignKey: "id_khach_hang",
			});
			gio_hang.hasMany(models.chi_tiet_gio_hang, {
				foreignKey: "id_gio_hang",
			});
		}
	}
	gio_hang.init(
		{
			id_gio_hang: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			id_khach_hang: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "gio_hang",
			tableName: "gio_hang",
			timestamps: false,
		}
	);
	return gio_hang;
};
