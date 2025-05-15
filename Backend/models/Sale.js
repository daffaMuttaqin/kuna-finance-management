const db = require("../config/db");

const Sale = {
  getAll: (callback) => {
    db.query(
      `SELECT sales.*, menus.name as menu_name FROM sales 
              JOIN menus ON sales.menu_id = menus.id`,
      callback
    );
  },
  create: (data, callback) => {
    db.query("INSERT INTO sales SET ?", data, callback);
  },
  getByMonth: (month, callback) => {
    db.query(
      `SELECT sales.*, menus.name as menu_name FROM sales 
              JOIN menus ON sales.menu_id = menus.id
              WHERE DATE_FORMAT(date, '%Y-%m') = ?`,
      [month],
      callback
    );
  },
};

module.exports = Sale;
