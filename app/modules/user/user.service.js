const { where } = require("sequelize");
const { generateToken } = require("../../../helpers/jwtHelpers");
const paginationHelpers = require("../../../helpers/paginationHelper");
const db = require("../../../models");
const User = db.user;
const Sale = db.sale;
const bcrypt = require("bcryptjs");
const ApiError = require("../../../error/ApiError");




const login = async (buyerData) => {

  const { Email, Password } = buyerData;
  // console.log(buyerData);

  // Validate request data
  if (!Email || !Password) {
    throw new ApiError()
  }

  // Find user by email
  const user = await User.findOne({ where: { Email } });
  if (!user) {
    throw new ApiError(404, "No user found with this email. Please create an account first.");
  }

  // Validate password
  const isPasswordValid = bcrypt.compareSync(Password, user.Password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Incorrect password or email.")
  }

  // Generate JWT access token
  const accessToken = generateToken(user)

  // Set access token in cookie
  const cookieOptions = {
    secure: process.env.NODE_ENV === "production", // Fixed environment check
    httpOnly: true,
  };
  // res.cookie("accessToken", accessToken, cookieOptions);
  
 const result = {
  accessToken, user
 }

  return result
};


const register = async (userData) => {

  const {Email } = userData;
 
    const isUserExist = await User.findOne({
      where: { Email: Email },
    });

    if (isUserExist) {
      throw new ApiError(409, "User already exist")
    }

    const result = await User.create(userData);


  return result
};


const getAllUserFromDB = async ( options) => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);

  const whereConditions = {};


  const result = await User.findAll({
      where: whereConditions,
      offset: skip,
      limit,
      order: options.sortBy && options.sortOrder
          ? [[options.sortBy, options.sortOrder]]
          : [['createdAt', 'DESC']],
  });

  const total = await User.count({
      where: whereConditions,
  });

  return {
      meta: {
          total,
          page,
          limit
      },
      data: result
  };
};


const getUserById = async (id) => {
  
  const result = await User.findOne({
    where:{
      Id:id
    }
  })

  return result
};


const deleteUserFromDB = async (id) => {
  const result = await User.destroy(
    {
      where:{
        Id:id
      }
    }
  )

  return result
};


const updateUserFromDB = async (id, payload) => {
 const {FirstName, LastName, Address, Phone, Email} = payload;
 const data ={
  FirstName, LastName, Address, Phone, Email
 }

 const saleDataUpdate = await Sale.update(data,{
  where:{userId: id }
 })
  const result = await User.update(payload,{
    where:{
      Id:id
    }
  })

  return result

};


 const UserService = {
  getAllUserFromDB,
  login,
  register,
  deleteUserFromDB,
  updateUserFromDB,
  getUserById

}

module.exports = UserService