const Expense = require("../models/Expense");

exports.getExpenses = (req, res) => {
  Expense.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.createExpense = (req, res) => {
  const { date, description, amount } = req.body;
  const created_by = req.user.id;

  Expense.create({ date, description, amount, created_by }, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: "Expense added" });
  });
};

exports.getMonthlyExpenses = (req, res) => {
  const { month } = req.query;
  Expense.getByMonth(month, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};
