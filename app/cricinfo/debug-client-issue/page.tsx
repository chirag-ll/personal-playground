'use client';

import React, { useEffect, useRef, useState } from 'react';
// @ts-ignore - no type declarations available for this package
import LiveLike from '@livelike/engagementsdk';
// import appConfig from '../../../../../config/appConfig';

interface ICiLiveLikeWidgetProps {
  widgetId: string;
  kind: string;
}

const CiLiveLikeWidget: React.FC<ICiLiveLikeWidgetProps> = () => {
   const { widgetId, kind } = { widgetId: '57600405-8c45-428b-8041-3b34202bbe8b', kind: 'text-prediction' };
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const initSDK = async () => {
      try {
        await LiveLike.init({ clientId: 'cE5S4ztbPU0DkDL0kedg3TiyGVXb5uDg7KvPYlRm' });
        if (isMounted) {
          setIsInitialized(true);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to initialize LiveLike SDK.');
        }
      }
    };

    initSDK();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isInitialized || !containerRef.current) return;

    const container = containerRef.current;

    const renderWidget = async () => {
      try {
        const widgetPayload = await LiveLike.getWidget({ kind: 'text-poll', id: '38d9d43f-3d6a-4114-86fa-e83f2f62c700' });
        const widgetElement = document.createElement('livelike-widgets');
        container.appendChild(widgetElement);
        (widgetElement as any).showWidget(widgetPayload);
      } catch (err) {
        console.error('LiveLike widget render failed:', err);
        setError('Failed to load widget.');
      }
    };

    renderWidget();

    return () => {
      container.innerHTML = '';
    };
  }, [isInitialized, widgetId, kind]);

  if (error) {
    console.log('livelike error', error);
    return null;
  }

  return <div ref={containerRef} className="ds-w-full" />;
};

export default CiLiveLikeWidget;
