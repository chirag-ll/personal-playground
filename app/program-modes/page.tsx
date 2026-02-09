'use client';
/// <reference types="../global" />

import Script from "next/script";
import { useState } from "react";
import React from "react";


export default function ChatThrottle() {
    let [chatBox, setChatBox] = useState(false);

    const LivelikeScriptLoaded = () => {
        let ll = window.LiveLike.init({clientId: '8PqSNDgIVHnXuJuGte1HdvOjOqhCFE1ZCR3qhqaS'});
        setChatBox(true);

    }

    return (
    <>
        <Script src="https://unpkg.com/@livelike/engagementsdk@2.59.0/livelike.umd.js" onLoad={LivelikeScriptLoaded}>
        </Script>
        {
            chatBox ? React.createElement('livelike-widgets', { programid: "09d93835-ee52-4757-976c-ea09d6a5798c" }) : (<p>Chat box not yet true</p>)
        }
    </>)
}