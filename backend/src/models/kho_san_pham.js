"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class kho_san_pham extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			kho_san_pham.belongsTo(models.san_pham, {
				foreignKey: "id_san_pham",
			});
		}
	}
	kho_san_pham.init(
		{
			id_kho: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			tinh_trang: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			id_san_pham: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "kho_san_pham",
			tableName: "kho_san_pham",
			timestamps: false,
		}
	);
	return kho_san_pham;
};
