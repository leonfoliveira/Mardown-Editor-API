const express = require('express');
const User = require('../models/user');

const router = express.Router();

const url = require('url');

router.get('/', (req, res) => {
  if (req.query.email) {
    User.findOne(req.query, (err, user) => {
      if (err) return res.status(500).send('Error when finding user by id.');
      if (!user) return res.status(404).send('No user found.');
      res.status(200).send(user);
    });
  } else {
    User.find({}, (err, users) => {
      if (err) return res.status(500).send('Error when finding users.');
      res.status(200).send(users);
    });
  }
});

router.get('/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) return res.status(500).send('Error when finding user by id.');
    if (!user) return res.status(404).send('No user found.');
    res.status(200).send(user);
  });
});

router.post('/', (req, res) => {
  User.create(req.body, (err, user) => {
    if (err) res.status(500).send('Error when creating user.');
    res.status(200).send(user);
  })
})

router.put('/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, user) => {
    if (err) return res.status(500).send('Error when updating user.');
    res.status(200).send(user);
  });
});

router.delete('/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, user) => {
    if (err) return res.status(500).send('Error when deleting user.');
    res.status(200).send(`User ${user._id} was deleted.`);
  });
});

module.exports = router;
