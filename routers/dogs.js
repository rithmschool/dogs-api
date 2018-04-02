const express = require('express');
const router = express.Router();

const { dogs } = require('../handlers');

router
  .route('')
  .get(dogs.readDogs)
  .post(dogs.createDog);

router
  .route('/:dogId')
  .get(dogs.readDog)
  .patch(dogs.updateDog)
  .delete(dogs.deleteDog);

module.exports = router;
