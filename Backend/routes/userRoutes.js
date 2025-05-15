const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middlewares/authMiddleware");

router.get("/", auth, userController.getAllUsers);
router.put("/:id/role", auth, userController.updateUserRole);
router.get("/me", auth, userController.getProfile);
router.delete("/:id", auth, userController.deleteUser);

module.exports = router;
