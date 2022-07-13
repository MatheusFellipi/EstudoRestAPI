var express = require("express");
var router = express.Router();
const controller = require("../../controllers/owner");

/* GET users listing. */
router.get("/", controller.getAllOwner);
router.get("/:id", controller.getOwnerById);

router.put("/:id", controller.updateOwner);
router.post("/", controller.addOwner);

router.delete("/:id", controller.RemoverOwner);

module.exports = router;
