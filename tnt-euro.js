const fs = require('fs');
const path = require('path');

// Get input and output file paths from command line arguments
const inputFile = process.argv[2] || 'input.json';
const outputFile = process.argv[3] || 'output.json';

try {
  // Read the input JSON file
  const rawData = fs.readFileSync(inputFile, 'utf8');
  const data = JSON.parse(rawData);

  // Transform the array into an object mapping inArenaId -> gnId
  const transformed = data.reduce((acc, item) => {
    acc[item.inArenaId] = item.gnId;
    return acc;
  }, {});

  // Write the output JSON file
  fs.writeFileSync(outputFile, JSON.stringify(transformed, null, 2), 'utf8');

  console.log(`✓ Transformed ${data.length} entries`);
  console.log(`✓ Output written to: ${path.resolve(outputFile)}`);
} catch (err) {
  if (err.code === 'ENOENT') {
    console.error(`Error: Input file "${inputFile}" not found`);
  } else if (err instanceof SyntaxError) {
    console.error(`Error: Invalid JSON in "${inputFile}"`);
  } else {
    console.error(`Error: ${err.message}`);
  }
  process.exit(1);
}