declare global {
  namespace JSX {
    interface IntrinsicElements {
      "livelike-chat": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "livelike-widgets": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "livelike-cheer-meter": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "livelike-text-poll": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "livelike-alert": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "image-poll": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "cheer-meter": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "circular-predictor": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "livelike-image-poll": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "livelike-text-quiz": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "livelike-select": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "livelike-option": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "livelike-progress": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "livelike-description": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "livelike-percentage": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "livelike-footer": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "livelike-widget-root": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "livelike-widget-header": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "livelike-title": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "livelike-widget-body": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
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
