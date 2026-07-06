const jwt = require('jsonwebtoken');

const CLIENT_ID = '6372l9tCxvqemEwOcFO6VRzqrKexiQBZGS97M6l2';
const CLIENT_SECRET = '1nFhUM551tNGJJcdJzN0W0Ok2ExAKcazkKBylRh7C5rgTBmL3MNOGJS90np2PCog4c4i6GyvbfjpWM0jt8qNOHNSZwZeKgmSPvFMFC7owknh1plYtLsqnUTQdtahyzmY';

const issuedAt = Math.floor(Date.now() / 1000);

const claims = {
  iss: CLIENT_ID,
  iat: issuedAt,
  custom_profile_id: '1100000001729044',
};

// 6e6c92e2-e524-48d9-a6aa-32bec1828535

const encodedJwt = jwt.sign(claims, Buffer.from(CLIENT_SECRET, 'base64'), { algorithm: 'HS256' });

console.log(encodedJwt);