const Policy = require('../models/policyModel');
const User = require('../models/userModel');

async function searchPolicyByUsername(username) {
  try {
    // Find the user by username
    const user = await User.findOne({ firstName: username });
    if (!user) {
      throw new Error('User not found');
    }

    // Find policies associated with the user
    const policies = await Policy.find({ userId: user._id });

    return policies;
  } catch (error) {
    throw new Error(`Error searching policies by username: ${error.message}`);
  }
}

module.exports = {
  searchPolicyByUsername
};
