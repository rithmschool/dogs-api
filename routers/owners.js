const express = require('express');
const router = express.Router();

const { owners } = require('../handlers');

router
  .route('')
  .get(owners.readOwners)
  .post(owners.createOwner);

router
  .route('/:ownerId')
  .get(owners.readOwner)
  .patch(owners.updateOwner)
  .delete(owners.deleteOwner);

module.exports = router;
