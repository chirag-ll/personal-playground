const crypto = require('crypto');

const outletKey = 'VyyzLUy8nih4lHKCL311';
const secretKey = 'Gi33P5kJTzdjpuefSpPb';
const timestamp = Date.now(); // in milliseconds

const stringToHash = `${outletKey}${timestamp}${secretKey}`;

const authToken = crypto
  .createHash('sha512')
  .update(stringToHash)
  .digest('hex');

console.log('Timestamp:', timestamp);
console.log('String to Hash:', stringToHash);
console.log('Auth Token:', authToken);