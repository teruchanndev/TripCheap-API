const mongoose = require('mongoose');

const citySchema = mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
});

module.exports = mongoose.model('City', citySchema);