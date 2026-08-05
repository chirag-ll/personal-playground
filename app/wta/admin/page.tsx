'use client';

import React, { useEffect, useState } from 'react';

type WidgetKind = 'text-poll' | 'image-poll' | 'text-quiz' | 'image-quiz' | 'emoji-slider' | 'cheer-meter' | 'text-ask' | 'text-prediction' | 'image-prediction';

type WidgetEntry = {
  id: string;
  kind: WidgetKind;
  widgetId: string;
};

export default function WtaAdminPage() {
  const [sdkReady, setSdkReady] = useState(false);
  const [kind, setKind] = useState<WidgetKind>('text-poll');
  const [widgetId, setWidgetId] = useState('');
  const [widgets, setWidgets] = useState<WidgetEntry[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const LiveLike = await import('@livelike/widget-elements');
      if (cancelled) return;

      await LiveLike.LiveLikeInit({
        clientId: '9MxRnhmq0Wkv89ESZciLBNY8ttjKce3VkSj8Te4G',
      });

      if (!cancelled) {
        setSdkReady(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!widgetId.trim()) return;

    setIsSubmitting(true);

    window.setTimeout(() => {
      setWidgets((current) => [
        ...current,
        {
          id: `${kind}-${widgetId}-${Date.now()}`,
          kind,
          widgetId: widgetId.trim(),
        },
      ]);
      setIsSubmitting(false);
    }, 250);
  };

  const renderWidget = (widget: WidgetEntry) => {
    const props = { key: widget.id, widgetid: widget.widgetId };

    switch (widget.kind) {
      case 'image-poll':
        return React.createElement('image-poll', props);
      case 'text-quiz':
        return React.createElement('text-quiz', props);
      case 'image-quiz':
        return React.createElement('image-quiz', props);
      case 'emoji-slider':
        return React.createElement('emoji-slider', props);
      case 'cheer-meter':
        return React.createElement('cheer-meter', props);
      case 'text-ask':
        return React.createElement('text-ask', props);
      case 'text-prediction':
        return React.createElement('text-prediction', props);
      case 'image-prediction':
        return React.createElement('image-prediction', props);
      case 'text-poll':
      default:
        return React.createElement('text-poll', props);
    }
  };

  return (
    <div style={{ padding: 24, fontFamily: 'Arial, sans-serif', background: '#f8fafc', minHeight: '100vh', color: '#000000' }}>
      <div style={{ maxWidth: 460, margin: '0 auto' }}>
        <h1 style={{ marginBottom: 20 }}>WTA Admin</h1>

        {!sdkReady ? (
          <p>Loading widget SDK...</p>
        ) : (
          <>
            <form
              onSubmit={handleSubmit}
              style={{
                display: 'grid',
                gap: 16,
                padding: 20,
                borderRadius: 12,
                background: '#ffffff',
                boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)',
                color: '#000000',
              }}
            >
              <label style={{ display: 'grid', gap: 8 }}>
                <div style={{ fontWeight: 700 }}>Widget type</div>
                <select
                  value={kind}
                  onChange={(e) => setKind(e.target.value as WidgetKind)}
                  style={{
                    padding: '10px 12px',
                    borderRadius: 8,
                    border: '1px solid #cbd5e1',
                    fontSize: 14,
                    background: '#fff',
                    color: '#000000',
                  }}
                >
                  <option value="text-poll">text-poll</option>
                  <option value="image-poll">image-poll</option>
                  <option value="text-quiz">text-quiz</option>
                  <option value="image-quiz">image-quiz</option>
                  <option value="emoji-slider">emoji-slider</option>
                  <option value="cheer-meter">cheer-meter</option>
                  <option value="text-ask">text-ask</option>
                  <option value="text-prediction">text-prediction</option>
                  <option value="image-prediction">image-prediction</option>
                </select>
              </label>

              <label style={{ display: 'grid', gap: 8 }}>
                <div style={{ fontWeight: 700 }}>Widget ID</div>
                <input
                  type="text"
                  value={widgetId}
                  onChange={(e) => setWidgetId(e.target.value)}
                  placeholder="Enter widget id"
                  style={{
                    padding: '10px 12px',
                    borderRadius: 8,
                    border: '1px solid #cbd5e1',
                    fontSize: 14,
                    outline: 'none',
                    color: '#000000',
                  }}
                />
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  padding: '12px 16px',
                  borderRadius: 8,
                  border: 'none',
                  background: isSubmitting ? '#94a3b8' : '#2563eb',
                  color: '#fff',
                  fontWeight: 700,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                }}
              >
                {isSubmitting ? 'Adding widget...' : 'Submit'}
              </button>
            </form>

            <div style={{ marginTop: 24, display: 'grid', gap: 12 }}>
              {widgets.map((widget) => (
                <div key={`meta-${widget.id}`} style={{ display: 'grid', gap: 8 }}>
                  <div
                    style={{
                      border: '1px solid #d1d5db',
                      borderRadius: 6,
                      padding: '8px 10px',
                      fontSize: 13,
                      color: '#000000',
                    }}
                  >
                    Type: <strong>{widget.kind}</strong> &nbsp;|&nbsp; ID: <strong>{widget.widgetId}</strong>
                  </div>
                  {renderWidget(widget)}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
