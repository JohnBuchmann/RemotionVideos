import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";

type Props = {
  children: React.ReactNode;
  /** Total frames the callout is on screen (usually the parent Sequence's duration). */
  durationInFrames: number;
  /** Accent color for the bar/dot on the left. */
  accentColor?: string;
  style?: React.CSSProperties;
};

const ENTER_FRAMES = 15;
const EXIT_FRAMES = 12;

export const TextCallout: React.FC<Props> = ({
  children,
  durationInFrames,
  accentColor = "#7c5cff",
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
    durationInFrames: ENTER_FRAMES,
  });

  const exit = interpolate(
    frame,
    [durationInFrames - EXIT_FRAMES, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const progress = Math.min(enter, exit);
  const translateY = interpolate(progress, [0, 1], [24, 0]);
  const scale = interpolate(progress, [0, 1], [0.92, 1]);

  return (
    <div
      style={{
        position: "absolute",
        opacity: progress,
        transform: `translateY(${translateY}px) scale(${scale})`,
        transformOrigin: "center bottom",
        display: "flex",
        alignItems: "center",
        gap: 24,
        padding: "27px 42px",
        fontFamily: "sans-serif",
        fontSize: 60,
        fontWeight: 600,
        color: "white",
        backgroundColor: "rgba(15, 15, 20, 0.82)",
        borderRadius: 30,
        boxShadow: "0 12px 40px rgba(0, 0, 0, 0.35)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(8px)",
        ...style,
      }}
    >
      <div
        style={{
          width: 9,
          alignSelf: "stretch",
          borderRadius: 4.5,
          backgroundColor: accentColor,
          flexShrink: 0,
        }}
      />
      {children}
    </div>
  );
};
