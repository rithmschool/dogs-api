const { Dog } = require('../models');
const Validator = require('jsonschema').Validator;
const v = new Validator();
const { newDogSchema } = require('../schemas');

function createDog(req, res, next) {
  const result = v.validate(req.body, newDogSchema);
  if (!result.valid) {
    const errors = result.errors.map(e => e.message).join(', ');
    return next({ message: errors });
  }
  return Dog.createDog(new Dog(req.body))
    .then(dog => res.json(dog))
    .catch(err => next(err));
}

function readDogs(req, res, next) {
  const limit = req.query.limit;
  return Dog.find()
    .limit(limit)
    .exec()
    .then(dogs => {
      return res.json(dogs);
    })
    .catch(err => next(err));
}

function readDog(req, res, next) {
  return Dog.findById(req.params.dogId)
    .populate('owner')
    .exec()
    .then(dog => {
      if (!dog) {
        return res
          .status(404)
          .json({ message: `Dog ${req.params.dogId} not found.` });
      }
      return res.json(dog);
    })
    .catch(err => {
      return res.json(err);
    });
}

function updateDog(req, res, next) {
  return Dog.findByIdAndUpdate(req.params.dogId, req.body, { new: true }).then(
    dog => res.json(dog)
  );
}

function deleteDog(req, res, next) {
  return Dog.findByIdAndRemove(req.params.dogId).then(() => {
    return res.json({ message: 'Dog successfully deleted' });
  });
}

module.exports = {
  createDog,
  readDogs,
  readDog,
  updateDog,
  deleteDog
};
