const url = 'https://media-sdp.legaseriea.it/playerImages/ec93b94f74294dc98ab5bcfd67fc0d88/5f0e080fc3a44073984b75b3a8e06a8a/b70390ba4e3c4bc2947a37617d53e8a3/home/7ee9be263d9542faa19317ebdd17e027_left.webp';
const https = require("https");
const fs = require("fs");

function downloadWebp(url, outputPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(outputPath);

    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed: ${res.statusCode}`));
        return;
      }

      console.log(file);
      res.pipe(file);

      file.on("finish", () => {
        file.close();
        resolve(outputPath);
      });
    }).on("error", (err) => {
      fs.unlink(outputPath, () => {});
      reject(err);
    });
  });
}

downloadWebp(url, "salil.webp");
