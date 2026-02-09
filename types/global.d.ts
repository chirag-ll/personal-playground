declare global {
  namespace JSX {
    interface IntrinsicElements {
      "livelike-chat": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "livelike-widgets": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "image-poll": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "cheer-meter": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "circular-predictor": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "livelike-image-poll": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "livelike-text-quiz": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

declare global {
  interface Window {
    LiveLike?: any;
    LiveLikeQuiz?: any;
  }
}

export {};