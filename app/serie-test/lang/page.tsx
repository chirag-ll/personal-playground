'use client';

import { useEffect } from 'react';
import '@livelike/custom-widgets/dist/livelike.css';
import { useState } from 'react';

export default function CustomWidgetsPage() {

  const [loadSlider, setLoadSlider] = useState(false);

  const loadLiveLikeSdk = async () => {
    const LiveLike = await import('@livelike/custom-widgets');
    await LiveLike.LiveLikeInit({ clientId: '2kjHYGQp5CEgOj1Eul6IQ2rMMeMoSNdN577LlEJu', lang: 'ar' });
    setLoadSlider(true);
  }

  useEffect(() => {
    loadLiveLikeSdk().then(() => {
      setLoadSlider(true);
    });
  }, []);

  return (
    loadSlider ?
      <div>
        <livelike-text-poll widgetid="6a9bcba1-d57c-4529-9f5a-0dfee3274659"></livelike-text-poll>
      </div>
      : <p>Loading...</p>
  );
}