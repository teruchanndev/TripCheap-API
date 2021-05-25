const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    idUser: { type: String },
    nameUser: { type: String },
    idTicket: { type: String },
    idCreator: { type: String },
    message: { type: String },
    images: { type: Array },
    rating: { type: Number },
    likeCount: { type: Number },
    // name: { type: String, required: true },
    // image: { type: String },
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Comment', commentSchema);