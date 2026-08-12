'use client';

import React, { useRef, useState } from 'react';

export default function HtmlSliderPage() {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [hoverValue, setHoverValue] = useState(25000);
  const [isZoomed, setIsZoomed] = useState(false);
  const MAX_VALUE = 50000;
  const MIN_VALUE = 1;

  const clampValue = (value: number) => Math.min(Math.max(value, MIN_VALUE), MAX_VALUE);

  const updateFromPoint = (clientX: number, clientY: number) => {
    const slider = sliderRef.current;

    if (!slider) return;

    const rect = slider.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = clientX - centerX;
    const dy = clientY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const radius = rect.width / 2 - 14;

    if (distance <= radius + 6) {
      const angle = Math.atan2(dy, dx);
      const deg = (Math.round((angle * 180) / Math.PI + 450) % 360);
      const value = Math.round((deg / 360) * (MAX_VALUE - 1)) + 1;

      setHoverValue(value);
    }
  };

  const markerAngle = (hoverValue / MAX_VALUE) * 360;
  const markerAngleRadians = ((markerAngle - 90) * Math.PI) / 180;
  const markerX = 150 + Math.cos(markerAngleRadians) * 118;
  const markerY = 150 + Math.sin(markerAngleRadians) * 118;
  const pointerRotation = markerAngle - 90;

  const adjustValue = (delta: number) => {
    setHoverValue((current) => clampValue(current + delta));
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <span style={styles.title}>Value Slider</span>
          <span style={styles.range}>1 - 50000</span>
        </div>

        <div style={styles.valueRow}>
          <span style={styles.label}>Current value</span>
          <span style={styles.valueText}>{hoverValue}</span>
        </div>

        <div style={styles.sliderArea}>
          <div
            ref={sliderRef}
            className={isZoomed ? 'zoomed-slider' : ''}
            onMouseMove={(event) => updateFromPoint(event.clientX, event.clientY)}
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onClick={() => setIsZoomed(true)}
            style={styles.slider}
          >
            <div style={styles.sliderBase} />
            <div style={styles.ring} />
            <div style={styles.centerDot} />
            <div
              style={Object.assign({}, styles.pointerLine, {
                transform: `rotate(${pointerRotation}deg)`,
              })}
            />
            <div
              style={Object.assign({}, styles.marker, {
                left: markerX,
                top: markerY,
              })}
            />
          </div>
        </div>

        <div style={styles.fineControlWrap}>
          <div style={styles.stepRow}>
            <button type="button" style={styles.stepButton} onClick={() => adjustValue(-1)}>-1</button>
            <button type="button" style={styles.stepButton} onClick={() => adjustValue(1)}>+1</button>
            <button type="button" style={styles.stepButton} onClick={() => adjustValue(-5)}>-5</button>
            <button type="button" style={styles.stepButton} onClick={() => adjustValue(5)}>+5</button>
          </div>

          <input
            type="range"
            min={MIN_VALUE}
            max={MAX_VALUE}
            value={hoverValue}
            onChange={(event) => setHoverValue(clampValue(Number(event.target.value)))}
            style={styles.rangeControl}
            aria-label="Fine adjustment range"
          />
        </div>
      </div>

      <style>{`
        .zoomed-slider {
          transform: scale(1.08);
        }

        .zoomed-slider .slider-base {
          border-color: #3b82f6;
        }
      `}</style>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#eef2f6',
    fontFamily: 'Arial, sans-serif',
    color: '#111827',
  } as React.CSSProperties,
  card: {
    width: 420,
    padding: 28,
    borderRadius: 24,
    background: '#ffffff',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.08)',
    border: '1px solid #dbe4ea',
  } as React.CSSProperties,
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  } as React.CSSProperties,
  title: {
    fontSize: 24,
    fontWeight: 700,
    color: '#111827',
  } as React.CSSProperties,
  range: {
    fontSize: 12,
    fontWeight: 700,
    color: '#64748b',
    letterSpacing: 0.8,
  } as React.CSSProperties,
  fineControlWrap: {
    marginTop: 20,
    display: 'grid',
    gap: 12,
  } as React.CSSProperties,
  stepRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: 8,
  } as React.CSSProperties,
  stepButton: {
    border: '1px solid #cbd5e1',
    background: '#eef6ff',
    color: '#111827',
    borderRadius: 8,
    padding: '8px 12px',
    fontWeight: 700,
    cursor: 'pointer',
  } as React.CSSProperties,
  rangeControl: {
    width: '100%',
    accentColor: '#2563eb',
  } as React.CSSProperties,
  valueRow: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 16,
  } as React.CSSProperties,
  label: {
    fontSize: 13,
    color: '#64748b',
  } as React.CSSProperties,
  valueText: {
    fontSize: 34,
    fontWeight: 800,
    color: '#111827',
    lineHeight: 1,
  } as React.CSSProperties,
  sliderArea: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  } as React.CSSProperties,
  slider: {
    position: 'relative' as const,
    width: 300,
    height: 300,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'transform 180ms ease',
  } as React.CSSProperties,
  sliderBase: {
    width: 300,
    height: 300,
    borderRadius: '50%',
    border: '10px solid #d6dde6',
    background: '#f8fafc',
  } as React.CSSProperties,
  ring: {
    position: 'absolute' as const,
    inset: 12,
    borderRadius: '50%',
    border: '2px solid #94a3b8',
  } as React.CSSProperties,
  centerDot: {
    position: 'absolute' as const,
    width: 10,
    height: 10,
    borderRadius: '50%',
    background: '#1e40af',
  } as React.CSSProperties,
  pointerLine: {
    position: 'absolute' as const,
    width: 128,
    height: 2,
    top: 148,
    left: 150,
    background: '#2563eb',
    transformOrigin: '0 50%',
  } as React.CSSProperties,
  marker: {
    position: 'absolute' as const,
    width: 14,
    height: 14,
    marginLeft: -7,
    marginTop: -7,
    borderRadius: '50%',
    background: '#2563eb',
    border: '2px solid white',
    boxShadow: '0 0 0 2px #bfdbfe, 0 4px 10px rgba(0, 0, 0, 0.2)',
  } as React.CSSProperties,
};
