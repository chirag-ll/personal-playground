const jwt = require('jsonwebtoken');

const CLIENT_ID = 'YJVvlOml1AhFVNkRm9gwKAgE3iP0fmBjmct2v0oh';
const CLIENT_SECRET = 'Ryv7Sn4GN1CUdNYItCnR1H7NFCS8mgU3Opki-Q9c5r5e-DEPybBklw';

const issuedAt = Math.floor(Date.now() / 1000);

const claims = {
  iss: CLIENT_ID,
  iat: issuedAt,
  custom_profile_id: 'testing-custom-api',
};

const encodedJwt = jwt.sign(claims, Buffer.from(CLIENT_SECRET, 'base64'), { algorithm: 'HS256' });

console.log(encodedJwt);