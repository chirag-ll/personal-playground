const widgetUrl = "https://cf-blast.livelikecdn.com/api/v1/programs/15aa8ff5-3ff4-410a-8ff9-8dedec64f466/widgets/";

const queryParams = {
  widget_attribute: "key:value"
};

const PORT = process.env.PORT || 3000;

function buildWidgetUrl(matchId) {
  const url = new URL(widgetUrl);
  const params = new URLSearchParams(queryParams);
  params.set("widget_attribute", String(`opta_match_id:${matchId}`));
  url.search = params.toString();

  return url.toString();
}

async function fetchWidgetData(matchId) {
  const url = buildWidgetUrl(matchId);
  const response = await fetch(url, {
    headers: {
      Accept: "application/json"
    }
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Request failed ${response.status} ${response.statusText}: ${text}`);
  }

  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return response.json();
  }
  return response.text();
}

function getBestPlayerEntry(data) {
  if (!Array.isArray(data?.results) || data.results.length === 0) {
    return null;
  }

  const result = data.results[0];
  if (!Array.isArray(result?.options) || result.options.length === 0) {
    return null;
  }

  let topIndex = -1;
  let topCount = Number.NEGATIVE_INFINITY;

  result.options.forEach((option, index) => {
    const voteCount = Number(option?.vote_count ?? Number.NEGATIVE_INFINITY);
    if (voteCount > topCount) {
      topCount = voteCount;
      topIndex = index;
    }
  });

  if (topIndex === -1) {
    return null;
  }

  const bestPlayerKey = `player_${topIndex}_opta_id`;

  // gather widget attributes from top-level or inside the result
  const widgetAttributes = Array.isArray(data?.widget_attributes)
    ? data.widget_attributes
    : Array.isArray(result?.widget_attributes)
    ? result.widget_attributes
    : [];

  const option = result.options[topIndex] || {};

  // try to resolve the player's canonical label from option fields
  const optionLabel = option?.description;

  // Prefer attribute with key `OptaId-<label>` which stores the opta id (pxxxxx)
  let bestPlayerOptaId = null;
  let bestPlayerUuid = null;

  if (optionLabel) {
    const optaKey = `OptaId-${optionLabel}`;
    const byOpta = widgetAttributes.find((a) => a?.key === optaKey);
    if (byOpta?.value) {
      bestPlayerOptaId = byOpta.value;
    }

    const byName = widgetAttributes.find((a) => a?.key === optionLabel);
    if (byName?.value) {
      bestPlayerUuid = byName.value;
    }
  }

  // as a fallback, try to find an attribute whose key includes the player key pattern
  if (!bestPlayerOptaId && widgetAttributes.length) {
    const found = widgetAttributes.find((a) => a?.key && a.key.startsWith("OptaId-"));
    if (found?.value) bestPlayerOptaId = found.value;
  }

  return {
    optionLabel: optionLabel ?? null,
    playerOptaId: bestPlayerOptaId,
    playerUuid: bestPlayerUuid,
    voteCount: topCount,
  };
}

function sendJson(res, status, body) {
  const payload = typeof body === "string" ? { data: body } : body;
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8"
  });
  res.end(JSON.stringify(payload));
}

async function handleRequest(req, res) {
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);

  if (requestUrl.pathname !== "/api/match") {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }

  const matchId = requestUrl.searchParams.get("matchId");
  if (!matchId) {
    sendJson(res, 400, { error: "Missing required query param: matchId" });
    return;
  }

  try {
    const data = await fetchWidgetData(matchId);
    const bestPlayer = getBestPlayerEntry(data);
    sendJson(res, 200, { matchId, widgetUrl: buildWidgetUrl(matchId), data: bestPlayer });
  } catch (error) {
    sendJson(res, 502, { error: error.message });
  }
}

async function startServer() {
  const http = await import("http");
  const server = http.createServer((req, res) => {
    handleRequest(req, res).catch((error) => {
      sendJson(res, 500, { error: error.message });
    });
  });

  server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
    console.log(`Use /api/match?matchId=<id>`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});