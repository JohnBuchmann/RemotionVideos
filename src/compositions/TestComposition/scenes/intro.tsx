import {
  AbsoluteFill,
  OffthreadVideo,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { PhoneFrame } from "../../../components/PhoneFrame";
import { TextCallout } from "../../../components/TextCallout";

const PHONE_X = 720;
const PHONE_TOP = 150;
const PHONE_SCALE = 1.1;
const CALLOUT_DELAY = 20;
const CALLOUT_SWAP_FRAME = 7 * 30;

export const Intro = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const phoneIn = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 80 },
    durationInFrames: 45,
  });
  const phoneY = interpolate(phoneIn, [0, 1], [900, 0]);
  const phoneRotate = interpolate(phoneIn, [0, 1], [8, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#111114" }}>
      <Sequence
        from={CALLOUT_DELAY}
        durationInFrames={CALLOUT_SWAP_FRAME - CALLOUT_DELAY}
      >
        <TextCallout
          durationInFrames={CALLOUT_SWAP_FRAME - CALLOUT_DELAY}
          accentColor="#ffcf00"
          style={{ left: 90, top: 290 }}
        >
          Unlimited workouts
          <br />
          to choose from
        </TextCallout>
      </Sequence>

      <Sequence
        from={CALLOUT_SWAP_FRAME}
        durationInFrames={durationInFrames - CALLOUT_SWAP_FRAME}
      >
        <TextCallout
          durationInFrames={durationInFrames - CALLOUT_SWAP_FRAME}
          accentColor="#ffcf00"
          style={{ left: 90, top: 290 }}
        >
          Powerful workout
          <br />
          editor
        </TextCallout>
      </Sequence>

      <PhoneFrame
        style={{
          left: PHONE_X,
          top: PHONE_TOP,
          translate: `0px ${phoneY}px`,
          rotate: `${phoneRotate}deg`,
          scale: PHONE_SCALE,
          transformOrigin: "center bottom",
        }}
      >
        <OffthreadVideo
          src={staticFile("test-video.mp4")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </PhoneFrame>
    </AbsoluteFill>
  );
};
