"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class QA extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	QA.init(
		{
			id_qa: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			tieu_de: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			noi_dung: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "QA",
			tableName: "QA",
			timestamps: false,
		}
	);
	return QA;
};
