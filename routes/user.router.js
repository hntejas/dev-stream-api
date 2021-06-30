const express = require("express");
const router = express.Router();

const Video = require("../models/video.model");
const Playlist = require("../models/playlist.model");
const User = require("../models/user.model");

router.get('/', async (req, res) => {
  const userPromise = await User.findById(req.uid, 'likedVideos history name').populate('history likedVideos');
  const userPlaylistPromise = await Playlist.find({user: req.uid}).populate('videos');
  const [user, userPlaylist] = await Promise.all([userPromise, userPlaylistPromise]);

  res.json({
    success: true,
    user: user,
    playlists: userPlaylist
  });
})

router.post("/like", async (req, res) => {
  try{
    const {videoId} = req.body;

    const video = await Video.findByIdAndUpdate(videoId, {$inc:{likes: 1}});
    const user = await User.findByIdAndUpdate(req.uid, {$push: {likedVideos: videoId}});

    res.json({
      success: true
    });
  }catch(e){
    res.status(500).json({
      success: false,
      error: {
        message: "Mongoose error: " + e.message
      }
    })
  } 
});

router.post("/unlike", async (req, res) => {
  try{
    const {videoId} = req.body;

    const video = await Video.findByIdAndUpdate(videoId, {$inc:{likes: -1}});
    const user = await User.findByIdAndUpdate(req.uid, {$pull: {likedVideos: videoId}});

    res.json({
      success: true
    });
  }catch(e){
    res.status(500).json({
      success: false,
      error: {
        message: "Mongoose error: " + e.message
      }
    })
  } 
});

router.post("/history", async (req, res) => {
  try{
    const {videoId} = req.body;

    const user = await User.findByIdAndUpdate(req.uid, {$addToSet: {history: videoId}});

    res.json({
      success: true
    });
  }catch(e){
    res.status(500).json({
      success: false,
      error: {
        message: "Mongoose error: " + e.message
      }
    })
  } 
});



module.exports = router;