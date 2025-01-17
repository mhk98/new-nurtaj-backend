
const catchAsync = require("../../../shared/catchAsync");
const sendResponse = require("../../../shared/sendResponse");
const SubCategoryItemService = require("./subCategoryItem.service");
const pick = require("../../../shared/pick");
const { subCategoryItemFilterAbleFileds } = require("./subCategoryItem.constants");


// Controller method to insert categories into the database
const insertIntoDB = catchAsync(async (req, res) => {
 
  const result = await SubCategoryItemService.insertIntoDB(req.body);

  // Send response with success message and result data
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "SubCategoryItem data created successfully!",
    data: result // assuming result contains relevant data to send back
  });
});


const getAllFromDB = catchAsync(async (req, res) => {

  const filters = pick(req.query, subCategoryItemFilterAbleFileds);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  console.log('filters', req.query)


  const result = await SubCategoryItemService.getAllFromDB(filters, options);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "SubCategoryItem data fetched!!",
      meta: result.meta,
      data: result.data
  })
})

const updateOneFromDB = catchAsync(async (req, res) => {
  const {id} = req.params;

    const result = await SubCategoryItemService.updateOneFromDB(id, req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "SubCategoryItem update successfully!!",
        data: result
    })
  })

const CategoryController = {
  insertIntoDB,
  updateOneFromDB,
  getAllFromDB
};

module.exports = CategoryController;
