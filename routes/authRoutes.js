const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  registerUser,
  loginUser,
  getBookmarks,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);
router.get("/bookmarks", protect, getBookmarks);
module.exports = router;