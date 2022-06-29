const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const inputValidator = require("../middleware/inputValidator");
const validationAttributes = require("../validations/user.json");

router.post(
  "/login",
  inputValidator.validate(validationAttributes.login),
  authController.login
);
router.post(
  "/register",
  inputValidator.validate(validationAttributes.register),
  authController.register
);

module.exports = router;
