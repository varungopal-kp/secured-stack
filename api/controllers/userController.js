const User = require("../models/User");
const {
  errorResponse,
  successResponse,
} = require("../helpers/responseHandler");

exports.getAll = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    return successResponse(res, {
      message: "Users Get Successful",
      data: users,
    });
  } catch (error) {
    return errorResponse(res, { message: "Users Get Failed", error });
  }
};
