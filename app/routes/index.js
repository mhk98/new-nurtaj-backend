const express = require('express');
const UserRoutes = require('../modules/user/user.routes');
const ProductRoutes = require('../modules/product/product.routes');
const CategoryRoutes = require('../modules/category/category.routes');
const SubCategoryRoutes = require('../modules/subCategory/subCategory.routes');
const SubCategoryItemRoutes = require('../modules/subCategoryItem/subCategoryItem.routes');
const BrandRoutes = require('../modules/brand/brand.routes');
const CartRoutes = require('../modules/cart/cart.routes');
const OrderRoutes = require('../modules/order/order.routes');


const router = express.Router();

const moduleRoutes = [
 
  {
    path: "/user",
    route: UserRoutes
  },
 
  {
    path: "/category",
    route: CategoryRoutes
  },

  {
    path: "/subCategory",
    route: SubCategoryRoutes
  },

  {
    path: "/subCategoryItem",
    route: SubCategoryItemRoutes
  },

  {
    path: "/product",
    route: ProductRoutes
  },
  {
    path: "/brand",
    route: BrandRoutes
  },
  {
    path: "/cart",
    route: CartRoutes
  },
  {
    path: "/order",
    route: OrderRoutes
  },
  
 
 
  
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
module.exports = router;
