const catchAsync = require("../../../shared/catchAsync");
const sendResponse = require("../../../shared/sendResponse");
const pick = require("../../../shared/pick");
const OrderService = require("./order.service");








const insertIntoDB = catchAsync(async (req, res) => {
  const result = await OrderService.insertIntoDB(req.body);
 
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Order data created!!",
      data: result
  })
})


const getAllFromDB = catchAsync(async (req, res) => {

//   const filters = pick(req.query, CartFilterAbleFileds);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  console.log('filters', req.query)


//   const result = await OrderService.getAllFromDB(filters, options);
  const result = await OrderService.getAllFromDB( options);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Order data fetched!!",
      meta: result.meta,
      data: result.data
  })
})


const getDataById = catchAsync(async (req, res) => {

  const result = await OrderService.getDataById(req.params.id);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Order data fetched!!",
      data: result
  })
})


const updateOneFromDB = catchAsync(async (req, res) => {
const {id} = req.params;
  const result = await OrderService.updateOneFromDB(id, req.body);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Order update successfully!!",
      data: result
  })
})


const deleteIdFromDB = catchAsync(async (req, res) => {
    const {id} = req.params;
    console.log('deleteId',id)

  const result = await OrderService.deleteIdFromDB(id);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Order delete successfully!!",
      data: result
  })
})

const getAllFromDBWithoutQuery = catchAsync(async (req, res) => {

  const result = await OrderService.getAllFromDBWithoutQuery();
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Order data fetch!!",
      data: result
  })
})

 const OrderController = {
  getAllFromDB,
  insertIntoDB,
  getDataById,
  updateOneFromDB,
  deleteIdFromDB,
  getAllFromDBWithoutQuery
}

module.exports = OrderController;