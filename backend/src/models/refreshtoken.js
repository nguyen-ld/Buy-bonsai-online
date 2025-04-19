"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class refreshtoken extends Model {
		static associate(models) {
			refreshtoken.belongsTo(models.khach_hang, {
				foreignKey: "id_khach_hang",
			});
		}
	}
	refreshtoken.init(
		{
			id_refresh_token: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			id_khach_hang: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			refreshToken: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "refreshtoken",
			tableName: "refreshtoken",
			timestamps: false,
		}
	);
	return refreshtoken;
};
