const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Category = sequelize.define('Category', {
    categoryId: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    
    default_image: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    categoryTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    extraClass: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:"menu-item-has-children has-mega-menu"
    },

    subClass: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:"sub-menu"
    },

    mega: {
      type: DataTypes.BOOLEAN,
      defaultValue:false,
      allowNull: false,
    },

      });

  return Category;
};
