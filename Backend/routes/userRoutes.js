const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middlewares/authMiddleware");

// hanya superadmin yang boleh
router.get("/", auth, (req, res) => {
  if (req.user.role !== "superadmin")
    return res.status(403).json({ message: "Forbidden" });

  User.getAll((err, users) => {
    if (err) return res.status(500).json({ error: err });
    res.json(users);
  });
});

router.put("/:id/role", auth, (req, res) => {
  if (req.user.role !== "superadmin")
    return res.status(403).json({ message: "Forbidden" });

  const { role } = req.body;
  User.updateRole(req.params.id, role, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Role updated" });
  });
});

module.exports = router;
