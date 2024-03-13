const mongoose = require('mongoose');

const userAccountSchema = new mongoose.Schema({
  accountName: {
    type: String,
    required: true,
    unique: true
  },
  userType: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const UserAccount = mongoose.model('UserAccount', userAccountSchema);

module.exports = UserAccount;
