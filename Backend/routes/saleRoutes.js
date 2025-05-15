const express = require("express");
const router = express.Router();
const controller = require("../controllers/salesController");
const auth = require("../middlewares/authMiddleware");

router.get("/", auth, controller.getSales);
router.post("/", auth, controller.createSale);
router.get("/report", auth, controller.getMonthlySales);

module.exports = router;
