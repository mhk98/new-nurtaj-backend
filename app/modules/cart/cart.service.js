const { Op, where } = require("sequelize"); // Ensure Op is imported
const paginationHelpers = require("../../../helpers/paginationHelper");
const db = require("../../../models");
const ApiError = require("../../../error/ApiError");
const Cart = db.cart;


const insertIntoDB = async (data) => {
  const result = await Cart.create(data);
  return result
};


const getAllFromDB = async ( options) => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  // const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  // // Handle search terms (case-insensitive match on multiple fields)
  // if (searchTerm) {
  //   andConditions.push({
  //     [Op.or]: ProductSearchableFields.map((field) => ({
  //       [field]: {
  //         [Op.iLike]: `%${searchTerm}%`, // Case-insensitive partial match
  //       },
  //     })),
  //   });
  // }

  // // Handle filters (exact match for provided keys)
  // if (Object.keys(filterData).length > 0) {
  //   andConditions.push({
  //     [Op.and]: Object.entries(filterData).map(([key, value]) => ({
  //       [key]: {
  //         [Op.eq]: value, // Exact match
  //       },
  //     })),
  //   });
  // }

  // Combine conditions
  const whereConditions = andConditions.length > 0 ? { [Op.and]: andConditions } : {};

  // Fetch data with conditions, pagination, and sorting
  const result = await Cart.findAll({
    where: whereConditions,
    offset: skip,
    limit,
    order: options.sortBy && options.sortOrder
      ? [[options.sortBy, options.sortOrder.toUpperCase()]] // Ensure sortOrder is uppercase
      : [['createdAt', 'DESC']], // Default sorting
  });

  // Get total count for pagination meta
  const total = await Cart.count({
    where: whereConditions,
  });

  // Return the result with meta information
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};



const getDataById = async (id) => {
  
  const result = await Cart.findOne({
    where:{
      id:id
    }
  })

  return result
};


const deleteIdFromDB = async (id) => {

  const result = await Cart.destroy(
    {
      where:{
        id:id
      }
    }
  )

  return result
};


const updateOneFromDB = async (id, payload) => {
 
  const result = await Cart.update(payload,{
    where:{
      id:id
    }
  })


  return result

};

const CartService = {
  getAllFromDB,
  insertIntoDB,
  deleteIdFromDB,
  updateOneFromDB,
  getDataById,
};

module.exports = CartService;