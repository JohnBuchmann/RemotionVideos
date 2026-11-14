import { Composition, Still } from "remotion";
import { TestComposition } from "./compositions/TestComposition/TestComposition";
import { TestComposition2 } from "./compositions/TestComposition2/TestComposition2";
import { StoreScreenshot } from "./StoreScreenshot";
import { Locale, SCREENSHOTS } from "./screenshots";

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
    </>
  );
};
