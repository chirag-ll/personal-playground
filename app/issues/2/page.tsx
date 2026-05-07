'use client';

import { useEffect, useRef, useState } from 'react';
import * as LiveLikeNS from '@livelike/engagementsdk';

const LiveLike: any = (LiveLikeNS as any).default ?? LiveLikeNS;

export default function MyComponent() {
    const [ready, setReady] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const widgetRef = useRef<HTMLElement>(null);

    useEffect(() => {
        let cancelled = false;
        LiveLike.init({ clientId: 'cE5S4ztbPU0DkDL0kedg3TiyGVXb5uDg7KvPYlRm' })
            .then(() => { if (!cancelled) setReady(true); })
            .catch((err: any) => {
                console.error('SDK init failed:', err);
                if (!cancelled) setError('Failed to initialize SDK.');
            });
        return () => { cancelled = true; };
    }, []);

    useEffect(() => {
        if (!ready) return;
        const el = widgetRef.current;
        if (!el) return;

        let cancelled = false;
        (async () => {
            try {
                await customElements.whenDefined('livelike-widgets');
                if (cancelled) return;

                const widgetPayload = await LiveLike.getWidget({
                    kind: 'text-poll',
                    id: '38d9d43f-3d6a-4114-86fa-e83f2f62c700',
                });
                console.log('widgetPayload:', widgetPayload);
                if (cancelled) return;

                await (el as any).showWidget({ widgetPayload });
            } catch (err) {
                console.error('LiveLike widget render failed:', err);
                if (!cancelled) setError('Failed to load widget.');
            }
        })();

        return () => { cancelled = true; };
    }, [ready]);

    if (error) return <div>{error}</div>;

    return (
        <>
            {!ready && <div>Loading…</div>}
            {/* @ts-expect-error custom element */}
            <livelike-widgets ref={widgetRef} mode="timeline" style={{ display: 'block', minHeight: 300 }} />
        </>
    );
}