const mongoose = require('mongoose');

const lobSchema = new mongoose.Schema({
  category_name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Lob = mongoose.model('Lob', lobSchema);

module.exports = Lob;
