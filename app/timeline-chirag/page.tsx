'use client';
/// <reference types="../global" />

import Script from "next/script";
import { useEffect, useState, useRef } from "react";
import React from "react";

export default function Page() {
    const [widget, setWidget] = useState(false);
    const widgetsRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!widget || !widgetsRef.current) return;

        const widgetsNode = widgetsRef.current;

        const onDismiss = (ev: Event) => {
            console.log('Widget Dismissed', { widgetId: (ev as CustomEvent).detail.widget.id });
        };

        const onInteract = (ev: Event) => {
            console.log('Widget Interacted', { widgetId: (ev as CustomEvent).detail.widget.id });
        };

        widgetsNode.addEventListener('dismiss', onDismiss);
        ['vote', 'answer', 'cheer'].forEach(name => widgetsNode.addEventListener(name, onInteract));

        return () => {
            widgetsNode.removeEventListener('dismiss', onDismiss);
            ['vote', 'answer', 'cheer'].forEach(name => widgetsNode.removeEventListener(name, onInteract));
        };
    }, [widget]);

    const LivelikeScriptLoaded = () => {
        window.LiveLike.init({ clientId: 'cE5S4ztbPU0DkDL0kedg3TiyGVXb5uDg7KvPYlRm' });
        window.LiveLike.setLanguage('aa');
        setWidget(true);
    };

    return (
        <>
            <Script
                src="https://unpkg.com/@livelike/engagementsdk@2.59.0/livelike.umd.js"
                onLoad={LivelikeScriptLoaded}
            />
            {widget
                ? React.createElement('livelike-widgets', {
                    ref: widgetsRef,
                    programid: "95bd6abc-f738-4db5-af18-5d32c7dc69ee",
                    mode: "timeline"
                  })
                : <p>SDK not loaded</p>
            }
        </>
    );
}
