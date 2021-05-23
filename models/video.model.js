const mongoose = require('mongoose');

const {Schema} = mongoose;

const VideoSchema = new Schema({
    embedId: String,
    title: String,
    channel: { type: Schema.Types.ObjectId, ref: 'Channel' },
    views: Number,
    age: String,
    likes: Number,
    thumbnailImgUrl:String
}, {timestamps: true})

const Video = mongoose.model('Video', VideoSchema);

module.exports = Video;