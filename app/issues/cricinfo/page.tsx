'use client';

import { useEffect, useRef, useState } from 'react';

export default function MyComponent() {
    const [sdk, setSdk] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        let cancelled = false;

        const loadSDK = async () => {
            try {
                const mod = await import('@livelike/engagementsdk');
                const LiveLike = mod.default ?? mod;

                await LiveLike.init({ clientId: 'cE5S4ztbPU0DkDL0kedg3TiyGVXb5uDg7KvPYlRm' });

                if (!cancelled) setSdk(LiveLike);
            } catch (err) {
                console.error('SDK load failed:', err);
                if (!cancelled) setError('Failed to initialize SDK.');
            }
        };

        loadSDK();
        return () => { cancelled = true; };
    }, []);

    useEffect(() => {
        if (!sdk) return;
        const container = containerRef.current;
        if (!container) return;

        let cancelled = false;

        const renderWidget = async () => {
            try {
                const widgetPayload = await sdk.getWidget({
                    kind: 'text-poll',
                    id: '38d9d43f-3d6a-4114-86fa-e83f2f62c700',
                });
                if (cancelled) return;

                await customElements.whenDefined('livelike-widgets');
                if (cancelled) return;

                const widgetElement = document.createElement('livelike-widgets');
                widgetElement.setAttribute('mode', 'timeline');
                container.appendChild(widgetElement);
                await (widgetElement as any).showWidget({widgetPayload});
            } catch (err) {
                console.error('LiveLike widget render failed:', err);
                if (!cancelled) setError('Failed to load widget.');
            }
        };

        renderWidget();

        return () => {
            cancelled = true;
            container.innerHTML = '';
        };
    }, [sdk]);

    if (error) return <div>{error}</div>;
    if (!sdk) return <div>Loading…</div>;

    return <div ref={containerRef} className="ds-w-full" />;
}