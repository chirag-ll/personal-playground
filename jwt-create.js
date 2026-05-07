const sign = require('jwt-encode');

function getUnixTimestampUTC() {
  return Math.floor(new Date().getTime() / 1000);
    // return Math.floor(Date.now() / 1000); // cleaner, same result
}

const claims = {
  // serie a - qa
  // "iss": 'YJVvlOml1AhFVNkRm9gwKAgE3iP0fmBjmct2v0oh',
  // Greenppoint - MVP
  // "iss": 'Zl5S9r8m7xwK1g3IVbDawdQl9n1WKxraWzq3za1g',
  // Paysafe Demo - Application
  // "iat": getUnixTimestampUTC() - 300,
  "iss": '6372l9tCxvqemEwOcFO6VRzqrKexiQBZGS97M6l2',
  "iat": 1767677174,
  "custom_profile_id": "1100000002856384",
}

// const serie_a_client_secret = "Ryv7Sn4GN1CUdNYItCnR1H7NFCS8mgU3Opki-Q9c5r5e-DEPybBklw"; 
//Chirag Admin all apps
// const producer_token = 'uzO9YXh95hM68Z2hmu8S4_en-ECTb9hGlgSN36ZPedzYQkLCx8vQrw';
  // Paysafe Demo - Application
const producer_token = 'Qnhv-6eiQJVwS6ik4Dv2Qd-rv6BD0nTUhF6CtwXJV5IrmTKuqaPGIg';


console.log(sign(claims, producer_token, algorithm = "HS256"));