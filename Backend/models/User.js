const db = require("../config/db");

const User = {
  findByEmail: (email, callback) => {
    db.query("SELECT * FROM users WHERE email = ?", [email], callback);
  },

  create: (data, callback) => {
    db.query("INSERT INTO users SET ?", data, callback);
  },

  updateRole: (id, role, callback) => {
    db.query("UPDATE users SET role = ? WHERE id = ?", [role, id], callback);
  },

  getAll: (callback) => {
    db.query("SELECT id, name, email, role FROM users", callback);
  },
};

module.exports = User;
