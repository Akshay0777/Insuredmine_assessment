const XLSX = require('xlsx');
const fs = require('fs');
const Worker = require('worker_threads').Worker;
const Policy = require('../models/policyModel');
const User = require('../models/userModel');
const Lob = require('../models/lobModel');

function parseAndUploadData(filePath) {
  return new Promise((resolve, reject) => {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet);

    const worker = new Worker("./workers/worker.js", {
      workerData: data
    });

    worker.on('message', async (parsedData) => {
      try {
        for (const row of parsedData) {
          
          let user = await User.findOneAndUpdate(
            { email: row.email },
            {
              $setOnInsert: {
                firstName: row.firstName,
                dob: row.dob,
                address: row.address,
                phoneNumber: row.phoneNumber,
                state: row.state,
                zipCode: row.zipCode,
                email: row.email,
                gender: row.gender,
                userType: row.userType
              }
            },
            { upsert: true, new: true }
          );

          let lob = await Lob.findOneAndUpdate(
            { category_name: row.category },
            {
              $setOnInsert: {
                category_name: row.category
              }
            },
            { upsert: true, new: true }
          );

          await Policy.findOneAndUpdate(
            { policyNumber: row.policyNumber },
            {
              $setOnInsert: {
                policyNumber: row.policyNumber,
                startDate: row.startDate,
                endDate: row.endDate,
                policyCategory: row.policyCategory,
                collectionId: row.collectionId,
                companyCollectionId: row.companyCollectionId,
                userId: user._id,
                category: lob._id
              }
            },
            { upsert: true }
          );
        }

        resolve('Data uploaded successfully');
      } catch (error) {
        reject(error);
      }
    });

    worker.on('error', (error) => {
      reject(error);
    });
  });
}

module.exports = {
  parseAndUploadData
};
