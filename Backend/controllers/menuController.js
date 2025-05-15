const Menu = require("../models/Menu");

exports.getMenus = (req, res) => {
  Menu.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.createMenu = (req, res) => {
  const { name, price, description, image_url } = req.body;
  Menu.create({ name, price, description, image_url }, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: "Menu created" });
  });
};

exports.updateMenu = (req, res) => {
  Menu.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Menu updated" });
  });
};

exports.deleteMenu = (req, res) => {
  Menu.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Menu deleted" });
  });
};
