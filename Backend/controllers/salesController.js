const Sale = require("../models/Sale");

exports.getSales = (req, res) => {
  Sale.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.createSale = (req, res) => {
  const { date, menu_id, quantity, total_price } = req.body;
  const created_by = req.user.id;

  Sale.create({ date, menu_id, quantity, total_price, created_by }, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: "Sale added" });
  });
};

exports.getMonthlySales = (req, res) => {
  const { month } = req.query;
  Sale.getByMonth(month, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};
