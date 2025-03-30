"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class chi_tiet_cay_trong extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			chi_tiet_cay_trong.belongsTo(models.san_pham, {
				foreignKey: "id_san_pham",
			});
		}
	}
	chi_tiet_cay_trong.init(
		{
			id_chi_tiet_cay_trong: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true,
			},
			id_san_pham: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			dac_diem: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			xuat_xu: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			size: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "chi_tiet_cay_trong",
			tableName: "chi_tiet_cay_trong",
			timestamps: false,
		}
	);
	return chi_tiet_cay_trong;
};
