const widgetsNode = document.querySelector('livelike-widgets');

widgetsNode.addEventListener('dismiss', (ev) => {
    console.log('dismiss', ev.detail);

    myAnalytics.trackEvent('Widget Dismissed', {
        widgetId: ev.detail?.widget?.id ?? null,
    });
});

['vote', 'answer', 'cheer'].forEach((eventName) => {
    console.log(`Adding event listener for ${eventName}...`);
    widgetsNode.addEventListener(eventName, (ev) => {
        console.log(eventName, ev.detail);

        myAnalytics.trackEvent('Widget Interacted', {
            eventType: eventName,
            widgetId: ev.detail?.widget?.id ?? null,
        });
    });
});
