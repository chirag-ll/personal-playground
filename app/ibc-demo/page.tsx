'use client';

import '@livelike/custom-widgets/dist/livelike.css';
import React, { useEffect, useMemo, useState } from 'react';

const CLIENT_ID = 'cE5S4ztbPU0DkDL0kedg3TiyGVXb5uDg7KvPYlRm';

type WidgetKind = 'text-poll' | 'image-poll' | 'text-prediction' | 'image-prediction' | 'text-quiz' | 'image-quiz';

type WidgetSpec = {
  kind: WidgetKind;
  title: string;
  widgetId: string;
};

export default function IbcDemoPage() {
  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const LiveLike = await import('@livelike/custom-widgets');
        if (cancelled) return;

        await LiveLike.LiveLikeInit({ clientId: CLIENT_ID });

        if (!cancelled) {
          setSdkReady(true);
        }
      } catch (error) {
        console.error('Unable to initialize LiveLike SDK', error);
        if (!cancelled) {
          setSdkReady(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const widgets = useMemo<WidgetSpec[]>(() => [
    {
      kind: 'text-poll',
      title: 'Text Poll',
      widgetId: '2a56fd02-806a-4e86-a2eb-1871eda7db93',
    },
    {
      kind: 'image-poll',
      title: 'Image Poll',
      widgetId: '2b5816c4-b6dd-41b6-9eb1-eec931edf321',
    },
    {
      kind: 'text-prediction',
      title: 'Text Prediction',
      widgetId: '9a7b0d60-2059-4d60-9d17-0e468181cbf9',
    },
    {
      kind: 'image-prediction',
      title: 'Image Prediction',
      widgetId: 'abfe77b4-062b-4049-a44c-490bc85f21e6',
    },
    {
      kind: 'text-quiz',
      title: 'Text Quiz',
      widgetId: 'b441bb4f-214a-455c-99ba-f23ec60bb285',
    },
    {
      kind: 'image-quiz',
      title: 'Image Quiz',
      widgetId: '33f261db-0654-48f6-a8d5-318d1c9804bb',
    },
  ], []);

  const renderWidget = (widget: WidgetSpec) => {
    const props = { key: widget.widgetId, widgetid: widget.widgetId };

    switch (widget.kind) {
      case 'image-poll':
        return React.createElement('image-poll', props);
      case 'text-prediction':
        return React.createElement('text-prediction', props);
      case 'image-prediction':
        return React.createElement('image-prediction', props);
      case 'text-quiz':
        return React.createElement('text-quiz', props);
      case 'image-quiz':
        return React.createElement('image-quiz', props);
      case 'text-poll':
      default:
        return React.createElement('text-poll', props);
    }
  };

  return (
    <div style={styles.pageShell}>
      <section style={styles.bundesligaFrame}>
        <header style={styles.topBar}>
          <div style={styles.brandWrap}>
            <span style={styles.logoMark}>B</span>
            <div>
              <div style={styles.brandLabel}>BUNDESLIGA</div>
              <div style={styles.brandSub}>Engagement Hub</div>
            </div>
          </div>
          <div style={styles.livePill}>{sdkReady ? 'SDK Online' : 'SDK Loading'}</div>
        </header>

        <section style={styles.hero}>
          <div>
            <div style={styles.eyebrow}>Matchday 12</div>
            <h1 style={styles.heroTitle}>Fan Zone</h1>
            <p style={styles.heroText}>Vote, predict and compete with the latest Bundesliga matchday engagement widgets.</p>
          </div>
          <div style={styles.matchCard}>
            <div style={styles.matchTop}>
              <span style={styles.teamName}>Bayern</span>
              <span style={styles.score}>2 : 1</span>
              <span style={styles.teamName}>Leverkusen</span>
            </div>
            <div style={styles.matchMeta}>FT • Allianz Arena</div>
          </div>
        </section>

        <section style={styles.widgetsGrid}>
          {!sdkReady ? (
            <div style={styles.loadingGrid}>Loading LiveLike widgets...</div>
          ) : (
            widgets.map((widget) => (
              <article key={widget.widgetId} style={styles.widgetCard}>
                <div style={styles.widgetHeader}>
                  <span style={styles.widgetType}>{widget.title}</span>
                  <span style={styles.widgetId}>ID: {widget.widgetId}</span>
                </div>
                <div style={styles.widgetBody}>{renderWidget(widget)}</div>
              </article>
            ))
          )}
        </section>
      </section>

      <style>{`
        text-poll,
        image-poll,
        text-prediction,
        image-prediction,
        text-quiz,
        image-quiz {
          display: block;
          width: 100%;
          min-height: 230px;
          background: transparent;
          color: #092016;
          font-family: Inter, Arial, sans-serif;
        }

        text-poll > *,
        image-poll > *,
        text-prediction > *,
        image-prediction > *,
        text-quiz > *,
        image-quiz > * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}

const styles = {
  pageShell: {
    minHeight: '100vh',
    padding: 24,
    background: 'linear-gradient(135deg, #07151d 0%, #10251c 55%, #eaddca 100%)',
    fontFamily: 'Inter, Arial, sans-serif',
    color: '#fffdf5',
  } as React.CSSProperties,
  bundesligaFrame: {
    maxWidth: 1500,
    margin: '0 auto',
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.3)',
    borderRadius: 28,
    padding: 24,
    boxShadow: 'inset 0 0 30px rgba(255,255,255,0.12)',
  } as React.CSSProperties,
  topBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  } as React.CSSProperties,
  brandWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  } as React.CSSProperties,
  logoMark: {
    width: 48,
    height: 48,
    display: 'grid',
    placeItems: 'center',
    borderRadius: 999,
    background: '#d9b363',
    color: '#07151d',
    fontWeight: 900,
    fontSize: 26,
  } as React.CSSProperties,
  brandLabel: {
    fontSize: 28,
    lineHeight: 1,
    fontWeight: 900,
    color: '#f8f7f1',
    letterSpacing: '-0.03em',
  } as React.CSSProperties,
  brandSub: {
    marginTop: 8,
    fontSize: 11,
    fontWeight: 700,
    color: '#d9b363',
    letterSpacing: 2,
  } as React.CSSProperties,
  livePill: {
    padding: '8px 14px',
    borderRadius: 999,
    background: '#4fff88',
    color: '#092016',
    fontSize: 12,
    fontWeight: 900,
    border: '1px solid rgba(255,255,255,0.35)',
  } as React.CSSProperties,
  hero: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 34,
    paddingBottom: 24,
    borderBottom: '1px solid rgba(255,255,255,0.2)',
  } as React.CSSProperties,
  eyebrow: {
    fontSize: 12,
    fontWeight: 800,
    textTransform: 'uppercase' as const,
    letterSpacing: 3,
    color: '#d9b363',
  } as React.CSSProperties,
  heroTitle: {
    margin: '10px 0 12px',
    fontSize: 50,
    lineHeight: 0.94,
    fontWeight: 900,
    color: '#fffaf1',
  } as React.CSSProperties,
  heroText: {
    margin: 0,
    maxWidth: 620,
    lineHeight: 1.58,
    color: '#dde9e0',
  } as React.CSSProperties,
  matchCard: {
    minWidth: 300,
    padding: 22,
    borderRadius: 20,
    background: '#1a453a',
    border: '1px solid rgba(255,255,255,0.22)',
  } as React.CSSProperties,
  matchTop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 18,
  } as React.CSSProperties,
  teamName: {
    fontWeight: 900,
    fontSize: 20,
  } as React.CSSProperties,
  score: {
    fontWeight: 900,
    fontSize: 30,
    color: '#d9b363',
  } as React.CSSProperties,
  matchMeta: {
    textAlign: 'center' as const,
    marginTop: 10,
    fontSize: 11,
    fontWeight: 700,
    color: '#ccd8ce',
    letterSpacing: 2,
  } as React.CSSProperties,
  widgetsGrid: {
    marginTop: 24,
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(230px, 1fr))',
    gap: 18,
  } as React.CSSProperties,
  widgetCard: {
    borderRadius: 20,
    overflow: 'hidden',
    background: '#fbfaf5',
    border: '1px solid #d9b363',
    color: '#092016',
    minHeight: 310,
  } as React.CSSProperties,
  widgetHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 14px',
    background: '#0d2b23',
    color: '#fffdf5',
  } as React.CSSProperties,
  widgetType: {
    fontSize: 13,
    fontWeight: 900,
    letterSpacing: 1.2,
    textTransform: 'uppercase' as const,
  } as React.CSSProperties,
  widgetId: {
    fontSize: 10,
    opacity: 0.92,
    fontWeight: 700,
  } as React.CSSProperties,
  widgetBody: {
    padding: 14,
    background: '#ffffff',
    minHeight: 230,
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'stretch',
  } as React.CSSProperties,
  loadingGrid: {
    width: '100%',
    padding: 18,
    borderRadius: 12,
    color: '#e8fff2',
    background: '#10251c',
    border: '1px solid #d9b363',
  } as React.CSSProperties,
};
