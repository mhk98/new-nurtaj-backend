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
  updateOneFromDB
};

module.exports = SubCategoryItemService;