const mongoose = require("mongoose");

const {Schema} = mongoose;

const UserSchema = new Schema({
  name: {type:String, required: true},
  email: {type:String, required: true},
  password: {type:String, required: true},
  history: [{ type: Schema.Types.ObjectId, ref: 'Video' }],
  likedVideos: [{ type: Schema.Types.ObjectId, ref: 'Video' }]
}, {timestamps: true});

const User = mongoose.model('User', UserSchema);

module.exports = User;