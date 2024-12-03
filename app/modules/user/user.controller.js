const catchAsync = require("../../../shared/catchAsync");
const pick = require("../../../shared/pick");
const sendResponse = require("../../../shared/sendResponse");
const UserService = require("./user.service");
// const { UserService } = require("./user.service");



const login = catchAsync(async (req, res) => {

  const result = await UserService.login(req.body);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User login successfully!!",
      data: result
  })
})

const register = catchAsync(async (req, res) => {
  const { Email, Password } = req.body;
console.log(req.body)
const data = {
  Email, Password
}
  const result = await UserService.register(data);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User register successfully!!",
      data: result
  })
})


const getAllUserFromDB = catchAsync(async (req, res) => {

  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await UserService.getAllUserFromDB( options);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User data fetched!!",
      meta: result.meta,
      data: result.data
  })
})


const getUserById = catchAsync(async (req, res) => {

  const result = await UserService.getUserById(req.params.id);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User data fetched!!",
      data: result
  })
})


const updateUserFromDB = catchAsync(async (req, res) => {
const {id} = req.params;
console.log("userId", id);
const {FirstName, LastName, Email, Phone, Address, role, Country, City, PostalCode  } = req.body;
console.log(req.body);
const data = {
  FirstName, LastName, Email, Phone, Address, role, Country, City, PostalCode,
  image: req.file === undefined ? undefined : req.file.path,
}

// console.log('userData', data);

console.log(id);
  const result = await UserService.updateUserFromDB(id, data);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User update successfully!!",
      data: result
  })
})


const deleteUserFromDB = catchAsync(async (req, res) => {

  const result = await UserService.deleteIdFromDB(req.params.id);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User delete successfully!!",
      data: result
  })
})


const UserController = {
  getAllUserFromDB,
  login,
  register,
  getUserById,
  updateUserFromDB,
  deleteUserFromDB
};

module.exports = UserController;
