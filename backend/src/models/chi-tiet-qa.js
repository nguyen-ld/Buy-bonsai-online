'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chi - tiet - qa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  chi - tiet - qa.init({
    id_qa: DataTypes.INTEGER,
    noi_dung: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'chi-tiet-qa',
  });
  return chi - tiet - qa;
};