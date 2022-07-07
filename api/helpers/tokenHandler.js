const jwt = require("jsonwebtoken");
const { createError } = require("../helpers/errorHandler");
const config = require("../config/config.json");

const ACCESS_JWT_KEY = process.env.ACCESS_JWT_KEY;
const REFRESH_JWT_KEY = process.env.REFRESH_JWT_KEY;

const accessOptions = { expiresIn: config.access_token_exp };
const refreshOptions = { expiresIn: config.refresh_token_exp };

module.exports.generateTokens = (userId) => {
  try {   
    const accessToken = jwt.sign({ userId }, ACCESS_JWT_KEY, accessOptions);
    const refreshToken = jwt.sign({ userId }, REFRESH_JWT_KEY, refreshOptions);

    return { accessToken, refreshToken };
  } catch (error) {
    return createError("Authorization Failed", error);
  }
};
module.exports.renewTokens = (_refreshToken) => {
  try {
   
    const user = jwt.verify(_refreshToken, REFRESH_JWT_KEY);

    if (!user) {
      return createError("Unauthorized");
    }

    const tokens = module.exports.generateTokens(user.userId);
    return tokens;
  } catch (error) {
    return createError("Unauthorized", error);
  }
};

module.exports.verifyRefreshToken = (_refreshToken) => {
  try {
    const user = jwt.verify(_refreshToken, REFRESH_JWT_KEY);

    if (!user) {
      return createError("Unauthorized");
    }

    return user;
  } catch (error) {
    return createError("Unauthorized", error);
  }
};

