const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Document = new Schema({
  title: {
    type: String,
    require: true,
    default: 'newdocument'
  },
  content: {
    type: String,
    require: true,
    default: ''
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  createdAt: {
    type: Date,
    require: true,
    default: Date.now
  }
});

module.exports = mongoose.model('Document', Document);