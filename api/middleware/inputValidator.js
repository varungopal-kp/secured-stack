const logger = require("../config/logger");
const sanitize = require("mongo-sanitize");

const niv = require("node-input-validator");

niv.setStrNotationRepetition(2000000000);

const Validator = niv.Validator;

exports.validate = function (attributes) {
  return async (req, res, next) => {
    try {
      const input = req.body;
      const v = new Validator(input, attributes);

      const matched = await v.check();
      if (!matched) {
        return res.status(400).send({
          success: false,
          message: "Input validation failed",
        });
      }
      req.body = sanitize(req.body);      
      next();
    } catch (error) {
      logger.log("error", error.toString());
      return res.status(400).send({
        success: false,
        message: "Input validation failed, Something went wrong!",
      });
    }
  };
};
