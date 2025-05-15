const express = require("express");
const router = express.Router();
const controller = require("../controllers/expenseController");
const auth = require("../middlewares/authMiddleware");

router.get("/", auth, controller.getExpenses);
router.post("/", auth, controller.createExpense);
router.get("/report", auth, controller.getMonthlyExpenses);

module.exports = router;
