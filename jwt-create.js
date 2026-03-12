const sign = require('jwt-encode');

function getUnixTimestampUTC() {
  return Math.floor(new Date().getTime() / 1000);
}

const claims = {
    "iss": 'YJVvlOml1AhFVNkRm9gwKAgE3iP0fmBjmct2v0oh',
    "iat": 1772112428,
    "custom_profile_id": "testing-custom-api",
}

const serie_a_client_secret = "Ryv7Sn4GN1CUdNYItCnR1H7NFCS8mgU3Opki-Q9c5r5e-DEPybBklw"; 

console.log(sign(claims, serie_a_client_secret, algorithm="HS256"));