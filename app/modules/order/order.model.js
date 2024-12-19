module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define(
        "Order",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            cartProducts: {
                type: DataTypes.JSON, // JSON data type for storing complex data
                allowNull: false,
                defaultValue: {}, // Default value as an empty object
                get() {
                    return JSON.parse(this.getDataValue("orderDetails"));
                },
                set(val) {
                    this.setDataValue("orderDetails", JSON.stringify(val));
                },
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            apartment: {
                type: DataTypes.TEXT,
                allowNull: true, // Make optional as it's marked optional in the form
            },
            city: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            emailOrPhone: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true, // Ensure the field is not empty
                },
            },
            postalCode: {
                type: DataTypes.STRING, // Use STRING instead of INTEGER for flexibility
                allowNull: false,
            },
            keepUpdate: {
                type: DataTypes.BOOLEAN, // Corrected from Boolean to BOOLEAN
                allowNull: false,
                defaultValue: false,
            },
            saveInfo: {
                type: DataTypes.BOOLEAN, // Corrected from Boolean to BOOLEAN
                allowNull: false,
                defaultValue: false,
            },
            subTotal: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            total: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            timestamps: true, // Enable createdAt and updatedAt fields
        }
    );

    return Order;
};
