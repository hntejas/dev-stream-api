const mongoose = require('mongoose');

const {Schema} = mongoose;

const ChannelSchema = new Schema({
    title: String,
    subscribers: Number,
    logo: String
}, {timestamps: true})

const Channel = mongoose.model('Channel', ChannelSchema);

module.exports = Channel;