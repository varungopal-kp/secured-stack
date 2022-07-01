const jwt = require("jsonwebtoken");
module.exports.isAuthorized = function (req, res, next) {
  // return next();
  if (req.path == "/login" || req.path == "/register") return next();

  try {
    const token = req.cookies["_accessToken"];

    if (!token)
      return res.status(401).json({
        success: false,
        message: "Authentication failure!",
        error: "Authentication failure!",
      });

    const privateKey = process.env.ACCESS_JWT_KEY;
    const decoded = jwt.verify(token, privateKey);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Authentication failure!",
        error: "Authentication failure!",
      });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Authentication failure!",
      error: "Authentication failure!",
    });
  }
};
