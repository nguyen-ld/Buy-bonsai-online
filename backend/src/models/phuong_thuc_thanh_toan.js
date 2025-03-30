"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class phuong_thuc_thanh_toan extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			phuong_thuc_thanh_toan.belongsTo(models.don_hang, {
				foreignKey: "id_don_hang",
			});
			phuong_thuc_thanh_toan.belongsTo(
				models.danh_sach_phuong_thuc_thanh_toan,
				{
					foreignKey: "id_pt_thanh_toan",
				}
			);
		}
	}
	phuong_thuc_thanh_toan.init(
		{
			id_thanh_toan: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			id_don_hang: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			id_pt_thanh_toan: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			trang_thai: {
				type: DataTypes.ENUM(
					"Chưa thanh toán",
					"Đang xử lý",
					"Đã thanh toán",
					"Thanh toán thất bại",
					"Hoàn tiền"
				),
				allowNull: false,
				defaultValue: "Chưa thanh toán",
			},
		},
		{
			sequelize,
			modelName: "phuong_thuc_thanh_toan",
			tableName: "phuong_thuc_thanh_toan",
			timestamps: false,
		}
	);
	return phuong_thuc_thanh_toan;
};
