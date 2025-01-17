// eslint-disable-next-line @typescript-eslint/no-var-requires
const db = require("../db/db");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { DataTypes } = require("sequelize");

// Define models
db.user = require("../app/modules/user/user.model")(db.sequelize, DataTypes);
db.product = require("../app/modules/product/product.model")(db.sequelize, DataTypes);
db.brand = require("../app/modules/brand/brand.model")(db.sequelize, DataTypes);
db.category = require("../app/modules/category/category.model")(db.sequelize, DataTypes);
db.subCategory = require("../app/modules/subCategory/subCategory.model")(db.sequelize, DataTypes);
db.subCategoryItem = require("../app/modules/subCategoryItem/subCategoryItem.model")(db.sequelize, DataTypes);
db.seller = require("../app/modules/seller/seller.model")(db.sequelize, DataTypes);
db.cart = require("../app/modules/cart/cart.model")(db.sequelize, DataTypes);
db.order = require("../app/modules/order/order.model")(db.sequelize, DataTypes);



// // Define associations
// db.purchase.hasOne(db.accounting, { foreignKey: "purchaseId" });
// db.accounting.belongsTo(db.purchase, { foreignKey: "purchaseId" });

// db.sale.hasOne(db.accounting, { foreignKey: "saleId" });
// db.accounting.belongsTo(db.sale, { foreignKey: "saleId" });

// db.supplier.hasMany(db.purchase, { foreignKey: "supplierId" });
// db.purchase.belongsTo(db.supplier, { foreignKey: "supplierId" });

// db.buyer.hasMany(db.sale, { foreignKey: "buyerId" });
// db.sale.belongsTo(db.buyer, { foreignKey: "buyerId" });

// db.user.hasMany(db.sale, { foreignKey: "userId" });
// db.sale.belongsTo(db.user, { foreignKey: "userId" });

// db.product.hasMany(db.sale, { foreignKey: "productId" });
// db.sale.belongsTo(db.product, { foreignKey: "productId" });

//Realtion for product table

db.brand.hasMany(db.product, { foreignKey: "brand_id" });
db.product.belongsTo(db.brand, { foreignKey: "brand_id" });

db.category.hasMany(db.product, { foreignKey: "category_id" });
db.product.belongsTo(db.category, { foreignKey: "category_id" });


db.subCategoryItem.hasMany(db.product, { foreignKey: "subCategoryItem_id" });
db.product.belongsTo(db.subCategoryItem, { foreignKey: "subCategoryItem_id" });

db.seller.hasMany(db.product, { foreignKey: "seller_id" });
db.product.belongsTo(db.seller, { foreignKey: "seller_id" });

//Product relation with cart table
db.product.hasMany(db.cart, { foreignKey: "product_id" });
db.cart.belongsTo(db.product, { foreignKey: "product_id" });

db.user.hasMany(db.cart, { foreignKey: "user_id" });
db.cart.belongsTo(db.user, { foreignKey: "user_id" });


//Relation for brand table
db.seller.hasMany(db.brand, { foreignKey: "seller_id" });
db.brand.belongsTo(db.seller, { foreignKey: "seller_id" });

db.category.hasMany(db.brand, { foreignKey: "category_id" });
db.brand.belongsTo(db.category, { foreignKey: "category_id" });

db.subCategory.hasMany(db.brand, { foreignKey: "subCategory_id" });
db.brand.belongsTo(db.subCategory, { foreignKey: "subCategory_id" });

db.subCategoryItem.hasMany(db.brand, { foreignKey: "subCategoryItem_id" });
db.brand.belongsTo(db.subCategoryItem, { foreignKey: "subCategoryItem_id" });


//Relation for subCategory table
db.category.hasMany(db.subCategory, { foreignKey: "category_id" });
db.subCategory.belongsTo(db.category, { foreignKey: "category_id" });

db.category.hasMany(db.subCategoryItem, { foreignKey: "category_id" });
db.subCategoryItem.belongsTo(db.category, { foreignKey: "category_id" });

//Relation for subCategoryItem table
db.subCategory.hasMany(db.subCategoryItem, { foreignKey: "subCategory_id" });
db.subCategoryItem.belongsTo(db.subCategory, { foreignKey: "subCategory_id" });



// Sync the database
db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Connection re-synced successfully");
  })
  .catch((err) => {
    console.error("Error on re-sync:", err);
  });

module.exports = db;
