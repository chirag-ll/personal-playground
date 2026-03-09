'use client';

import { useEffect } from 'react';
import * as LiveLike from '@livelike/custom-widgets';

import '@livelike/custom-widgets/dist/livelike.css';
import { useState } from 'react';

export default function CustomWidgetsPage() {

  const [loadSlider, setLoadSlider] = useState(false);

  const loadLiveLikeSdk = async () => {
    await LiveLike.LiveLikeInit({ clientId: '1GyP2ySBErUSVPkaaAMBx5OvGBv6d2yu0gc0lG79' });
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
        <cheer-meter
          widgetid='c4163097-a439-421a-a040-42454bac4e16'
          kind="cheer-meter"
        ></cheer-meter>
        <circular-predictor
          widgetid="6377ec85-4bfb-4d79-8b12-048f87ade053"
        ></circular-predictor>
        <emoji-slider
          widgetid="e2c51c4c-a5da-4523-afe8-d8489d78cf50"
          kind="emoji-slider" />
        <text-poll
          widgetid="bc81f45e-b1e3-44af-a4b8-75fff61985ad"
          kind="text-poll"
        />
      </div>
      : <p>Loading...</p>
  );
}