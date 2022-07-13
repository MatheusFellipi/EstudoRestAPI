var express = require("express");
var router = express.Router();
const controller = require("../../controllers/auth/auth");

router.post("/", controller.auth);

module.exports = router;
