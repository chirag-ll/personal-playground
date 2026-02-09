'use client';

import '@livelike/engagementsdk';
import './custom-widgets';
import { useEffect, useState } from 'react';

export default function Page() {

    let [sdkLoaded, setSdkLoaded] = useState(false);

    useEffect(() => {
        const ll = LiveLike.init({ clientId: 'murJlrT422d2Qpa2jcPK32er1WObqdmXggyVI5tg' });
        LiveLike.setLanguage('ar');
        setSdkLoaded(true);
    }, []);

  return (
    <div>
      <h1>LiveLike Timeline</h1>
      {sdkLoaded && (
        <>
          <custom-widgets
            programId="817a11ef-210b-4d6e-b840-0477cc7994ae"
            mode="interactive-timeline"
          ></custom-widgets>
        </>
      )}
    </div>
  );
}
