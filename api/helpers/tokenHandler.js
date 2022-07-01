const jwt = require("jsonwebtoken");
const { createError } = require("../helpers/errorHandler");

const ACCESS_JWT_KEY = process.env.ACCESS_JWT_KEY;
const REFRESH_JWT_KEY = process.env.REFRESH_JWT_KEY;

const accessOptions = { expiresIn: "1h" };
const refreshOptions = { expiresIn: "7d" };

module.exports.generateTokens = (userId) => {
  try {
    const accessToken = jwt.sign({ userId }, ACCESS_JWT_KEY, accessOptions);
    const refreshToken = jwt.sign({ userId }, REFRESH_JWT_KEY, refreshOptions);
    return { accessToken, refreshToken };
  } catch (error) {
    throw createError("Authorization Failed");
  }
};
module.exports.renewTokens = (_refreshToken) => {
  try {
    const user = jwt.verify(_refreshToken, REFRESH_JWT_KEY);
    if (user) {
      const tokens = module.exports.generateTokens(user);
      return tokens;
    }
    throw createError("Unauthorized");
  } catch (error) {
      console.log(error)
    throw createError("Unauthorized");
  }
};
