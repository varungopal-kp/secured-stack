const logger = require("../config/logger");

exports.createError = function (message, error = false) {
  const msg = message;
  if (error) {
    msg = error.toString();
  }
  logger.log("error", msg);
  return new Error(message);
};
