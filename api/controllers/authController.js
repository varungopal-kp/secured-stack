const User = require("../models/User");
const {
  errorResponse,
  successResponse,
} = require("../helpers/responseHandler");
const { generateTokens, renewTokens } = require("../helpers/tokenHandler");

const bcrypt = require("bcrypt");
const SALT = 10;

exports.login = async (req, res, next) => {
  let params = req.body;

  try {
    const user = await User.findOne({ email: params.email });

    if (!user) {
      return errorResponse(res, "Wrong credentials");
    }

    const passwordCheck = bcrypt.compareSync(params.password, user.password);
    if (!passwordCheck) {
      return errorResponse(res, "Wrong credentials");
    }
    const _tokens = generateTokens(user._id);

    user._refreshToken = _tokens.refreshToken;
    user.save();

    const userData = user.toJSON();
    delete userData.password;

    res.cookie("_accessToken", _tokens.accessToken, { httpOnly: true });
    res.cookie("_refreshToken", _tokens.refreshToken, {
      httpOnly: true,
    });

    return successResponse(res, "Login Successful", { _tokens });
  } catch (error) {
    return errorResponse(res, "Login Failed", error);
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

    const _tokens = generateTokens(user._id);

    user._refreshToken = _tokens.refreshToken;
    user.save();

    const userData = user.toJSON();
    delete userData.password;

    res.cookie("_accessToken", _tokens.accessToken, { httpOnly: true });
    res.cookie("_refreshToken", _tokens.refreshToken, {
      httpOnly: true,
    });

    return successResponse(res, "Register Successful", userData);
  } catch (error) {
    return errorResponse(res, "Register Failed", error);
  }
};

exports.renewToken = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const _refreshToken = req.cookies["_refreshToken"];
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return errorResponse(res, "User does not exist");
    }

    if (user._refreshToken != _refreshToken) {
      res.clearCookie("_accessToken");
      res.clearCookie("_refreshToken");

      user._refreshToken = "";
      user.save();

      return errorResponse(res, "Malicious token found");
    }

    const _tokens = renewTokens(_refreshToken);

    user._refreshToken = _tokens.refreshToken;
    user.save();

    return successResponse(res, "Renew Token Successful", _tokens);
  } catch (error) {
    return errorResponse(res, "Renew Token Failed", error);
  }
};
