const logger = require("../config/logger");

exports.createError = function (message, error = {}) {
  let errorMessage = message;
  if (error && error.stack && error.message) {
    exports.errorLog(error);
  } else if (error && error.errorMessage) {
    errorMessage = error.errorMessage;
  }

  throw { errorMessage };
};
exports.errorLog = function (error) {
  return logger.log("error", error.toString());
};
