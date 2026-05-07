const crypto = require('crypto');

async function getBearerToken(outletKey, secretKey) {
    const timestamp = Date.now(); // Unix time in milliseconds

    // Generate SHA512 hash: {outletKey}{timestamp}{secretKey}
    const rawString = `${outletKey}${timestamp}${secretKey}`;
    const hashValue = crypto
        .createHash('sha512')
        .update(rawString)
        .digest('hex');

    const base64Hash = Buffer.from(hashValue).toString('base64');

    console.log('DEBUG:');
    console.log('  Timestamp:', timestamp);
    console.log('  Raw string:', rawString);
    console.log('  Hex hash:', hashValue);
    console.log('  Base64 hash:', base64Hash);


    const url = `https://oauth.performgroup.com/oauth/token/${outletKey}?_fmt=json&_rt=b`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${base64Hash}`,
            'Timestamp': String(timestamp),
        },
        body: new URLSearchParams({
            grant_type: 'client_credentials',
            scope: 'b2b-feeds-auth',
        }),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`OAuth failed [${response.status}]: ${error}`);
    }

    const data = await response.json();
    return data.access_token; // Bearer token
}

const outletKey = 'VyyzLUy8nih4lHKCL311';
const secretKey = 'Gi33P5kJTzdjpuefSpPb';
// Usage
(async () => {
    try {
        const token = await getBearerToken(outletKey, secretKey);
        console.log('Bearer Token:', token);
    } catch (err) {
        console.error(err.message);
    }
})();