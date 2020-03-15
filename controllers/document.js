const express = require('express');
const Document = require('../models/document');

const router = express.Router();

router.get('/', (req, res) => {
  if (req.query.user) {
    Document.find(req.query, (err, docs) => {
      if (err) return res.status(500).send('Error when finding documents by user.');
      res.status(200).send(docs);
    });
  } else {
    Document.find({}, (err, docs) => {
      if (err) return res.status(500).send('Error when finding documents.');
      res.status(200).send(docs);
    });
  }
});

router.get('/:id', (req, res) => {
  Document.findById(req.params.id, (err, doc) => {
    if (err) return res.status(500).send('Error when finding document by id.');
    if (!doc) return res.status(404).send('No document found.');
    res.status(200).send(doc);
  });
});

router.post('/', (req, res) => {
  Document.create(req.body, (err, doc) => {
    if (err) res.status(500).send('Error when creating document.');
    res.status(200).send(doc);
  })
})

router.put('/:id', (req, res) => {
  Document.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, doc) => {
    if (err) return res.status(500).send('Error when updating document.');
    res.status(200).send(doc);
  });
});

router.delete('/:id', (req, res) => {
  Document.findByIdAndRemove(req.params.id, (err, doc) => {
    if (err) return res.status(500).send('Error when deleting document.');
    res.status(200).send(`Document ${doc._id} was deleted.`);
  });
});

module.exports = router;