const { Op } = require("sequelize");
const paginationHelpers = require("../../../helpers/paginationHelper");
const db = require("../../../models");
const SubCategoryItem = db.subCategoryItem;



const insertIntoDB = async (data) => {

    const result = await SubCategoryItem.create(data)

    return result;
};




// const getAllFromDB = async () => {
//   const categories = await Category.findAll({
//     include: [{
//       model: SubCategory,

//       include: [{
//         model: SubCategoryItem,

//       }],
//     }],
//     order: [['createdAt', 'DESC']], // createdAt অনুযায়ী DESC অর্ডারে সাজানো
//   });

//   const result = categories.map(menu => ({
//     icon: menu.default_image,
//     text: menu.categoryTitle,
//     extraClass: menu.extraClass,
//     mega: menu.mega,
//     megaContent: menu.subCategories?.map(megaMenu => ({
//       heading: megaMenu.subCategoryHeading,
//       megaItems: megaMenu.subCategoryItems?.map(item => ({
//         text: item.subCategoryItemTitle,
//       })),
//     })) || [],
//   }));

//   return result;
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
  let result = await SubCategoryItem.findAll({
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

    result = await SubCategoryItem.findAll({
      where: whereConditions,
      offset: skip,
      limit,
      order: options.sortBy && options.sortOrder
        ? [[options.sortBy, options.sortOrder.toUpperCase()]]
        : [['createdAt', 'ASC']],
    });
  }

  const total = await SubCategoryItem.count({ where: whereConditions });

  // If no products are found in both `title` and `tag`
  if (result.length === 0) {
    throw new ApiError(404, "SubCategoryItem not found");
  }

  return {
    meta: { total, page, limit },
    data: result,
  };
};


const updateOneFromDB = async (id, payload) => {
 

  const result = await SubCategoryItem.update(payload,{
    where:{
      subCategoryItemId:id
    }
  })


  return result

};

const SubCategoryItemService = {
  insertIntoDB,
  updateOneFromDB,
  getAllFromDB
};

module.exports = SubCategoryItemService;