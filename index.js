const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require("./utils/db");
const invalidRouteHandler = require('./middlewares/invalid-route-handler.js');
const authCheck = require('./middlewares/auth-check');

const videoRouter = require("./routes/video.router");
const playlistRouter = require("./routes/playlist.router");
const channelRouter = require("./routes/channel.router");
const userRouter = require("./routes/user.router");
const authRouter = require("./routes/auth.router");

const app = express();
app.use(cors());
app.use(bodyParser.json());

db.init();

app.get('/',function(req, res){
  res.send("Welcome to Dev Stream API, please refer documentation for API details")
});

app.use("/auth", authRouter);
app.use("/videos", videoRouter);
app.use("/channels", channelRouter);
app.use("/user", authCheck, userRouter);
app.use("/playlist", authCheck, playlistRouter);

app.use(invalidRouteHandler);

app.listen(3000, () => {
  console.log('server started');
});