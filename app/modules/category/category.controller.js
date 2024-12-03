const { createLogger } = require("winston");
const catchAsync = require("../../../shared/catchAsync");
const sendResponse = require("../../../shared/sendResponse");
const CategoryService = require("./category.service");

// Controller method to insert categories into the database
const insertIntoDB = catchAsync(async (req, res) => {
 
  const {categoryTitle, mega} = req.body;
  console.log('default_image', req.file)
  const data = {
    default_image: req.file ? req.file.path || "" : "",
    categoryTitle,
    mega
  };

  console.log('categoryData', data)
  const result = await CategoryService.insertIntoDB(data);

  // Send response with success message and result data
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Category data created successfully!",
    data: result // assuming result contains relevant data to send back
  });
});


const getAllFromDB = catchAsync(async (req, res) => {

  const result = await CategoryService.getAllFromDB();
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Category data fetched!!",
      // meta: result.meta,
      data: result
  })
})


const updateOneFromDB = catchAsync(async (req, res) => {
  const {id} = req.params;
  const {categoryTitle, mega} = req.body;
  console.log('data', req.body)
  console.log('default_image', req.file)
  console.log('id', id)


  const data = {
    default_image: req.file === undefined ? undefined : req.file.path,
    categoryTitle,
    mega
  };

  console.log('CategoryData', data)

    const result = await CategoryService.updateOneFromDB(id, data);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Category update successfully!!",
        data: result
    })
  })

const CategoryController = {
  insertIntoDB,
  getAllFromDB,
  updateOneFromDB
};

module.exports = CategoryController;
