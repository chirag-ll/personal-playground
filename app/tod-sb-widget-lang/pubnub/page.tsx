'use client';

import { useEffect, useState } from 'react';

export default function Page() {

    let [sdkLoaded, setSdkLoaded] = useState(false);

    useEffect(() => {
        let cancelled = false;

        (async () => {
            await import('@livelike/engagementsdk');
            await import('./custom-widgets');

            if (cancelled) return;
            const ll = window.LiveLike?.init({ clientId: 'murJlrT422d2Qpa2jcPK32er1WObqdmXggyVI5tg' });
            window.LiveLike?.setLanguage('ar');
            setSdkLoaded(true);
        })();

        return () => {
            cancelled = true;
        };
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
