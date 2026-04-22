const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ======================
// 🔐 REGISTER
// ======================
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, aadhaar, pan } = req.body;

    // 1. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Approval logic
    let isApproved = false;

    if (role === "customer") {
      isApproved = true; // customers can use immediately
    }

    // 4. Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      isApproved,
      kycDetails: role === "driver" ? { aadhaar, pan } : {}
    });

    // 5. Send response (avoid sending password)
    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isApproved: user.isApproved
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ======================
// 🔑 LOGIN
// ======================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 3. Generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 4. Send response
    res.json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isApproved: user.isApproved
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};