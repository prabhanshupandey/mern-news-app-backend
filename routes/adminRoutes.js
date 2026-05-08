const express = require("express");
const User = require("../models/User");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/users", protect, async (req, res) => {
  try {
    // only admin allowed
    if (req.user.email !== "admin@gmail.com") {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    const users = await User.find().select("-password");

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;