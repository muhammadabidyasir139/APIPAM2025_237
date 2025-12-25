module.exports = (req, res, next) => {
  if (req.user.role !== "owner") {
    return res
      .status(403)
      .json({ message: "Akses ditolak. Hanya owner yang diperbolehkan." });
  }
  next();
};
