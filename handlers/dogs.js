const { Dog } = require('../models');

function createDog(req, res, next) {
  const newDog = new Dog(req.body);
  console.log(newDog);
  newDog.save().then(dog => {
    return res.json(dog);
  });
}

function readDogs(req, res, next) {
  return res.json('got /dogs');
}

function readDog(req, res, next) {
  return res.json(`got /dogs/${req.params.dogId}`);
}

function updateDog(req, res, next) {
  return res.json(`update /dogs/${req.params.dogId}`);
}

function deleteDog(req, res, next) {
  return res.json(`delete /dogs/${req.params.dogId}`);
}

module.exports = {
  createDog,
  readDogs,
  readDog,
  updateDog,
  deleteDog
};
