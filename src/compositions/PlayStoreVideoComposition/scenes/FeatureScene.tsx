import {
  AbsoluteFill,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { Video } from "@remotion/media";
import { PhoneFrame } from "../../../components/PhoneFrame";
import { TextCallout } from "../../../components/TextCallout";

export type Callout = {
  /** Text to display — supports \n line breaks. */
  text: string;
  subtext?: string;
  /** Second at which this callout appears (scene-relative). */
  at: number;
};

type Props = {
  /** staticFile path of the screen recording shown inside the phone. */
  video: string;
  playbackRate?: number;
  startAtSeconds?: number;
  endAtSeconds?: number;
  callouts: Callout[];
  accentColor?: string;
  /** Which side the phone sits on — callouts go on the other side. */
  phoneSide?: "left" | "right";
  /** Frames for the rotate-in / rotate-out transitions. */
  transitionFrames?: number;
};

export const FeatureScene: React.FC<Props> = ({
  video,
  playbackRate = 1,
  startAtSeconds = 0,
  endAtSeconds,
  callouts,
  accentColor = "#ffcf00",
  phoneSide = "right",
  transitionFrames = 15,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();

  // Phone fills the height with a small margin top/bottom, upright always.
  const phoneHeight = height - 120;
  const phoneBezel = 7.5;
  const phoneBorder = 3;
  const phoneInset = (phoneBezel + phoneBorder) * 2;
  const phoneWidth = (phoneHeight - phoneInset) * (720 / 1560) + phoneInset;
  const phoneOuterRadius = Math.round(phoneWidth * 0.06);
  const phoneScale = interpolate(frame, [0, 5 * fps], [1, 1.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Enter: swings in from the right, rotating left into place.
  const enter = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 90 },
    durationInFrames: transitionFrames * 2,
  });
  // Exit: rotates out to the left over the last transitionFrames.
  const exit = interpolate(
    frame,
    [durationInFrames - transitionFrames, durationInFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Horizontal travel (outer frame stays put — rotation anchor never moves)
  const sceneX =
    interpolate(enter, [0, 1], [width * 0.6, 0]) +
    interpolate(exit, [0, 1], [0, -width * 0.6]);
  // Rotation around a fixed pivot far below the canvas — carousel arc
  const sceneRotate =
    interpolate(enter, [0, 1], [12, 0]) + interpolate(exit, [0, 1], [0, -12]);
  const opacity = Math.min(enter, 1 - exit);

  const sideMargin = 180;
  const phoneLeft = phoneSide === "right" ? width - phoneWidth - sideMargin : sideMargin;
  const calloutGap = 150;
  const calloutPosition =
    phoneSide === "right"
      ? { right: width - phoneLeft + calloutGap }
      : { left: phoneLeft + phoneWidth + calloutGap };

  return (
    <AbsoluteFill style={{ rotate: `${sceneRotate}deg`, transformOrigin: "50% 250%" }}>
      <AbsoluteFill style={{ translate: `${sceneX}px 0px`, opacity }}>
        {callouts.map((callout, i) => {
          const from = Math.round(callout.at * fps);
          const to = callouts[i + 1] ? Math.round(callouts[i + 1].at * fps) : durationInFrames;
          return (
            <Sequence key={i} from={from} durationInFrames={to - from}>
              <TextCallout
                durationInFrames={to - from}
                accentColor={accentColor}
                style={{
                  ...calloutPosition,
                  maxWidth: Math.max(0, width - phoneWidth - sideMargin * 2 - calloutGap),
                  top: height / 2 - 90,
                }}
              >
                <div style={{ whiteSpace: "pre-line" }}>
                  <div>{callout.text}</div>
                  {callout.subtext && (
                    <div style={{ marginTop: 18, fontSize: 36, fontWeight: 400, lineHeight: 1.4, color: "rgba(255, 255, 255, 0.65)" }}>
                      {callout.subtext}
                    </div>
                  )}
                </div>
              </TextCallout>
            </Sequence>
          );
        })}
        <PhoneFrame
          width={phoneWidth}
          height={phoneHeight}
          bezel={phoneBezel}
          outerRadius={phoneOuterRadius}
          innerRadius={Math.max(0, phoneOuterRadius - phoneBezel - phoneBorder)}
          notch={false}
          style={{
            left: phoneLeft,
            top: (height - phoneHeight) / 2,
            borderWidth: phoneBorder,
            scale: phoneScale,
            transformOrigin: "center center",
          }}
        >
          <Video
            src={staticFile(video)}
            playbackRate={playbackRate}
            trimBefore={Math.round(startAtSeconds * fps)}
            trimAfter={endAtSeconds === undefined ? undefined : Math.round(endAtSeconds * fps)}
            objectFit="cover"
            style={{ width: "100%", height: "100%" }}
          />
        </PhoneFrame>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
