const crypto = require("crypto");

const OUTLET_KEY = "1oj9sud1pnxin1eu5rbavs2dku";
const SECRET = "1ikunue16l04910osj8zx647b8";

async function generateAccessToken() {
  const currentTimeInMillis = Date.now();

  const hashToken = crypto
    .createHash("sha512")
    .update(`${OUTLET_KEY}${currentTimeInMillis}${SECRET}`, "utf-8")
    .digest("hex");

  console.log("Generating access token...");
  console.log("Timestamp:", currentTimeInMillis);

  try {
    const response = await fetch(
      `https://oauth.performgroup.com/oauth/token/${OUTLET_KEY}?_fmt=json&_rt=b`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${hashToken}`,
          Timestamp: `${currentTimeInMillis}`,
        },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          scope: "b2b-feeds-auth",
        }),
      }
    );

    const data = await response.json();
    console.log("Token response:", data);
    return data;
  } catch (error) {
    console.error("Error generating token:", error);
    throw error;
  }
}

generateAccessToken();