'use client';
/// <reference types="../global" />

import Script from "next/script";
import { useEffect, useState } from "react";
import React from "react";


export default function Page() {
    let [widget, setWidget] = useState(false);

    useEffect(() => {
        const widgetsNode = document.querySelector('livelike-widgets')

        widgetsNode.addEventListener('dismiss', function (ev) {
            /* A widget was explicitly dismissed by the user */
            myAnalytics.trackEvent('Widget Dismissed', { widgetId: ev.detail.widget.id })
        })

        ['vote', 'answer', 'cheer'].forEach(function (eventName) {
            widgetsNode.addEventListener(eventName, function (ev) {
                /* A widget was interacted with */
                myAnalytics.trackEvent('Widget Interacted', { widgetId: ev.detail.widget.id })
            })
        })
    }, [widget]);

    const LivelikeScriptLoaded = () => {
        let ll = window.LiveLike.init({ clientId: 'cE5S4ztbPU0DkDL0kedg3TiyGVXb5uDg7KvPYlRm' });
        window.LiveLike.setLanguage('aa');
        setWidget(true);

    }

    return (
        <>
            <Script src="https://unpkg.com/@livelike/engagementsdk@2.59.0/livelike.umd.js" onLoad={LivelikeScriptLoaded}>
            </Script>
            {widget ? React.createElement('livelike-widgets', { programid: "19502c99-b286-4e54-921b-97a9a04e101d", mode: "timeline" }) : (<p>SDK not loaded</p>)}
        </>)
}