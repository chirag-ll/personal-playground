'use client';
/// <reference types="../global" />

// import LiveLike from "@livelike/engagementsdk";

import Script from "next/script";
import { useState } from "react";
import React from "react";


export default function ChatThrottle() {
    let [chatBox, setChatBox] = useState(false);

    const LivelikeScriptLoaded = () => {
        let ll = window.LiveLike.init({clientId: 'SPVx1SITwiXApJN8AN4MO2olROC20uogpknXdLmT'});
        setChatBox(true);

    }

    return (
    <>
        <Script src="https://unpkg.com/@livelike/engagementsdk@2.59.0/livelike.umd.js" onLoad={LivelikeScriptLoaded}>
        </Script>
        {
            chatBox ? React.createElement('livelike-chat', { roomid: "a379cb55-add1-40d1-88c4-a6da04f10123" }) : (<p>Chat box not yet true</p>)
        }
    </>)
}