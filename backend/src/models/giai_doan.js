"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class giai_doan extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			giai_doan.belongsTo(models.san_pham, {
				foreignKey: "id_san_pham",
			});
		}
	}
	giai_doan.init(
		{
			id_giao_doan: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			id_san_pham: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			noi_dung: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			chi_tiet_noi_dung: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			tieu_de: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "giai_doan",
			tableName: "giai_doan",
			timestamps: false,
		}
	);
	return giai_doan;
};
