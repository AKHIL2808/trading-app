'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class trades extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  trades.init({
    coinPair: DataTypes.STRING,
    time: DataTypes.DATE,
    price: DataTypes.DECIMAL,
    quantity: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'trades',
  });
  return trades;
};