const jwt = require("jsonwebtoken");
const ApiError = require("../error/ApiError");
require("dotenv").config();

exports.generateToken = (userInfo) => {
  try {
    const payload = {
      Phone: userInfo.phone
    };

    console.log("payload", payload);

    // Token generation with 24 hours expiration
    const token = jwt.sign(payload, process.env.TOKEN_SECRET
    //   , {
    //   expiresIn: '40d',  // 1 month + 10 days
    // }
  );
    

    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw new ApiError(500, "Token generation failed");
  }
}
