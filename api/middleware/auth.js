const jwt = require("jsonwebtoken");
module.exports.isAuthorized = function (req, res, next) {
   // return next();
  try {
    const authHeaders = req.headers["authorization"];
    const token = authHeaders && authHeaders.split(" ")[1];

    if (!token)
      return res.status(401).json({
        success: false,
        message: "Authentication failure!",
        error: "Authentication failure!",
      });

    const privateKey = process.env.JWT_KEY;
    jwt.verify(token, privateKey, function (err, decoded) {
      if (err) return res.sendStatus(403);
      req.auth = decoded;
    });
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Authentication failure!",
      error: "Authentication failure!",
    });
  }
};
