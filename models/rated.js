const mongoose = require('mongoose');

const ratedSchema = mongoose.Schema({
    idTicket: { type: String },
    idCreator: { type: String },
    countRated: { type: Number },
    pointRated: { type: Number },
    listUserRated: { type: Array }
});

module.exports = mongoose.model('Rated', ratedSchema);