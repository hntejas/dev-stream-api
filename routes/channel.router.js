const express = require("express");
const router = express.Router();

const Channel = require("../models/channel.model")

router.get('/', async (req, res) => {
  let channels = [];
  channels = await Channel.find() ;
  res.json({
    success: true,
    channels: channels
  })
})

router.post("/", async (req, res) => {
  let channels = [];
  channels = await Channel.insertMany(req.body.channels);
  res.json({
    success: true,
    data: {
      message: "Channels Created",
      channels: channels,
      count: channels && channels.length
    }
  });
});

module.exports = router;