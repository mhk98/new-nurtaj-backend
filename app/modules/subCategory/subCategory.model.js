const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const SubCategory = sequelize.define('SubCategory', {
    subCategoryId: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    
    subCategoryHeading: {
      type: DataTypes.STRING,
      allowNull: true,
    },

      });

  return SubCategory;
};
