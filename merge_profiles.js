const fs = require('fs');
const csv = require('csv-parser');
const fastCsv = require('fast-csv');

const output = fs.createWriteStream('merged_clean_profiles.csv');
const writer = fastCsv.format({ headers: true });

writer.pipe(output);

const uuidFrom85k = new Set();

// Function to detect corrupted rows
function hasCorruptedChar(row) {
    return Object.values(row).some(value =>
        typeof value === 'string' && value.includes('�')
    );
}

// STEP 1: Process 85k file
function process85k() {
    return new Promise((resolve) => {
        fs.createReadStream('/Users/chirag/Downloads/bq-results-20260223-092350-1771838649438_updated.csv')
            .pipe(csv())
            .on('data', (row) => {

                if (hasCorruptedChar(row)) return; // skip corrupted row

                const uuid = row.livelike_user_profile_uuid;
                if (!uuid) return;

                uuidFrom85k.add(uuid);

                writer.write({
                    application_id: row.application_id || '',
                    livelike_user_profile_uuid: uuid,
                    profile_createdat: row.profile_createdat || '',
                    nickname: row.nickname,
                    custom_id: row.custom_id || '',
                    first_name: row.first_name || '',
                    last_name: row.last_name || '',
                    nickname_final: row.nickname_final || '',
                });
            })
            .on('end', resolve);
    });
}

// STEP 2: Process 165k file
function process165k() {
    return new Promise((resolve) => {
        fs.createReadStream('/Users/chirag/Downloads/Chelsea- profile with Auto-generated nicknames.csv')
            .pipe(csv())
            .on('data', (row) => {

                if (hasCorruptedChar(row)) return; // skip corrupted row

                const uuid = row['Blast Applicationprofile__uuid'];
                if (!uuid) return;

                // include only if NOT already in 85k
                if (uuidFrom85k.has(uuid)) return;

                writer.write({
                    application_id: '',
                    livelike_user_profile_uuid: uuid,
                    profile_createdat: row['Blast Applicationprofile__created_at'] || '',
                    nickname: row['Blast Applicationprofile__nickname'] || '',
                    custom_id: row['Blast Applicationprofile__custom_id'] || '',
                    first_name: '',
                    last_name: '',
                    nickname_final: '',
                });
            })
            .on('end', resolve);
    });
}

async function merge() {
    await process85k();
    await process165k();

    writer.end();
    console.log('Merged file created successfully (corrupted rows skipped)');
}

merge();
