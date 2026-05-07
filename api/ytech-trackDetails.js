const crypto = require("crypto");

// Configuration
const CONFIG = {
  serverAddress:
    "https://asterix.y-tech.it/gamification.y-games.it/webroot/",
  apiKey: "mofJwn4vPvKi6zWkcqWd",
  secretKey: "9sDI1QtLSRwY7Cv9WnepMGsRlRjucPpVFIpGawFRNHzKdPiXaR",
  systemSource: "y-tech",
  contextSource: "y-tech",
  appSource: "app",
};

// Generate secure hash: sha256(timestamp + uid + action + secret_key)
function generateSecureHash(timestamp, uid, action, secretKey) {
  const rawString = `${timestamp}${uid}${action}${secretKey}`;
  return crypto.createHash("sha256").update(rawString).digest("hex");
}

async function trackAction() {
  const timestamp = Math.floor(Date.now() / 1000); // Unix timestamp GMT
  const uid = "1234567890";
  const action = "game-played";

  const secure = generateSecureHash(timestamp, uid, action, CONFIG.secretKey);

  const payload = {
    system_source: CONFIG.systemSource,
    context_source: CONFIG.contextSource,
    app_source: CONFIG.appSource,
    api_key: CONFIG.apiKey,
    uid: uid,
    device_id: "abc-defg-hijkl-mno",
    timestamp: timestamp,
    secure: secure,
    service_name: "mini-games",
    action: action,
    timestamp_action: timestamp,
    info_details: {
      EventId: "1",
      EventName: "Trivia",
      EventDate: "04/01/2026",
      ContactEmail: "chiraggarg0210@gmail.com",
    },
    action_points: null,
  };
  console.log(`${CONFIG.serverAddress}?dispatch=trackDetails`);
  console.log(payload)

  try {
    const response = await fetch(
      `${CONFIG.serverAddress}?dispatch=trackDetails`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();
    console.log("Response:", data);
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

trackAction();