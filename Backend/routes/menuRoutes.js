const express = require("express");
const router = express.Router();
const controller = require("../controllers/menuController");
const auth = require("../middlewares/authMiddleware");

router.get("/", controller.getMenus);
router.post("/", auth, controller.createMenu);
router.put("/:id", auth, controller.updateMenu);
router.delete("/:id", auth, controller.deleteMenu);

module.exports = router;
