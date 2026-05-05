const User = require("../models/User");

// Approve user
exports.approveUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User approved successfully",
      user
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all pending users
exports.getPendingUsers = async (req, res) => {
  try {
    const users = await User.find({ 
        isApproved: false,
    role: { $in: ["restaurant", "driver"] }
    });

    res.json(users);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDrivers = async (req, res) => {
  try {
    const drivers = await User.find({
      role: "driver",
      isApproved: true
    }).select("_id name email");

    res.json(drivers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};