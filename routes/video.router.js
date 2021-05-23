const express = require("express");
const router = express.Router();

const Video = require("../models/video.model")

router.get('/', async (req, res) => {
  let videos = [];
  videos = await Video.find().populate('channel', 'title subscribers logo');
  res.json({
    success: true,
    videos: videos
  })
})

router.post("/", async (req, res) => {
  let videos = [];
  videos = await Video.insertMany(req.body.videos);
  res.json({
    success: true,
    data: {
      message: "Videos Added",
      videos: videos,
      count: videos && videos.length
    }
  });
});

module.exports = router;