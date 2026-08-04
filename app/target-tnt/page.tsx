'use client';

import Script from "next/script";
import { useEffect, useState } from "react";
import React from "react";


export default function Page() {
    let [widget, setWidget] = useState(false);

    const LivelikeScriptLoaded = () => {
        let ll = window.LiveLike.init({clientId: 'ERZ1xniRl1UcD7JLXeSmroxQ2vYqy06Kl9HJMrzY'});
        // window.LiveLike.setLanguage('aa');
        setWidget(true);

    }

    const getReactionSpaceDetail = (reactionSpaceId: string) => {
        window.LiveLike.getReactionSpaceDetail({
            targetGroupId: "es_italy_reaction_space",
        }).then((reactionSpace: unknown) => console.log(reactionSpace));
        getUserReactionsCount(reactionSpaceId);
    };

    const getUserReactionsCount = (reactionSpaceId: string) => {
        window.LiveLike.getUserReactionsCount({
            reactionSpaceId,
            targetIds: ["livecommentitem:1664011", "livecommentitem:1663861"],
        }).then((reaction: unknown) => {
            console.log(reaction);
        });
    };

    // const loadReactionDetails = () => {
    // window.LiveLike.getReactionSpaceDetail({
    //   reactionSpaceId: "",
    // })
    //   .then((reactionSpace) => {
    //     console.log('Reaction Space Details:', reactionSpace);
    //     window.LiveLike.reactionPackController
    //       .loadReactionPackFromReactionSpace(reactionSpace)
    //       .then(() => {
    //         console.log('Reaction Pack Loaded');
    //         window.LiveLike.userReactionController
    //           .loadUserReactions({
    //             reactionSpaceId: reactionSpace.id,
    //             targetIds: ["livecommentitem:1663981", "livecommentitem:1663861"],
    //           })
    //           .then(() => {
    //             console.log('User Reactions Loaded');
    //           })
    //           .catch((error) => {
    //             console.error('[loadUserReactions] An error occurred:', error);
    //           });
    //       })
    //       .catch((error) => {
    //         console.error(
    //           '[loadReactionPackFromReactionSpace] An error occurred:',
    //           error
    //         );
    //       });
    //   })
    //   .catch((error) => {
    //     console.error('[getReactionSpaceDetail] An error occurred:', error);
    //   });
    // };

    useEffect(() => {
        if (widget) {
            // loadReactionDetails();
            getReactionSpaceDetail("d70210ff-a076-4846-966e-7059589cc0ea");
        }
    }, [widget]);


    return (
    <>
        <Script src="https://unpkg.com/@livelike/engagementsdk@2.59.0/livelike.umd.js" onLoad={LivelikeScriptLoaded}>
        </Script>
        {/* {widget ? React.createElement('livelike-widgets', { programid: "19502c99-b286-4e54-921b-97a9a04e101d", mode: "timeline" }) : (<p>SDK not loaded</p>)} */}
        {widget ? <livelike-reaction targetGroupId="es_italy_reaction_space" targetId="livecommentitem:1664011"></livelike-reaction> : (<p>SDK not loaded</p>)}
    </>)
}