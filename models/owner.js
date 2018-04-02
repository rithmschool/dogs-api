const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
  name: String,
  dogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Dog'
    }
  ]
});

module.exports = mongoose.model('Owner', ownerSchema); // "class"
