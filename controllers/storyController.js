const Story = require("../models/Story");
const User = require("../models/User");
const getStories = async (req, res) => {
  try {
    const stories = await Story.find().sort({ points: -1 });

    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch stories",
    });
  }
};

const getSingleStory = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);

    if (!story) {
      return res.status(404).json({
        message: "Story not found",
      });
    }

    res.status(200).json(story);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};


const toggleBookmark = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const storyId = req.params.id;

    const alreadyBookmarked = user.bookmarks.includes(storyId);

    if (alreadyBookmarked) {
      user.bookmarks = user.bookmarks.filter(
        (id) => id.toString() !== storyId
      );

      await user.save();

      return res.json({
        message: "Bookmark removed",
      });
    }

    user.bookmarks.push(storyId);

    await user.save();

    res.json({
      message: "Story bookmarked",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  getStories,
  getSingleStory,
  toggleBookmark,
};