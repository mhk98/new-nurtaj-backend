const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const SubCategoryItem = sequelize.define('SubCategoryItem', {
    subCategoryItemId: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    
    subCategoryItemTitle: {
      type: DataTypes.STRING,
      allowNull: true,
    },

      });

  return SubCategoryItem;
};
