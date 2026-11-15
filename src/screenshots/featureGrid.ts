import copy from "./featureGrid.json";

export type FeatureGridSection = {
  heading: string;
  text: string;
  image: string;
  /** Vertical offset for the heading+text block (negative = shift up). */
  textShift?: number;
};

export type FeatureGridConfig = {
  title: string;
  sections: FeatureGridSection[];
};

export type Locale = keyof typeof copy;

export const FEATURE_GRID = copy as Record<Locale, FeatureGridConfig>;
