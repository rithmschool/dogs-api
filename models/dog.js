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

dogSchema.statics = {
  // stuff in this object will appear on the Dog model as methods

  /**
   * Create a new dog. Assume that the dog has an owner already
   * @param {Object} newDog an instance of a dog document
   */
  createDog(newDog) {
    return this.findOne({ name: newDog.name })
      .then(dog => {
        if (dog) {
          throw new Error(`THAT DOG ${newDog.name} EXISTS ALREADY`);
        }
        return newDog
          .save()
          .then(finalDog =>
            Owner.findOneAndUpdate(finalDog.owner, {
              $addToSet: { dogs: finalDog._id }
            }).then(() => finalDog)
          )
          .catch(err => {
            return Promise.reject(err);
          });
      })
      .catch(err => {
        return Promise.reject(err);
      });
  }
};

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
