const { Op } = require("sequelize");
const ApiError = require("../../../error/ApiError");
const paginationHelpers = require("../../../helpers/paginationHelper");
const db = require("../../../models");
const Category = db.category;
const SubCategory = db.subCategory;
const SubCategoryItem = db.subCategoryItem;


const insertIntoDB = async (data ) => {

 

  
  
       // Iterate over each category and insert it into the database
    //    for (const category of categories) {
    //     // Create the main category
    //     const newCategory = await Category.create({
    //         icon: category.icon,
    //         text: category.text,
    //         extraClass: category.extraClass || null,
    //         subClass: category.subClass || null,
    //         mega: category.mega || false,
    //     });

    //     // If the category has mega content, insert subcategories
    //     if (category.megaContent) {
    //         for (const content of category.megaContent) {
    //             for (const megaItem of content.megaItems) {
    //                 await SubCategory.create({
    //                     heading: content.heading,
    //                     text: megaItem.text,
    //                     categoryId: newCategory.id, // Associate with the created category
    //                 });
    //             }
    //         }
    //     }
    // }




    const result = await Category.create(data)

    // return { message: "Categories and subcategories created successfully!" };


    return result;
};




const getAllFromDB = async () => {
  const categories = await Category.findAll({
    include: [{
      model: SubCategory,

      include: [{
        model: SubCategoryItem,

      }],
    }],
    order: [['createdAt', 'ASC']], // createdAt অনুযায়ী DESC অর্ডারে সাজানো
  });


  // console.log('categories', result)


  const result = categories.map(menu => ({
    categoryId: menu.categoryId,
    icon: menu.default_image,
    text: menu.categoryTitle,
    extraClass: menu.extraClass,
    subClass: menu.subClass,
    mega: menu.mega,
    megaContent: menu.SubCategories?.map(megaMenu => ({
      subCategoryId: megaMenu.subCategoryId,
      heading: megaMenu.subCategoryHeading,
      megaItems: megaMenu.SubCategoryItems?.map(item => ({
        categoryId:item.category_id,
        subCategoryItemId: item.subCategoryItemId,
        text: item.subCategoryItemTitle,
      })),
    })) || [],
  }));

  return result;
};






const updateOneFromDB = async (id, payload) => {
 

  const result = await Category.update(payload,{
    where:{
      categoryId:id
    }
  })


  return result

};

const CategoryService = {
  insertIntoDB,
  getAllFromDB,
  updateOneFromDB,

};

module.exports = CategoryService;