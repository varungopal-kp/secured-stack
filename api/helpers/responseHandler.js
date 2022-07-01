const logger = require("../config/logger");

exports.errorResponse = function (res, message, error = false) {
  if (error) {
    logger.log("error", error.toString());
  }
  return res.status(400).send({
    success: false,
    error: message,
    message,
  });
};

exports.successResponse = function (res, message = "Success", data = {}) {
  return res.status(200).send({
    success: true,
    message,
    data,
  });
};
