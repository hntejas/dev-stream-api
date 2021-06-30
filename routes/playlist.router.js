const express = require("express");
const router = express.Router();

const Playlist = require("../models/playlist.model")

router.post("/", async (req, res) => {
  try{
    const {name} = req.body;
    const playlist = await Playlist.create({user: req.uid, name: name});

    res.json({
      success: true,
      playlist: playlist
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

router.put("/", async (req, res) => {
  try{
    const {playlistId, playlistName} = req.body;
    const playlist = await Playlist.findOneAndUpdate({_id: playlistId},{ name: playlistName});

    res.json({
      success: true
    });
  }catch(e){
    res.status(500).json({
      success: false,
      error: {
        message: "Mongoose error: " + e.message
      }
    });
  } 
}); 

router.post("/video", async (req, res) => {
  try{
    const {playlistId, videoId} = req.body;

    const playlist = await Playlist.findOneAndUpdate({_id: playlistId},{ $push: { videos: videoId }});

    res.json({
      success: true,
      playlist: playlist
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

router.post("/video/remove", async (req, res) => {
  try{
    const {playlistId, videoId} = req.body;

    await Playlist.findOneAndUpdate({_id: playlistId},{ $pull: { videos: videoId }});

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

router.delete("/:playlistId", async (req, res) => {
  try{
    const {playlistId} = req.params;
    await Playlist.deleteOne({ _id: playlistId})
    res.json({
      success: true
    })
  }catch(e){
    res.status(500).json({
      success: false,
      error: {
        message: "Mongoose error: " + e.message
      }
    });
  } 
});

module.exports = router;