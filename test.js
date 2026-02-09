// const matchData ={
//   "competition": {
//     "seasonId": "serie-a::Football_Season::5f0e080fc3a44073984b75b3a8e06a8a",
//     "startDateUtc": null,
//     "endDateUtc": null,
//     "seasonName": "2025/2026",
//     "imagery": {
//       "seasonLogo": "seasonLogos/5f0e080fc3a44073984b75b3a8e06a8a.webp"
//     },
//     "competitionId": "serie-a::Football_Competition::ec93b94f74294dc98ab5bcfd67fc0d88",
//     "providerId": "opta:Competition:1r097lpxe0xn03ihb7wi98kao",
//     "name": "Serie A",
//     "officialName": "Serie A",
//     "shortName": "Serie A",
//     "acronymName": "Serie A"
//   },
//   "matches": [
//     {
//       "providerId": "opta:Match:cj1crau6yj93nnyk80lzjpes4",
//       "seasonId": "serie-a::Football_Season::5f0e080fc3a44073984b75b3a8e06a8a",
//       "editorial": {
//         "broadcasters": {
//           "broadcasterNational1": "DAZN",
//           "broadcasterNational2": "",
//           "broadcasterNational3": "",
//           "broadcasterInternational1": "",
//           "broadcasterInternational2": "",
//           "broadcasterInternational3": ""
//         },
//         "highlightsUrl": "",
//         "highlightsNationalUrl": "",
//         "highlightsInternationalUrl": "",
//         "ticketsUrl": "",
//         "sponsorImage": "",
//         "themeNight": "",
//         "editorials": []
//       },
//       "matchId": "serie-a::Football_Match::56290f4838d04f378d67df40b24a11db",
//       "status": "FINISHED",
//       "providerStatus": "Finished",
//       "phase": "FULL_TIME",
//       "matchDateUtc": "2025-08-23T16:30:00Z",
//       "matchDateLocal": "2025-08-23T18:30:00",
//       "localTimeUtcOffset": "+02:00",
//       "homeScorePush": 0,
//       "awayScorePush": 0,
//       "providerPenaltyScoreHome": null,
//       "providerPenaltyScoreAway": null,
//       "aggregate": "",
//       "winReason": "Draw",
//       "winTeamId": null,
//       "previousLegsResult": null,
//       "home": {
//         "teamId": "serie-a::Football_Team::8c7aa94d22f44738951748e2ccdf319a",
//         "providerId": "opta:Team:4kumqzwifv478caxed8zywlh3",
//         "shortName": "Genoa",
//         "officialName": "Genoa",
//         "acronymName": "GEN",
//         "acronymNameLocalized": "GEN",
//         "isTeamFake": false,
//         "mediaName": "Genoa",
//         "mediaShortName": "Genoa",
//         "countryCode": "IT",
//         "teamType": "prima_squadra",
//         "stadium": null,
//         "imagery": {
//           "stadiumImage": "stadiums/272383aec72f407198da27054db34b12.webp",
//           "teamImage": "teamImages/8c7aa94d22f44738951748e2ccdf319a.webp",
//           "teamLogo": "clubLogos/8c7aa94d22f44738951748e2ccdf319a.webp",
//           "teamLogoLight": "clubLogos/8c7aa94d22f44738951748e2ccdf319a_light.webp"
//         },
//         "allSeasonImagery": []
//       },
//       "away": {
//         "teamId": "serie-a::Football_Team::ced7bf0df3a140dfa48138311122133b",
//         "providerId": "opta:Team:bi1fxjrncd0ram0oi7ja1jyuo",
//         "shortName": "Lecce",
//         "officialName": "Lecce",
//         "acronymName": "LEC",
//         "acronymNameLocalized": "LEC",
//         "isTeamFake": false,
//         "mediaName": "Lecce",
//         "mediaShortName": "Lecce",
//         "countryCode": "IT",
//         "teamType": "prima_squadra",
//         "stadium": null,
//         "imagery": {
//           "stadiumImage": "stadiums/86c3dcdadbc9445ea46f883d53f24a92.webp",
//           "teamImage": "teamImages/ced7bf0df3a140dfa48138311122133b.webp",
//           "teamLogo": "clubLogos/ced7bf0df3a140dfa48138311122133b.webp",
//           "teamLogoLight": "clubLogos/ced7bf0df3a140dfa48138311122133b_light.webp"
//         },
//         "allSeasonImagery": []
//       },
//       "stadiumId": "serie-a::Football_Stadium::272383aec72f407198da27054db34b12",
//       "stadiumName": "Luigi Ferraris",
//       "cityName": "Genova",
//       "group": "serie-a::Football_Group::226abe2d0b234d4699293c3df4cc2927",
//       "groupName": "Campionato",
//       "roundId": "serie-a::Football_Stage::8acd4fe11d114d37a72b1428c32c89e6",
//       "roundName": "Regular Season",
//       "matchSet": {
//         "matchSetId": "serie-a::Football_MatchDay::b1e1578e184c4376bc7197668c64197a",
//         "providerId": "opta:MatchDay:1",
//         "name": "Matchday 1",
//         "seasonId": "serie-a::Football_Season::5f0e080fc3a44073984b75b3a8e06a8a",
//         "competitionId": "serie-a::Football_Competition::ec93b94f74294dc98ab5bcfd67fc0d88",
//         "roundId": null,
//         "stageId": "serie-a::Football_Stage::8acd4fe11d114d37a72b1428c32c89e6",
//         "index": null,
//         "shortName": "Matchday 1",
//         "matchSetFormatId": null,
//         "type": null,
//         "startDateUtc": "2025-08-23T00:00:00Z",
//         "endDateUtc": "2025-08-25T00:00:00Z",
//         "matchdayStatus": "Played"
//       },
//       "scheduleStatus": "UNKNOWN",
//       "providerHomeScore": 0,
//       "providerAwayScore": 0,
//       "groupId": "serie-a::Football_Group::226abe2d0b234d4699293c3df4cc2927",
//       "subLeague": "",
//       "time": "90",
//       "additionalTime": "5"
//     }]
// };

import https from "https";

https.get("https://seriea-api-livelike.prd.sdp.deltatre.digital/v1/serie-a/football/seasons/serie-a::Football_Season::5f0e080fc3a44073984b75b3a8e06a8a/matches", (res) => {
  let data = "";

  res.on("data", (chunk) => {
    data += chunk;
  });

  res.on("end", () => {
    console.log("Response:", data);
    create(JSON.parse(data));
  });
}).on("error", (err) => {
  console.error("Error:", err.message);
});

const create = (matchData) => {
    let final = [];

    for (let match of matchData.matches) {
        if (match.status !== "FINISHED") {
            let obj = {
                homeTeam: match.home.mediaName,
                awayTeam: match.away.mediaName,
                matchDateUtc: match.matchDateUtc,
                stadiumName: match.stadiumName,
                status: match.status,
            };
            final.push(obj);
        }
    }
    const csv = jsonToCsv(final);
    fs.writeFileSync("output.csv", csv);
}


import fs from "fs";

function jsonToCsv(data) {
  if (!Array.isArray(data) || data.length === 0) return "";

  const headers = Object.keys(data[0]).join(",");
  const rows = data.map(obj =>
    Object.values(obj)
      .map(v => `"${String(v).replace(/"/g, '""')}"`)
      .join(",")
  );

  return [headers, ...rows].join("\n");
}

