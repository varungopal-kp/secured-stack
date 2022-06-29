exports.errorResponse = function (res, error, message = "Failed") {
  if (error) {
    return res.status(400).send({
      success: false,
      error: error.toString(),
      message,
    });
  }
  return res.status(400).send({
    success: false,
    error: message,
    message,
  });
};

exports.successResponse = function (res, data = {}, message = "Success") {
  return res.status(200).send({
    success: true,
    message,
    data,
  });
};
