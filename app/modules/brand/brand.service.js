const { Op, where } = require("sequelize"); // Ensure Op is imported
const paginationHelpers = require("../../../helpers/paginationHelper");
const db = require("../../../models");
const ApiError = require("../../../error/ApiError");
const { BrandSearchableFields } = require("./brand.constants");
const Brand = db.brand;


const insertIntoDB = async (data) => {
  const result = await Brand.create(data);
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
      [Op.or]: BrandSearchableFields.map((field) => ({
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
  const result = await Brand.findAll({
    where: whereConditions,
    offset: skip,
    limit,
    order: options.sortBy && options.sortOrder
      ? [[options.sortBy, options.sortOrder.toUpperCase()]] // Ensure sortOrder is uppercase
      : [['createdAt', 'ASC']], // Default sorting
  });

  // Get total count for pagination meta
  const total = await Brand.count({
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
  
  const result = await Brand.findOne({
    where:{
      Id:id
    }
  })

  return result
};


const deleteIdFromDB = async (id) => {




  const result = await Brand.destroy(
    {
      where:{
        id:id
      }
    }
  )

  return result
};


const updateOneFromDB = async (id, payload) => {
 
  const result = await Brand.update(payload,{
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




const BrandService = {
  getAllFromDB,
  insertIntoDB,
  deleteIdFromDB,
  updateOneFromDB,
  getDataById,
  getAllFromDBWithoutQuery
};

module.exports = BrandService;