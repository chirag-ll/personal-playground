'use client';

import * as LiveLike from "@livelike/widget-elements";
import { useEffect, useState } from "react";

export default function WtaPage() {

  const [loadSlider, setLoadSlider] = useState(false);

  const loadLiveLikeSdk = async () => {
    await LiveLike.LiveLikeInit({ clientId: '9MxRnhmq0Wkv89ESZciLBNY8ttjKce3VkSj8Te4G' });
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
       <text-poll widgetid="e09cfc59-6ddf-4b4e-963d-2d533c23be3c"></text-poll>
       <text-poll widgetid="523155d6-77d4-4623-b7ac-394d8e98d27a"> </text-poll>
       <text-poll widgetid="cdc2e8c7-5a48-4735-b7ea-6c2fbbf6f81d"> </text-poll>
       <image-prediction widgetid="7207a017-94d0-46fb-a3f6-deda17263d93"></image-prediction>
       <image-prediction widgetid="1de40c49-c9c1-4e1f-a2b0-67007a8054d6"></image-prediction>
      </div>
      : <p>Loading...</p>
  );
}