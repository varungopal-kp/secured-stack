const { errorLog } = require("../helpers/errorHandler");

exports.errorResponse = function (res, params) {
  try {
    const options = {
      status: params.status || 400,
      message: params.message || "Failed",
      error: params.error || {},
    };
    
    const error = options.error;
    let errorMessage = options.message;
    
    if (error && error.stack && error.message) {
      errorLog(options.error);
    } else if (error && error.errorMessage) {
      errorMessage = error.errorMessage;
    }

    return res.status(options.status).send({
      success: false,
      message: errorMessage,
    });
  } catch (error) {
    errorLog(error);
    return res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

exports.successResponse = function (res, params) {
  try {
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
  } catch (error) {
    errorLog(error);
    return res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};
