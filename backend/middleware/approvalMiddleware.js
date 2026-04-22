module.exports = (req, res, next) => {
  try {
    // 1. Check if user exists (comes from authMiddleware)
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // 2. Check approval status
    if (!req.user.isApproved) {
      return res.status(403).json({
        message: "Account not approved yet"
      });
    }

    // 3. Allow request
    next();

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};