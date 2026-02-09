'use client';
/// <reference types="../global" />

import Script from "next/script";
import { useState } from "react";
import React from "react";


export default function Page() {
    let [widget, setWidget] = useState(false);

    const LivelikeScriptLoaded = () => {
        let ll = window.LiveLike.init({clientId: 'cE5S4ztbPU0DkDL0kedg3TiyGVXb5uDg7KvPYlRm'});
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