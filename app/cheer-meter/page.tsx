'use client';
/// <reference types="../global" />

import Script from "next/script";
import { useState } from "react";
import React from "react";


export default function ChatThrottle() {
    let [chatBox, setChatBox] = useState(false);

    const LivelikeScriptLoaded = () => {
        let ll = window.LiveLike.init({clientId: 'GVcM4jWPxvTrLkfcopwOV6REuVTf9B12OtP6clv3'});
        setChatBox(true);

    }

    return (
    <>
        <Script src="https://unpkg.com/@livelike/engagementsdk@2.59.0/livelike.umd.js" onLoad={LivelikeScriptLoaded}>
        </Script>
        {
            chatBox ? React.createElement('livelike-cheer-meter', { widgetid: "0119fa2a-5c32-40df-9cee-5672f9df811e", mode: "pop-up" }) : (<p>Chat box not yet true</p>)
        }
    </>)
}