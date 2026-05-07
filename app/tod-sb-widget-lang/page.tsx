'use client';
/// <reference types="../global" />

import Script from "next/script";
import { useState } from "react";
import React from "react";
import LiveLike, { LiveLikeWidgets } from "@livelike/engagementsdk";


export default function ChatThrottle() {
    let [widget, setWidget] = useState(false);

    const LivelikeScriptLoaded = () => {
        // let ll = window.LiveLike.init({clientId: 'murJlrT422d2Qpa2jcPK32er1WObqdmXggyVI5tg', lang: 'ar'});
        let ll = window.LiveLike.init({clientId: 'cE5S4ztbPU0DkDL0kedg3TiyGVXb5uDg7KvPYlRm', lang: 'ar'});
        
        setWidget(true);

    }

    return (
    <>
        {/* <Script src="https://unpkg.com/@livelike/engagementsdk@2.59.0/livelike.umd.js" onLoad={LivelikeScriptLoaded}>
        </Script> */}
        {/* {widget ? React.createElement('livelike-widgets', { programid: "817a11ef-210b-4d6e-b840-0477cc7994ae", mode: "timeline" }) : (<p>SDK not loaded</p>)} */}
        <livelike-text-poll widgetid="6a9bcba1-d57c-4529-9f5a-0dfee3274659"></livelike-text-poll>
        
    </>)
}