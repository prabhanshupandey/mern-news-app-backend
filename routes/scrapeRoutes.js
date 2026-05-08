const express = require("express");

const scrapeStories = require("../controllers/scrapeController");

const router = express.Router();

router.post("/", scrapeStories);

module.exports = router;