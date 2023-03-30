const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trailSchema = new Schema({
  name: { type: String, required: true },
  length: { type: Number, required: false },
  start: { type: String, required: false},
  end: { type: String, required: true }
})

module.exports = mongoose.model('Trail', trailSchema);