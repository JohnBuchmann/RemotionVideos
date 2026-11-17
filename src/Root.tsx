import { Composition, Still } from "remotion";
import {
  PlayStoreVideoComposition,
  BEATS,
  TRANSITION_FRAMES,
  CTA_SECONDS,
} from "./compositions/PlayStoreVideoComposition/PlayStoreVideoComposition";
import {
  VIDEO_COPY,
  VideoLocale,
} from "./compositions/PlayStoreVideoComposition/videoCopy";
import { StoreScreenshot } from "./screenshots/StoreScreenshot";
import { FeatureGridScreenshot } from "./screenshots/FeatureGridScreenshot";
import { Locale, SCREENSHOTS } from "./screenshots/screenshots";
import { FEATURE_GRID, Locale as GridLocale } from "./screenshots/featureGrid";

export const RemotionRoot: React.FC = () => {
  const duration = Math.round(
    BEATS.reduce((sum, b) => sum + b.seconds * 30, 0) +
      CTA_SECONDS * 30 -
      TRANSITION_FRAMES * BEATS.length,
  );
  return (
    <>
      {(Object.keys(VIDEO_COPY) as VideoLocale[]).map((locale) => (
        <Composition
          key={locale}
          id={`PlayStoreVideo-${locale}`}
          component={PlayStoreVideoComposition}
          defaultProps={{ locale }}
          durationInFrames={duration}
          fps={30}
          width={1920}
          height={1080}
        />
      ))}
      {(Object.keys(SCREENSHOTS) as Locale[]).map((locale) =>
        SCREENSHOTS[locale].map((shot, i) => (
          <Still
            key={`${locale}-${i}`}
            id={`Screenshot-${locale}-${i + 1}`}
            component={StoreScreenshot}
            width={1080}
            height={1920}
            defaultProps={{
              title: shot.title,
              subtitle: shot.subtitle,
              screenshot: shot.screenshot,
              screenshot2: shot.screenshot2,
              phone: shot.phone,
              phone2: shot.phone2,
              overlays: shot.overlays,
            }}
          />
        )),
      )}
      {(Object.keys(FEATURE_GRID) as GridLocale[]).map((locale) => (
        <Still
          key={locale}
          id={`FeatureGrid-${locale}`}
          component={FeatureGridScreenshot}
          width={1080}
          height={1920}
          defaultProps={{
            title: FEATURE_GRID[locale].title,
            sections: FEATURE_GRID[locale].sections,
          }}
        />
      ))}
    </>
  );
};
