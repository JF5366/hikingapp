const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trailSchema = new Schema({
  name: { type: String, required: true },
  length: { type: Number, required: false },
  start: { type: String, required: false},
  end: { type: String, required: true },
  comments: [{
    // an id referencing the comment
    type: mongoose.Types.ObjectId,
    // search for it in the Comments collection
    ref: 'Comment'
 }]
},{ timestamps: true })

 const Trail = mongoose.model('Trail', trailSchema);

 module.exports = Trail


// const hikerSchema = new Schema({
//     timeToHike: {type: number, required: true}

// })