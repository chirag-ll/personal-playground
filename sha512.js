const crypto = require('crypto');

console.log(
  crypto.createHash('sha512') // ✅ algorithm
    .update('VyyzLUy8nih4lHKCL3111775470145000Gi33P5kJTzdjpuefSpPb') // ✅ your string
    .digest('hex')
);