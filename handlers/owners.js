const { Owner } = require('../models');

function createOwner(req, res, next) {
  const newOwner = new Owner(req.body);
  newOwner.save().then(owner => {
    return res.status(201).json(owner);
  });
}

function readOwners(req, res, next) {
  return Owner.find().then(owners => {
    return res.json(owners);
  });
}

function readOwner(req, res, next) {
  return Owner.findById(req.params.ownerId)
    .populate('pets')
    .exec()
    .then(owner => {
      if (!owner) {
        return res
          .status(404)
          .json({ message: `Owner ${req.params.ownerId} not found.` });
      }
      return res.json(owner);
    })
    .catch(err => {
      return res.json(err);
    });
}

function updateOwner(req, res, next) {
  return Owner.findByIdAndUpdate(req.params.ownerId, req.body, {
    new: true
  }).then(owner => res.json(owner));
}

function deleteOwner(req, res, next) {
  return Owner.findByIdAndRemove(req.params.ownerId).then(() => {
    return res.json({ message: 'Owner successfully deleted' });
  });
}

module.exports = {
  createOwner,
  readOwners,
  readOwner,
  updateOwner,
  deleteOwner
};
