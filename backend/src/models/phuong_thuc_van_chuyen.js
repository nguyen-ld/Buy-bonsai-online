"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class phuong_thuc_van_chuyen extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			phuong_thuc_van_chuyen.belongsTo(models.don_hang, {
				foreignKey: "id_don_hang",
			});
			phuong_thuc_van_chuyen.belongsTo(
				models.danh_sach_phuong_thuc_van_chuyen,
				{
					foreignKey: "id_pt_van_chuyen",
				}
			);
		}
	}
	phuong_thuc_van_chuyen.init(
		{
			id_van_chuyen: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			id_don_hang: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			id_pt_van_chuyen: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			status: {
				type: DataTypes.ENUM(
					"Chờ xác nhận",
					"Đang chuẩn bị hàng",
					"Đang vận chuyển",
					"Giao thành công",
					"Giao thất bại",
					"Hoàn hàng"
				),
				allowNull: false,
				defaultValue: "Chờ xác nhận",
			},
		},
		{
			sequelize,
			modelName: "phuong_thuc_van_chuyen",
			tableName: "phuong_thuc_van_chuyen",
			timestamps: false,
		}
	);
	return phuong_thuc_van_chuyen;
};
