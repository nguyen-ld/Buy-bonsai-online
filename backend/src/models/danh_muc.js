"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class danh_muc extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			danh_muc.hasMany(models.san_pham, {
				foreignKey: "id_danh_muc",
			});
		}
	}
	danh_muc.init(
		{
			id_danh_muc: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true,
			},
			ten_danh_muc: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "danh_muc",
			tableName: "danh_muc",
			timestamps: false,
		}
	);
	return danh_muc;
};
