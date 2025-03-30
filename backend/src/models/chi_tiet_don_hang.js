"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class chi_tiet_don_hang extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			chi_tiet_don_hang.belongsTo(models.san_pham, {
				foreignKey: "id_san_pham",
			});
			chi_tiet_don_hang.belongsTo(models.don_hang, {
				foreignKey: "id_san_pham",
			});
		}
	}
	chi_tiet_don_hang.init(
		{
			id_ct_don_hang: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			id_don_hang: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			id_san_pham: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			so_luong: DataTypes.INTEGER,
			tong_tien: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "chi_tiet_don_hang",
			tableName: "chi_tiet_don_hang",
			timestamps: false,
		}
	);
	return chi_tiet_don_hang;
};
