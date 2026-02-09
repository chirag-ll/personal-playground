'use client';

import * as LiveLike from '@livelike/custom-widgets';
import '@livelike/custom-widgets/dist/livelike.css';
import { useEffect, useState } from 'react';


export default function CustomWidgetsPage() {
    const [sdkLoaded, setSdkLoaded] = useState(false);

    const loadLiveLikeSdk = () => {
        LiveLike.LiveLikeInit({ clientId: 'cE5S4ztbPU0DkDL0kedg3TiyGVXb5uDg7KvPYlRm' });
        setSdkLoaded(true);
    }

    useEffect(() => {
        loadLiveLikeSdk();
    }, []);

    return (
        <cheer-meter
            widgetid="a5b190e7-b9a6-4b5e-841e-35013a435896"
            kind="cheer-meter"
        ></cheer-meter>
    )
}