const fs = require("fs");
const path = require("path");
const FormData = require("form-data");
const axios = require("axios");

const BASE_URL = "https://cf-blast.livelikecdn.com/api/v1";
// const CLIENT_ID = "cE5S4ztbPU0DkDL0kedg3TiyGVXb5uDg7KvPYlRm"; // Chirag Demo
// const TOKEN = "1634Pd5G5Zmj0AYjyAHhLfmrKRTCDRrabeB-uj_9WSB_GnZ_ZdbOZw";

const CLIENT_ID = "UxJPBpYzeFBXwzAyA7LcKtLX5CxucXFqbgxp8jMs"; //TOD Production
const TOKEN = "zLtITkyfJQQZje8CteZfq_QCmtJrp8TMoMj6gs9b0BdnzB5On0t6Mg"; //TOD Production

const IMAGES_DIR = "/Users/chirag/Desktop/test-personal/scripts/upload-media-library/Players-H2H";
const OUTPUT_DIR = "/Users/chirag/Desktop/test-personal/scripts";

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 2000;

const SUPPORTED_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg"]);

const MIME_MAP = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getImageFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const imageFiles = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      imageFiles.push(...getImageFiles(fullPath));
    } else if (entry.isFile() && SUPPORTED_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      imageFiles.push(fullPath);
    }
  }

  return imageFiles;
}

async function uploadFile(filePath, attempt = 1) {
    console.log("uploading file 1");
  const filename = path.basename(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_MAP[ext] || "application/octet-stream";
  const description = `${path.basename(path.dirname(filePath))} - ${path.basename(filePath, ext)}`;
  

  const fileBytes = fs.readFileSync(filePath);

  const form = new FormData();
  form.append("file", fileBytes, { filename, contentType });
  form.append("client_id", CLIENT_ID);
  form.append("description", description);
  console.log("filename", filename);

  const requestLog = {
    url: `${BASE_URL}/media/`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      ...form.getHeaders(),
    },
    body: { filename, contentType, client_id: CLIENT_ID, description },
  };

  console.log(`\n[${filename}] Attempt ${attempt}/${MAX_RETRIES} — uploading (${(fileBytes.length / 1024).toFixed(1)} KB)`);
  console.log(`  → POST ${requestLog.url}`);

  let responseLog;
  try {
    const response = await axios.post(`${BASE_URL}/media/`, form, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        ...form.getHeaders(),
      },
      timeout: 60000,
    });

    responseLog = { status: response.status, data: response.data };
    console.log(`  ← ${response.status} OK | id: ${response.data.id} | url: ${response.data.url || response.data.file}`);

    return { success: true, file: filename, request: requestLog, response: responseLog };
  } catch (err) {
    responseLog = {
      status: err.response?.status ?? null,
      data: err.response?.data ?? err.message,
    };

    console.log(`  ← ${responseLog.status ?? "ERR"} FAILED: ${JSON.stringify(responseLog.data)}`);

    const isRetryable =
      !err.response || err.response.status >= 500 || err.code === "ECONNRESET" || err.code === "ETIMEDOUT";

    if (isRetryable && attempt < MAX_RETRIES) {
      console.log(`  ↻ Retrying in ${RETRY_DELAY_MS / 1000}s...`);
      await sleep(RETRY_DELAY_MS);
      return uploadFile(filePath, attempt + 1);
    }

    return { success: false, file: filename, request: requestLog, response: responseLog };
  }
}

async function main() {
  const files = getImageFiles(IMAGES_DIR);

  if (!files.length) {
    console.log("No image files found in", IMAGES_DIR);
    return;
  }

  console.log(`Found ${files.length} image(s) in ${IMAGES_DIR}`);
  console.log("=".repeat(60));

  const successes = [];
  const failures = [];

  for (let i = 0; i < files.length; i++) {
    console.log(`\n[${i + 1}/${files.length}]`);
    const result = await uploadFile(files[i]);
    if (result.success) {
      successes.push(result);
    } else {
      failures.push(result);
    }
  }

  console.log("\n" + "=".repeat(60));
  console.log(`Done. ${successes.length} succeeded, ${failures.length} failed.`);

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

  const successPath = path.join(OUTPUT_DIR, `upload-success-${timestamp}.json`);
  const failurePath = path.join(OUTPUT_DIR, `upload-failures-${timestamp}.json`);

  fs.writeFileSync(successPath, JSON.stringify(successes, null, 2));
  fs.writeFileSync(failurePath, JSON.stringify(failures, null, 2));

  console.log(`\nSuccess log  → ${successPath}`);
  console.log(`Failure log  → ${failurePath}`);

  if (failures.length) {
    console.log("\nFailed files:");
    failures.forEach((f) => console.log(`  ✗ ${f.file} (${f.response.status})`));
  }
}

main();
