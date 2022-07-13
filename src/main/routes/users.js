var express = require("express");
var router = express.Router();
const controller = require("../../controllers/user");

/* GET users listing. */
router.get("/", controller.getAllUsers);
router.get("/:id", controller.getUsersById);

router.put("/:id", controller.updateUsers);
router.post("/", controller.addUsers);

router.delete("/:id", controller.RemoverUsers);

module.exports = router;
