const mongoose = require('mongoose');
const Owner = require('./owner');

const dogSchema = new mongoose.Schema({
  name: String,
  breed: String,
  age: Number,
  sex: String,
  isCute: Boolean,
  isEvil: Boolean,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Owner'
  }
});

// after Dog.findOneAndUpdate query runs
dogSchema.post('findOneAndUpdate', dog => {
  // call the owner model and update its dogs array
  Owner.findOneAndUpdate(dog.owner, { $addToSet: { dogs: dog._id } }).then(
    () => {
      console.log('POST HOOK RAN');
    }
  );
});

// after Dog.findOneAndRemove (delete) query runs
dogSchema.post('findOneAndRemove', dog => {
  // call the owner model and update its dogs array
  Owner.findOneAndUpdate(dog.owner, { $pull: { dogs: dog._id } }).then(() => {
    console.log('POST HOOK RAN');
  });
});

module.exports = mongoose.model('Dog', dogSchema); // "class"
