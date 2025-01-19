const { Op } = require("sequelize");
const paginationHelpers = require("../../../helpers/paginationHelper");
const db = require("../../../models");
const ApiError = require("../../../error/ApiError");
const { ProductSearchableFields } = require("./product.constants");
const Product = db.product;
const Brand = db.brand;
const Category = db.category;
const SubCategoryItem = db.subCategoryItem;
const Seller = db.seller;

const insertIntoDB = async (data, image) => {
  // const {product_type, title, short_description, description,price } = data;
  // const {product_type, title, brand_id, category_id, subCategoryItem_id, seller_id, barcode, video_link,short_description,description, slug,tag,price, product_cost, packaging_cost, security_charge, loyalty_point, list_price, tour_price,vat, special_price, special_price_type, special_price_start,special_price_end,sku,manage_stock,qty, max_cart_qty,weight, weight_unit, in_stock,viewed,is_approximate, is_active, is_deleted,is_promotion,is_grocery, shuffle_number,related_products, allow_review,require_moderation,allow_refund, product_qc,delivery_location,minimum_cart_value,aff_commission_amount, aff_commission_type, aff_commission_from,aff_commission_to } = data;

  const {title, description, price, category_id, subCategoryItem_id } = data;

const info = {
  title, description, price, category_id, subCategoryItem_id, default_image: image, product_type:'arrival'
}


console.log("ProductData1", info)

  // const brand = await Brand.findOne({
  //   where: {
  //     id: brand_id
  //   }
  // })
  // const category = await Category.findOne({
  //   where: {
  //     categoryId: category_id
  //   }
  // })
  // const subCategoryItem = await SubCategoryItem.findOne({
  //   where: {
  //     subCategoryItemId: subCategoryItem_id
  //   }
  // })
  // const seller = await Seller.findOne({
  //   where: {
  //     id: seller_id
  //   }
  // })

  // const info = {
  //   brand_title: brand.title,
  //   category_title: category.categoryTitle,
  //   subCategoryItem_title: subCategoryItem.subCategoryItemTitle,
  //   seller_title: seller.title,
  //   product_type, title, brand_id, barcode, video_link,short_description,description, slug,tag,price, product_cost, packaging_cost, security_charge, loyalty_point, list_price, tour_price,vat, special_price, special_price_type, special_price_start,special_price_end,sku,manage_stock,qty, max_cart_qty,weight, weight_unit, in_stock,viewed,is_approximate, is_active, is_deleted,is_promotion,is_grocery, shuffle_number,related_products, allow_review,require_moderation,allow_refund, product_qc,delivery_location,minimum_cart_value,aff_commission_amount, aff_commission_type, aff_commission_from,aff_commission_to
  // }
  // const info = {
  //   brand_title: brand.title,
  //   category_title: category.categoryTitle,
  //   subCategoryItem_title: subCategoryItem.subCategoryItemTitle,
  //   seller_title: seller.title,
  //   product_type, title, brand_id, barcode, video_link,short_description,description, slug,tag,price, product_cost, packaging_cost, security_charge, loyalty_point, list_price, tour_price,vat, special_price, special_price_type, special_price_start,special_price_end,sku,manage_stock,qty, max_cart_qty,weight, weight_unit, in_stock,viewed,is_approximate, is_active, is_deleted,is_promotion,is_grocery, shuffle_number,related_products, allow_review,require_moderation,allow_refund, product_qc,delivery_location,minimum_cart_value,aff_commission_amount, aff_commission_type, aff_commission_from,aff_commission_to
  // }
  

  const result = await Product.create(info);
  return result
};


// const getAllFromDB = async (filters, options) => {
//   const { page, limit, skip } = paginationHelpers.calculatePagination(options);
//   const { searchTerm, ...filterData } = filters;

//   console.log('filters', filters)
//   const andConditions = [];

//   // Handle search terms (case-insensitive match on multiple fields)
//   if (searchTerm) {
//     andConditions.push({
//       [Op.or]: ProductSearchableFields.map((field) => ({
//         [field]: {
//           [Op.iLike]: `%${searchTerm}%`, // Case-insensitive partial match
//         },
//       })),
//     });
//   }

//   // Handle filters (exact match for provided keys)
//   if (Object.keys(filterData).length > 0) {
//     andConditions.push({
//       [Op.and]: Object.entries(filterData).map(([key, value]) => ({
//         [key]: {
//           [Op.eq]: value, // Exact match
//         },
//       })),
//     });
//   }

//   // Combine conditions
//   const whereConditions = andConditions.length > 0 ? { [Op.and]: andConditions } : {};

