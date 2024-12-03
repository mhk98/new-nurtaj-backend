const { Op, where } = require("sequelize"); // Ensure Op is imported
const paginationHelpers = require("../../../helpers/paginationHelper");
const db = require("../../../models");
const ApiError = require("../../../error/ApiError");
const { ProductSearchableFields } = require("./product.constants");
const Product = db.product;


const insertIntoDB = async (data) => {
  const result = await Product.create(data);
  return result
};


const getAllFromDB = async (filters, options) => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  console.log('filters', filters)
  const andConditions = [];

  // Handle search terms (case-insensitive match on multiple fields)
  if (searchTerm) {
    andConditions.push({
      [Op.or]: ProductSearchableFields.map((field) => ({
        [field]: {
          [Op.iLike]: `%${searchTerm}%`, // Case-insensitive partial match
        },
      })),
    });
  }

  // Handle filters (exact match for provided keys)
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      [Op.and]: Object.entries(filterData).map(([key, value]) => ({
        [key]: {
          [Op.eq]: value, // Exact match
        },
      })),
    });
  }

  // Combine conditions
  const whereConditions = andConditions.length > 0 ? { [Op.and]: andConditions } : {};

  // Fetch data with conditions, pagination, and sorting
  const result = await Product.findAll({
    where: whereConditions,
    offset: skip,
    limit,
    order: options.sortBy && options.sortOrder
      ? [[options.sortBy, options.sortOrder.toUpperCase()]] // Ensure sortOrder is uppercase
      : [['createdAt', 'ASC']], // Default sorting
  });

  // Get total count for pagination meta
  const total = await Product.count({
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
  
  const result = await Product.findOne({
    where:{
      Id:id
    }
  })

  return result
};


const deleteIdFromDB = async (id) => {

  const productCountInPurchaseTable = await Purchase.findAll({
    where:{
      productId: id
    }
  })

  const productCountInSaleTable = await Sale.findAll({
    where:{
      productId: id
    }
  })


  if(productCountInPurchaseTable.length > 0) {
    throw new ApiError(400, "There is purchase transaction against this product. You cannot delete it.")
  }
  if(productCountInSaleTable.length > 0) {
    throw new ApiError(400, "There is sale transaction against this product. You cannot delete it.")
  }


  const result = await Product.destroy(
    {
      where:{
        Id:id
      }
    }
  )

  return result
};


const updateOneFromDB = async (id, payload) => {
 
  const {name} = payload
  const result = await Product.update(payload,{
    where:{
      Id:id
    }
  })

  await Purchase.update({product_name:name},{
    where:{
      productId: id
    }
  })

  await Sale.update({product_name:name},{
    where:{
      productId: id
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