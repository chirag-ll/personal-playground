const finals_id = [20902, 20892, 20889, 20895, 20897, 20903, 20893, 20901, 20890, 20899, 20905, 20912, 20910, 20913, 20908, 20894, 20900, 20891, 20898, 20904, 20911, 20909, 20906, 20888, 20896, 20907];
const baseUrl = "https://wa-stats-api.worldathletics.org/web/v5/predictions-for-startlist";

async function fetchFinal(finalId) {
  const url = new URL(baseUrl);
  url.searchParams.set("finalId", String(finalId));
  url.searchParams.set("preResults", "false");

  const response = await fetch(url.toString(), {
    headers: {
      Accept: "application/json",
      "User-Agent": "node-fetch-script/1.0",
      Authorization: "Basic bGl2ZWxpa2U6NmJmODVmZjY1OTMxODlmNTgwYTFjYjQ1OWUwMjUxMzI4MzRhN2NkNTljYzZjMDY0MGIyNmIyYjZiOGQ2NDViNQ=="
    }
  });

  if (!response.ok) {
    throw new Error(`Request failed for finalId=${finalId}: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

async function main() {
  for (const finalId of finals_id) {
    try {
      const data = await fetchFinal(finalId);
      const disciplineName = data?.discipline?.name ?? data?.disciplineName ?? data?.event?.name ?? data?.discipline ?? "unknown";
      const athletesLength = Array.isArray(data?.athletes)
        ? data.athletes.length
        : Array.isArray(data?.startlist)
        ? data.startlist.length
        : data?.athletes?.length ?? null;
      const sex = data?.sex ?? data?.gender ?? data?.competition?.sex ?? data?.event?.sex ?? "unknown";

      console.log(`finalId = ${finalId}, discipline = ${sex} - ${disciplineName},  athletes = ${athletesLength}`);
    } catch (error) {
      console.error(`Error fetching finalId=${finalId}:`, error);
    }
  }
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
