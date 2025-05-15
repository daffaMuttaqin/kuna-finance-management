const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = (req, res) => {
  const { name, email, password } = req.body;
  const hashed = bcrypt.hashSync(password, 10);

  User.findByEmail(email, (err, result) => {
    if (result.length > 0)
      return res.status(400).json({ message: "Email already exists" });

    User.create({ name, email, password: hashed, role: "customer" }, (err) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ message: "Registered successfully" });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email, (err, result) => {
    if (result.length === 0)
      return res.status(404).json({ message: "User not found" });

    const user = result[0];
    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.json({
      token,
      user: { id: user.id, name: user.name, role: user.role },
    });
  });
};
