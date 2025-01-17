module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define(
      "Cart",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },

        title: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          
        default_image: {
          type: DataTypes.STRING,
          allowNull: false,
        },
  
        price: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        weight: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
  
        quantity: {
          type: DataTypes.INTEGER,
          defaultValue: 1,
          allowNull: false,
        },
      },
      
    );
  
    return Cart;
  };