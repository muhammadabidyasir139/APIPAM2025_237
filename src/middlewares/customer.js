module.exports = (req, res, next) => {
  if (req.user.role !== "customer") {
    return res
      .status(403)
      .json({ message: "Akses ditolak. Hanya customer yang diperbolehkan." });
  }
  next();
};
