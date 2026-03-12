'use client';

import { useEffect } from 'react';
import * as LiveLike from '@livelike/custom-widgets';

import '@livelike/custom-widgets/dist/livelike.css';
import { useState } from 'react';

export default function CustomWidgetsPage() {

  const [loadSlider, setLoadSlider] = useState(false);

  const loadLiveLikeSdk = () => {
    LiveLike.LiveLikeInit({ clientId: '1GyP2ySBErUSVPkaaAMBx5OvGBv6d2yu0gc0lG79' });
    setLoadSlider(true);
  }

  useEffect(() => {
    loadLiveLikeSdk();
  }, []);

  return (
    loadSlider ?
      <div>
        <cheer-meter
          widgetid='c4163097-a439-421a-a040-42454bac4e16'
          kind="cheer-meter"
        ></cheer-meter>
        <emoji-slider
          widgetid="b3308193-b5b2-4a1e-84d2-24d79056ddc5"
          kind="emoji-slider" />
        <text-poll
          widgetid="a627414b-235a-4aa2-b685-868e5f8e4f4f"
          kind="text-poll"
        />
        <circular-predictor
        widgetid="4152c31c-db4e-4005-9db0-898e9ba709e1"
    ></circular-predictor>
      </div>
      : <p>Loading...</p>
  );
}
