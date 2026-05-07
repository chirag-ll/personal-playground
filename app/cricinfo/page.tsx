"use client";

import { useEffect, useState } from "react";

const CLIENT_ID = "cE5S4ztbPU0DkDL0kedg3TiyGVXb5uDg7KvPYlRm";
const SDK_URL = "https://unpkg.com/@livelike/engagementsdk@2.59.0/livelike.umd.js";

const widgets = [
  `<livelike-text-poll widgetid="9a1323ff-317d-4ce9-a2be-0d546ba86cba"></livelike-text-poll>`,
    `<livelike-text-ask widgetid=\"99bc7f8c-79bf-4321-b823-3f1a73596c53\"></livelike-text-ask>`,
];

function buildSrcDoc(widgetTags: string[]) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="${SDK_URL}"><\/script>
        <script>
          window.addEventListener('load', function () {
            LiveLike.init({ clientId: '${CLIENT_ID}' });
          });
        <\/script>
        <style>
          body { margin: 0; padding: 0; background: transparent; }
        </style>
      </head>
      <body>
        ${widgetTags.join("\n        ")}
      </body>
    </html>
  `;
}

export default function LiveLikePage() {
  const [sdkReady, setSdkReady] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = SDK_URL;
    script.async = true;

    script.onload = async () => {
      try {
        await window.LiveLike.init({ clientId: CLIENT_ID });
        setSdkReady(true);
      } catch (err) {
        console.error("LiveLike init failed:", err);
        setInitError("Failed to initialize LiveLike SDK.");
      }
    };

    script.onerror = () => {
      setInitError("Failed to load LiveLike script.");
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <main className="livelike-page">
      <div className="widget-container">
        {initError && (
          <p className="error-message">{initError}</p>
        )}

        {!sdkReady && !initError && (
          <p className="loading-message">Loading widget…</p>
        )}

        {sdkReady && (
          <iframe
            title="LiveLike Widgets"
            srcDoc={buildSrcDoc(widgets)}
            style={{
              border: "none",
              width: "100%",
              minHeight: "400px",
            }}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />

        )}
      </div>

      <style jsx>{`
        .livelike-page {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          min-height: 100vh;
          padding: 2rem;
          background: #f5f5f5;
        }

        .widget-container {
          width: 100%;
          max-width: 640px;
          background: #fff;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
        }

        .loading-message,
        .error-message {
          text-align: center;
          font-family: sans-serif;
          font-size: 0.95rem;
          padding: 2rem 0;
        }

        .error-message {
          color: #c0392b;
        }

        .loading-message {
          color: #888;
        }
      `}</style>
    </main>
  );
}