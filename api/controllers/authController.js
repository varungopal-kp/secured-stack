const User = require("../models/User");
const {
  errorResponse,
  successResponse,
} = require("../helpers/responseHandler");
const {
  generateTokens,
  renewTokens,
  verifyRefreshToken,
} = require("../helpers/tokenHandler");
const config = require("../config/config.json");
const bcrypt = require("bcrypt");

exports.login = async (req, res, next) => {
  let params = req.body;

  try {
    const user = await User.findOne({ email: params.email });

    if (!user) {
      return errorResponse(res, { message: "Wrong credentials" });
    }

    const passwordCheck = bcrypt.compareSync(params.password, user.password);
    if (!passwordCheck) {
      return errorResponse(res, { message: "Wrong credentials" });
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

    return successResponse(res, {
      message: "Login Successful",
      data: { _tokens },
    });
  } catch (error) {
    return errorResponse(res, { message: "Login Failed", error });
  }
};

exports.register = async (req, res, next) => {
  let params = req.body;
  try {
    const userExist = await User.findOne({ email: params.email });
    if (userExist) {
      return errorResponse(res, { message: "User already exist" });
    }
    params.password = bcrypt.hashSync(params.password, config.jwt_salt);
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

    return successResponse(res, {
      message: "Register Successful",
      data: userData,
    });
  } catch (error) {
    return errorResponse(res, { message: "Register Failed", error });
  }
};

exports.renewToken = async (req, res, next) => {
  try {
    const _refreshToken = req.cookies["_refreshToken"];

    if (!_refreshToken) {
      return errorResponse(res, { message: "Renew Token Missing" });
    }

    const userId = verifyRefreshToken(_refreshToken);

    const user = await User.findOne({ _id: userId.userId });
    if (!user) {
      return errorResponse(res, { message: "User does not exist" });
    }

    if (user._refreshToken != _refreshToken) {
      res.clearCookie("_accessToken");
      res.clearCookie("_refreshToken");

      user._refreshToken = "";
      user.save();
      return errorResponse(res, { message: "Malicious token found" });
    }

    const _tokens = renewTokens(_refreshToken);

    user._refreshToken = _tokens.refreshToken;
    user.save();
    res.cookie("_accessToken", _tokens.accessToken, { httpOnly: true });
    res.cookie("_refreshToken", _tokens.refreshToken, {
      httpOnly: true,
    });
    return successResponse(res, {
      message: "Renew Token Successful",
      data: _tokens,
    });
  } catch (error) {
    return errorResponse(res, { message: "Renew Token Failed", error });
  }
};

exports.logout = async (req, res, next) => {
  res.clearCookie("_accessToken");
  res.clearCookie("_refreshToken");

  return successResponse(res, {
    message: "Logout Successful",
  });
};
