const mongoose = require('mongoose');

const dogSchema = new mongoose.Schema({
  name: String,
  breed: String,
  age: Number,
  sex: String,
  isCute: Boolean,
  isEvil: Boolean
});

module.exports = mongoose.model('Dog', dogSchema); // "class"
