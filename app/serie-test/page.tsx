"use client";

import React, { useEffect, useState } from "react";
import "./test.css";

export default function SerieTestPage() {
  const [ready, setReady] = useState(false);
  const [matches, setMatches] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let cancelled = false;

    (async () => {
      try {
        // dynamically load the custom-widgets package in the browser only
        const LL = await import("@livelike/custom-widgets");
        if (cancelled) return;
        if (LL?.LiveLikeInit) {
          LL.LiveLikeInit({ clientId: "GVcM4jWPxvTrLkfcopwOV6REuVTf9B12OtP6clv3" });
          setReady(true);
        }

        // Load the test component (defines customElements) only in browser
        try {
          await import('./test.tsx');
        } catch (e) {
          // ignore failures to load the test helper
          console.warn('Could not load test.tsx:', e);
        }
      } catch (err) {
        console.error("LiveLike init failed", err);
        // do not block match fetch on this
      }

      // Fetch match data after attempting to initialize (can run regardless)
      try {
        const url =
          "https://seriea-api-livelike.prd.sdp.deltatre.digital/v1/serie-a/football/seasons/serie-a::Football_Season::5f0e080fc3a44073984b75b3a8e06a8a/matches";
        const res = await fetch(url, { method: "GET" });
        if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
        const data = await res.json();
        if (cancelled) return;
        setMatches(data);
      } catch (err: any) {
        console.error("Failed to fetch matches", err);
        if (!cancelled) setError(err?.message ?? String(err));
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="container">
      <h2>Serie A — Widgets</h2>

      {!ready && <p>LiveLike not initialized yet.</p>}

      <div style={{ marginTop: 12 }}>
        <h3>Matches</h3>
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
        {!matches && !error && <p>Loading matches…</p>}
        {matches && Array.isArray(matches.matches) && (
          <ul>
            {matches.matches.slice(0, 10).map((m: any) => (
              <li key={m.id ?? `${m.home}-${m.away}`}>
                {m.date_time_display ?? m.kickoff_time} — {m.home_name ?? m.home?.name} vs {m.away_name ?? m.away?.name}
              </li>
            ))}
          </ul>
        )}

        {matches && !Array.isArray(matches.matches) && (
          <pre style={{ maxHeight: 360, overflow: "auto", background: "#f7f7f7", padding: 12 }}>
            {JSON.stringify(matches, null, 2)}
          </pre>
        )}
      </div>

      <div style={{ marginTop: 18 }}>
        <h3>LiveLike widgets (render when initialized)</h3>
        {ready ? (
          <>
            {React.createElement("image-poll", { widgetid: "7a290610-66b5-445b-91f9-4099c9a2f0ba", kind: "image-poll" })}
            {React.createElement("cheer-meter", { widgetid: "d9856080-46e5-4bc2-a762-3f44754e9827", kind: "cheer-meter" })}
          </>
        ) : (
          <p>Widgets will mount after initialization.</p>
        )}
      </div>
    </div>
  );
}


