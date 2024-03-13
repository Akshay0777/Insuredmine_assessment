const mongoose = require('mongoose');

const carrierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  website: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  zipCode: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Carrier = mongoose.model('Carrier', carrierSchema);

module.exports = Carrier;
