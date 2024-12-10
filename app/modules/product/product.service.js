const { Op } = require("sequelize");
const paginationHelpers = require("../../../helpers/paginationHelper");
const db = require("../../../models");
const ApiError = require("../../../error/ApiError");
const { ProductSearchableFields } = require("./product.constants");
const Product = db.product;
const Brand = db.brand;

const insertIntoDB = async (data) => {
  const {product_type, title, brand_id, barcode, video_link,short_description,description, slug,tag,price, product_cost, packaging_cost, security_charge, loyalty_point, list_price, tour_price,vat, special_price, special_price_type, special_price_start,special_price_end,sku,manage_stock,qty, max_cart_qty,weight, weight_unit, in_stock,viewed,is_approximate, is_active, is_deleted,is_promotion,is_grocery, shuffle_number,related_products, allow_review,require_moderation,allow_refund, product_qc,delivery_location,minimum_cart_value,aff_commission_amount, aff_commission_type, aff_commission_from,aff_commission_to } = data;

  console.log("ProductData", data)
  const brand = await Brand.findOne({
    where: {
      id: brand_id
    }
  })

  const info = {
    brand_title:brand.title,
    product_type, title, brand_id, barcode, video_link,short_description,description, slug,tag,price, product_cost, packaging_cost, security_charge, loyalty_point, list_price, tour_price,vat, special_price, special_price_type, special_price_start,special_price_end,sku,manage_stock,qty, max_cart_qty,weight, weight_unit, in_stock,viewed,is_approximate, is_active, is_deleted,is_promotion,is_grocery, shuffle_number,related_products, allow_review,require_moderation,allow_refund, product_qc,delivery_location,minimum_cart_value,aff_commission_amount, aff_commission_type, aff_commission_from,aff_commission_to
  }

  console.log('info', info)
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

const getAllFromDB = async (filters, options) => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    // Use relevant fields for search
   if (searchTerm) {
    andConditions.push({
      [Op.or]: ProductSearchableFields.map((field) => ({
        [field]: {
          [Op.iLike]: `%${searchTerm}%`, // Case-insensitive partial match
        },
      })),
    });
  }
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      [Op.and]: Object.entries(filterData).map(([key, value]) => ({
        [key]: { [Op.eq]: value },
      })),
    });
  }

  const whereConditions = andConditions.length > 0 ? { [Op.and]: andConditions } : {};

  const result = await Product.findAll({
    where: whereConditions,
    offset: skip,
    limit,
    order: options.sortBy && options.sortOrder
      ? [[options.sortBy, options.sortOrder.toUpperCase()]]
      : [['createdAt', 'ASC']],
  });

  const total = await Product.count({ where: whereConditions });

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
  getAllFromDBWithoutQuery
};

module.exports = ProductService;