const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require("./db");
const invalidRouteHandler = require('./middlewares/invalid-route-handler.js');

const videoRouter = require("./routes/video.router");
const channelRouter = require("./routes/channel.router");

const app = express();
app.use(cors());
app.use(bodyParser.json());

db.init();

app.get('/',function(req, res){
  res.send("Welcome to Dev Stream API, please refer documentation for API details")
});

app.use("/videos", videoRouter);
app.use("/channels", channelRouter);

app.use(invalidRouteHandler);

app.listen(3000, () => {
  console.log('server started');
});