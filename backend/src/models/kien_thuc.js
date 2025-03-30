"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class kien_thuc extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			kien_thuc.belongsTo(models.san_pham, {
				foreignKey: "id_san_pham",
			});
		}
	}
	kien_thuc.init(
		{
			id_kien_thuc: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			tieu_de: {
				type: DataTypes.STRING,
				allowNull: false,
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
		},
		{
			sequelize,
			modelName: "kien_thuc",
			tableName: "kien_thuc",
			timestamps: false,
		}
	);
	return kien_thuc;
};
