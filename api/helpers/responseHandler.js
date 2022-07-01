const logger = require("../config/logger");

exports.errorResponse = function (res, params) {
  const options = {
    status: params.status || 400,
    message: params.message || "Failed",
    error: params.error || false,
  };

  if (options.error) {
    logger.log("error", options.error.toString());
  }

  return res.status(options.status).send({
    success: false,
    message: options.message,
  });
};

exports.successResponse = function (res, params) {
  const options = {
    status: params.status || 200,
    message: params.message || "Success",
    data: params.data || {},
  };
  return res.status(options.status).send({
    success: true,
    message: options.message,
    data: options.data,
  });
};
