const catchAsync = require("../../../shared/catchAsync");
const sendResponse = require("../../../shared/sendResponse");
const pick = require("../../../shared/pick");
const CartService = require("./cart.service");








const insertIntoDB = catchAsync(async (req, res) => {
  const result = await CartService.insertIntoDB(req.body);
 
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Cart data created!!",
      data: result
  })
})


const getAllFromDB = catchAsync(async (req, res) => {

//   const filters = pick(req.query, CartFilterAbleFileds);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  console.log('filters', req.query)


//   const result = await CartService.getAllFromDB(filters, options);
  const result = await CartService.getAllFromDB( options);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Cart data fetched!!",
      meta: result.meta,
      data: result.data
  })
})


const getDataById = catchAsync(async (req, res) => {

  const result = await CartService.getDataById(req.params.id);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Cart data fetched!!",
      data: result
  })
})


const updateOneFromDB = catchAsync(async (req, res) => {
const {id} = req.params;
  const result = await CartService.updateOneFromDB(id, req.body);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Cart update successfully!!",
      data: result
  })
})


const deleteIdFromDB = catchAsync(async (req, res) => {
    const {id} = req.params;
    console.log('deleteId',id)

  const result = await CartService.deleteIdFromDB(id);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Cart delete successfully!!",
      data: result
  })
})

const getAllFromDBWithoutQuery = catchAsync(async (req, res) => {

  const result = await CartService.getAllFromDBWithoutQuery();
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Cart data fetch!!",
      data: result
  })
})

 const CartController = {
  getAllFromDB,
  insertIntoDB,
  getDataById,
  updateOneFromDB,
  deleteIdFromDB,
  getAllFromDBWithoutQuery
}

module.exports = CartController;