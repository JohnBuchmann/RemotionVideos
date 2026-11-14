import copy from "./screenshots.json";

export type PhoneSpec = {
  width?: number;
  height?: number;
  left?: number | string;
  right?: number | string;
  top?: number | string;
  bottom?: number | string;
  translate?: string;
  rotate?: number;
  scale?: number;
  zIndex?: number;
};

export type ScreenshotConfig = {
  title: string;
  subtitle?: string;
  screenshot: string;
  screenshot2?: string;
  phone?: PhoneSpec;
  phone2?: PhoneSpec;
  overlays?: {
    src: string;
    x: number;
    y: number;
    width?: number;
    rotate?: number;
    scale?: number;
    zIndex?: number;
  }[];
};

export type Locale = keyof typeof copy;

export const SCREENSHOTS = copy as Record<Locale, ScreenshotConfig[]>;
