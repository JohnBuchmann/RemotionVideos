import copy from "./videoCopy.json";

export type VideoLocale = Extract<keyof typeof copy, string>;
export type CalloutId = keyof typeof copy.en.callouts;
export type VideoCalloutCopy = { text: string; subtext?: string };
export type VideoCopy = {
  callouts: Record<CalloutId, VideoCalloutCopy>;
  cta: { text: string; subtext: string; stores: string };
};

export const VIDEO_COPY: Record<VideoLocale, VideoCopy> = copy;
export const VIDEO_LOCALES = Object.keys(VIDEO_COPY) as VideoLocale[];
