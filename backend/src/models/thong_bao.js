"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class thong_bao extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			thong_bao.belongsTo(models.khach_hang, {
				foreignKey: "id_khach_hang",
			});
			thong_bao.belongsTo(models.don_hang, {
				foreignKey: "id_don_hang",
			});
		}
	}
	thong_bao.init(
		{
			id_thong_bao: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			id_khach_hang: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			id_don_hang: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			thong_bao: DataTypes.STRING,
			ngay_hien_tai: DataTypes.DATE,
		},
		{
			sequelize,
			modelName: "thong_bao",
			tableName: "thong_bao",
			timestamps: false,
		}
	);
	return thong_bao;
};
