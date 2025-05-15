const User = require("../models/User");

// Ambil semua user (khusus superadmin)
exports.getAllUsers = (req, res) => {
  if (req.user.role !== "superadmin") {
    return res.status(403).json({ message: "Akses ditolak" });
  }

  User.getAll((err, users) => {
    if (err) return res.status(500).json({ error: err });
    res.json(users);
  });
};

// Ubah role user
exports.updateUserRole = (req, res) => {
  if (req.user.role !== "superadmin") {
    return res.status(403).json({ message: "Akses ditolak" });
  }

  const { role } = req.body;
  const userId = req.params.id;

  // Validasi role
  const validRoles = ["superadmin", "admin", "customer"];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ message: "Role tidak valid" });
  }

  User.updateRole(userId, role, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Role berhasil diubah" });
  });
};

// Ambil profil user sendiri
exports.getProfile = (req, res) => {
  const userId = req.user.id;

  User.getById(userId, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0)
      return res.status(404).json({ message: "User tidak ditemukan" });

    const user = result[0];
    delete user.password; // sembunyikan password
    res.json(user);
  });
};

// Hapus user
exports.deleteUser = (req, res) => {
  if (req.user.role !== "superadmin") {
    return res.status(403).json({ message: "Akses ditolak" });
  }

  const userId = req.params.id;
  User.delete(userId, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "User berhasil dihapus" });
  });
};