//   // Fetch data with conditions, pagination, and sorting
//   const result = await Product.findAll({
//     where: whereConditions,
//     offset: skip,
//     limit,
//     order: options.sortBy && options.sortOrder
//       ? [[options.sortBy, options.sortOrder.toUpperCase()]] // Ensure sortOrder is uppercase
//       : [['createdAt', 'ASC']], // Default sorting
//   });

//   // Get total count for pagination meta
//   const total = await Product.count({
//     where: whereConditions,
//   });

//   // Return the result with meta information
//   return {
//     meta: {
//       total,
//       page,
//       limit,
//     },
//     data: result,
//   };
// };


// const getAllFromDB = async (filters, options) => {
//   const { page, limit, skip } = paginationHelpers.calculatePagination(options);
//   const { searchTerm, ...filterData } = filters;

//   const andConditions = [];

//   if (searchTerm) {
//     // Add a condition to check if `title` starts with the search term
//     andConditions.push({
//       title: { [Op.like]: `${searchTerm}%` }, // Matches from the start of the title
//     });
//   }
  

//   if (Object.keys(filterData).length > 0) {
//     andConditions.push({
//       [Op.and]: Object.entries(filterData).map(([key, value]) => ({
//         [key]: { [Op.eq]: value },
//       })),
//     });
//   }

//   const whereConditions = andConditions.length > 0 ? { [Op.and]: andConditions } : {};

//   const result = await Product.findAll({
//     where: whereConditions,
//     offset: skip,
//     limit,
//     order: options.sortBy && options.sortOrder
//       ? [[options.sortBy, options.sortOrder.toUpperCase()]]
//       : [['createdAt', 'ASC']],
//   });

//   const total = await Product.count({ where: whereConditions });

//   return {
//     meta: { total, page, limit },
//     data: result,
//   };
// };


const getAllFromDB = async (filters, options) => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  let andConditions = [];

  // Match `title` starting from the search term
  if (searchTerm) {
    andConditions.push({
      title: { [Op.like]: `${searchTerm}%` },
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      [Op.and]: Object.entries(filterData).map(([key, value]) => ({
        [key]: { [Op.eq]: value },
      })),
    });
  }

  let whereConditions = andConditions.length > 0 ? { [Op.and]: andConditions } : {};

  // Try to find products matching `title`
  let result = await Product.findAll({
    where: whereConditions,
    offset: skip,
    limit,
    order: options.sortBy && options.sortOrder
      ? [[options.sortBy, options.sortOrder.toUpperCase()]]
      : [['createdAt', 'ASC']],
  });

  // If no products are found with `title`, fallback to `tag`
  if (result.length === 0 && searchTerm) {
    andConditions = [];
    andConditions.push({
      tag: { [Op.like]: `%${searchTerm}%` }, // Matches anywhere in `tag`
    });

    if (Object.keys(filterData).length > 0) {
      andConditions.push({
        [Op.and]: Object.entries(filterData).map(([key, value]) => ({
          [key]: { [Op.eq]: value },
        })),
      });
    }

    whereConditions = { [Op.and]: andConditions };

    result = await Product.findAll({
      where: whereConditions,
      offset: skip,
      limit,
      order: options.sortBy && options.sortOrder
        ? [[options.sortBy, options.sortOrder.toUpperCase()]]
        : [['createdAt', 'ASC']],
    });
  }

  const total = await Product.count({ where: whereConditions });

  // If no products are found in both `title` and `tag`
  if (result.length === 0) {
    throw new ApiError(404, "Product not found");
  }

  return {
    meta: { total, page, limit },
    data: result,
  };
};


const getDataById = async (id) => {
  
  const result = await Product.findOne({
    where:{
      id:id
    }
  })

  return result
};
const getArrivalDataById = async () => {
  
  const result = await Product.findAll({
    where:{
      product_type:'arrival'
    }
  })

  return result
};


const deleteIdFromDB = async (id) => {

  const result = await Product.destroy(
    {
      where:{
        id:id
      }
    }
  )

  return result
};


const updateOneFromDB = async (id, payload) => {
 
  const {brand_id} = payload;

  const brand = await Brand.findOne({
    where: {
      id: brand_id
    }
  })

  const info = {
    brand_title:brand.title,
    data,
  }
  const result = await Product.update(info,{
    where:{
      id:id
    }
  })


  return result

};

const getAllFromDBWithoutQuery = async () => {
 
  const result = await Product.findAll()

  return result

};




const ProductService = {
  getAllFromDB,
  insertIntoDB,
  deleteIdFromDB,
  updateOneFromDB,
  getDataById,
  getAllFromDBWithoutQuery,
  getArrivalDataById
};

module.exports = ProductService;