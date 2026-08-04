declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

declare global {
  interface Window {
    LiveLike?: any;
    LiveLikeQuiz?: any;
    html?: any;
    myAnalytics?: {
      trackEvent: (name: string, payload?: Record<string, unknown>) => void;
    };
  }
}

export {};