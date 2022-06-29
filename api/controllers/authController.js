const User = require("../models/User");
const {
  errorResponse,
  successResponse,
} = require("../helpers/responseHandler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SALT = 10;

exports.login = async (req, res, next) => {
  let params = req.body;
  try {
    const user = await User.findOne({ email: params.email });

    if (!user) {
      return errorResponse(res, "Wrong credentials");
    }    
    const passwordCheck = bcrypt.compareSync(
      params.password,
      user.password
    );
    if (!passwordCheck) {
      return errorResponse(res, "Wrong credentials");
    }
    const userData = user.toJSON();
    delete userData.password;
    return successResponse(res, userData);
  } catch (error) {
    return errorResponse(res, error);
  }
};

exports.register = async (req, res, next) => {
  let params = req.body;
  try {
    const userExist = await User.findOne({ email: params.email });
    if (userExist) {
      return errorResponse(res, "User already exist");
    }
    params.password = bcrypt.hashSync(params.password, SALT);
    const user = await User.create(params);

    if (user) {
      const userData = user.toJSON();
      delete userData.password;
      return successResponse(res, userData);
    } else {
      return errorResponse(res, false);
    }
  } catch (error) {
    return errorResponse(res, error);
  }
};
