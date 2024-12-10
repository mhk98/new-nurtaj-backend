const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_type: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    brand_title: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    barcode: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
    default_image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    gallery_images: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    video_link: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    short_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    slug: {
      type: DataTypes.STRING(191),
      allowNull: false,
      unique: true,
    },
    tag: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(16, 2),
      allowNull: false,
    },
    product_cost: {
      type: DataTypes.DECIMAL(16, 2),
      allowNull: true,
    },
    packaging_cost: {
      type: DataTypes.DECIMAL(16, 2),
      allowNull: true,
    },
    security_charge: {
      type: DataTypes.DECIMAL(16, 2),
      allowNull: true,
    },
    loyalty_point: {
      type: DataTypes.DECIMAL(16, 2),
      allowNull: true,
    },
    list_price: {
      type: DataTypes.DECIMAL(16, 2),
      allowNull: true,
    },
    tour_price: {
      type: DataTypes.DECIMAL(16, 2),
      allowNull: true,
    },
    vat: {
      type: DataTypes.DECIMAL(16, 2),
      allowNull: true,
    },
    special_price: {
      type: DataTypes.DECIMAL(16, 2),
      allowNull: true,
    },
    special_price_type: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    special_price_start: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    special_price_end: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    sku: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
    manage_stock: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    qty: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    max_cart_qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 5,
    },
    weight: {
      type: DataTypes.DECIMAL(16, 2),
      allowNull: true,
    },
    weight_unit: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
    in_stock: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
    viewed: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    is_approximate: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    is_deleted: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
    is_promotion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    is_grocery: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: 'other',
    },
    shuffle_number: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
    },
    related_products: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    allow_review: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    require_moderation: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    allow_refund: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    product_qc: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    delivery_location: {
      type: DataTypes.STRING(256),
      allowNull: true,
      defaultValue: '0',
    },
    minimum_cart_value: {
      type: DataTypes.DOUBLE(16, 2),
      allowNull: true,
      defaultValue: 0.00,
    },
    aff_commission_amount: {
      type: DataTypes.DOUBLE(16, 2),
      allowNull: true,
      defaultValue: 0.00,
    },
    aff_commission_type: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    aff_commission_from: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    aff_commission_to: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });

  return Product;
};
