var express = require("express");
var router = express.Router();

const userController = require("../controllers/userController");

router.get("/users/getAll", userController.getAll);

module.exports = router;
