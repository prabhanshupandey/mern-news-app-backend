const adminRoutes = require("./routes/adminRoutes");
const storyRoutes = require("./routes/storyRoutes");
const scrapeHackerNews = require("./scraper/hackerNewsScraper");
const protect = require("./middleware/authMiddleware");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const scrapeRoutes = require("./routes/scrapeRoutes");
dotenv.config();

connectDB();

scrapeHackerNews();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/stories", storyRoutes);

app.use("/api/scrape", scrapeRoutes);

app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Backend Running Successfully");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});