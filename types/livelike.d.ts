declare module "@livelike/engagementsdk" {
  const LiveLike: any;
  const LiveLikeWidgets: any;
  export default LiveLike;
  export { LiveLikeWidgets };
}

declare module '@livelike/custom-widgets' {
  const LiveLikeInit: any;
  export { LiveLikeInit };
}

declare module "@livelike/widget-elements" {
  const LiveLike: any;
  export default LiveLike;
  export const LiveLikeInit: any;
}
