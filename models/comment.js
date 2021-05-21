const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    idUser: { type: String },
    idTicket: { type: String },
    idCreator: { type: String },
    message: { type: String },
    images: { type: Array },
    rating: { type: Number },
    likeCount: { type: Number },
    // name: { type: String, required: true },
    // image: { type: String },
});

module.exports = mongoose.model('Comment', commentSchema);