'use client';

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import React from "react";


export default function CustomWidgetsPage() {
    const [loadSlider, setLoadSlider] = useState(false);
    const widgetsRef = useRef<HTMLDivElement>(null);


    const LivelikeScriptLoaded = () => {
        let ll = window.LiveLike.init({ clientId: 'cE5S4ztbPU0DkDL0kedg3TiyGVXb5uDg7KvPYlRm' });
        setLoadSlider(true);

    }

    useEffect(() => {
        const widgetsNode = widgetsRef.current;
        if (!widgetsNode) return;

        const handler = (ev: any) => {
            console.log('Widget Interacted', { widgetId: ev.detail.vote.option_id });
        };

        ['vote', 'answer', 'cheer'].forEach((eventName) => {
            widgetsNode.addEventListener(eventName, handler);
        });

        return () => {
            ['vote', 'answer', 'cheer'].forEach((eventName) => {
                widgetsNode.removeEventListener(eventName, handler);
            });
        };
    }, [loadSlider]);

    return (
        <>
            <Script src="https://unpkg.com/@livelike/engagementsdk@2.59.0/livelike.umd.js" onLoad={LivelikeScriptLoaded}>
            </Script>
            {
                loadSlider ?
                    <div ref={widgetsRef}>

                        <livelike-text-poll
                            widgetid="e638450d-dc0a-4d7e-bc64-69ecc0f6535d"
                            kind="text-poll"
                        />
                    </div>
                    : <p>Loading...</p>}
        </>)
}