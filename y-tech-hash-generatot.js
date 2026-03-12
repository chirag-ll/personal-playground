const crypto = require('crypto');

function generateSHA256Hash(timestamp, uid, action, secretKey) {
const val = `${timestamp}${uid}${action}${secretKey}`;

const data_to_hash = timestamp + "" + uid + "" + action + "" + secretKey
console.log(val);
console.log(data_to_hash);
console.log(crypto.createHash('sha256').update(data_to_hash).digest('hex'));

  return crypto
    .createHash('sha256')
    .update(val, 'utf8')
    .digest('hex');
}

const timestamp = Math.floor(Date.now() / 1000);
const uid = "anonymous-user-token";
const action = "played";
const secretKey = "9sDI1QtLSRwY7Cv9WnepMGsRlRjucPpVFIpGawFRNHzKdPiXaR";

const hash = generateSHA256Hash(timestamp, uid, action, secretKey);
console.log(hash);