const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Seller = sequelize.define('Seller', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  description: {
      type: DataTypes.TEXT,
      allowNull: true,
  },
  price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
  },
  stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
  },
    
      });

  return Seller;
};
