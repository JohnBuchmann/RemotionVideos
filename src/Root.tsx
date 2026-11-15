import { Composition, Still } from "remotion";
import { TestComposition } from "./compositions/TestComposition/TestComposition";
import { TestComposition2 } from "./compositions/TestComposition2/TestComposition2";
import { StoreScreenshot } from "./screenshots/StoreScreenshot";
import { FeatureGridScreenshot } from "./screenshots/FeatureGridScreenshot";
import { Locale, SCREENSHOTS } from "./screenshots/screenshots";
import { FEATURE_GRID, Locale as GridLocale } from "./screenshots/featureGrid";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="TestVideo"
        component={TestComposition}
        durationInFrames={780}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="TestVideo2"
        component={TestComposition2}
        durationInFrames={60}
        fps={30}
        width={700}
        height={700}
      />
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
