const db = require("../config/db");

const Expense = {
  getAll: (callback) => {
    db.query("SELECT * FROM expenses", callback);
  },
  create: (data, callback) => {
    db.query("INSERT INTO expenses SET ?", data, callback);
  },
  getByMonth: (month, callback) => {
    db.query(
      'SELECT * FROM expenses WHERE DATE_FORMAT(date, "%Y-%m") = ?',
      [month],
      callback
    );
  },
};

module.exports = Expense;
