const Policy = require('../models/policyModel');

async function aggregatePoliciesByUser() {
  try {
    const aggregatedPolicies = await Policy.aggregate([
      {
        $group: {
          _id: '$userId',
          totalPolicies: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $unwind: '$user'
      },
      {
        $project: {
          _id: 0,
          userId: '$_id',
          userName: '$user.firstName',
          totalPolicies: 1
        }
      }
    ]);
    return aggregatedPolicies;
  } catch (error) {
    throw new Error(`Error aggregating policies by user: ${error.message}`);
  }
}

module.exports = {
  aggregatePoliciesByUser
};
