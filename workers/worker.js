const { workerData, parentPort } = require('worker_threads');

function parseData(row) {
  const parseDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString);
  };


  return {
    firstName: row['firstname'] || '',
    dob: parseDate(row['dob']),
    address: row['address'] || '',
    phoneNumber: row['phone'] || '',
    state: row['state'] || '',
    zipCode: row['zip'] || '',
    email: row['email'] || '',
    gender: row['gender'] || '',
    userType: row['userType'] || '',
    policyNumber: row['policy_number'] || '',
    startDate: parseDate(row['policy_start_date']),
    endDate: parseDate(row['policy_end_date']),
    policyCategory: row['category_name'] || '',
    collectionId: row['collection_id'] || '',
    companyCollectionId: row['company_collection_id'] || '',
    category: row['category_name'] || ''
  };

}

const parsedData = workerData.map(parseData);

parentPort.postMessage(parsedData);
