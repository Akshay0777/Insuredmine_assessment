const UserAccount = require('../models/userAccountModel');

// Create a new user account
exports.createUserAccount = async (req, res) => {
  try {
    const userAccount = new UserAccount(req.body);
    await userAccount.save();
    res.status(201).json(userAccount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all user accounts
exports.getAllUserAccounts = async (req, res) => {
  try {
    const userAccounts = await UserAccount.find();
    res.json(userAccounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user account by ID
exports.getUserAccountById = async (req, res) => {
  try {
    const userAccount = await UserAccount.findById(req.params.id);
    if (!userAccount) {
      return res.status(404).json({ message: 'User account not found' });
    }
    res.json(userAccount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user account
exports.updateUserAccount = async (req, res) => {
  try {
    const userAccount = await UserAccount.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!userAccount) {
      return res.status(404).json({ message: 'User account not found' });
    }
    res.json(userAccount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user account
exports.deleteUserAccount = async (req, res) => {
  try {
    const userAccount = await UserAccount.findByIdAndDelete(req.params.id);
    if (!userAccount) {
      return res.status(404).json({ message: 'User account not found' });
    }
    res.json({ message: 'User account deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
