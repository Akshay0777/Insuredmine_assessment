const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
  policyNumber: {
    type: String,
    required: true,
    unique: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lob',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  collectionId: {
    type: String
  },
  companyCollectionId: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Policy = mongoose.model('Policy', policySchema);

module.exports = Policy;
