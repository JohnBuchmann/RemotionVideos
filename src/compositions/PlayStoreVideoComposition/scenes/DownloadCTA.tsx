import {
  AbsoluteFill,
  Img,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import type { VideoCopy } from "../videoCopy";

export const DownloadCTA = ({ copy }: { copy: VideoCopy["cta"] }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 200 } });
  const gridScale = interpolate(frame, [0, 5 * fps], [1, 1.1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const gridRotate = interpolate(frame, [0, 5 * fps], [5, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const gridOpacity = interpolate(frame, [0, fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <Img
        src={staticFile("background.png")}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <AbsoluteFill
        style={{
          overflow: "hidden",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            width: "20%",
            flexShrink: 0,
            padding: "80px 40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 40,
            opacity: enter,
            transform: `translateY(${interpolate(enter, [0, 1], [24, 0])}px)`,
          }}
        >
          <Img
            src={staticFile("logo.png")}
            style={{ width: "70%", height: "auto" }}
          />
          <div
            style={{
              fontFamily: "sans-serif",
              fontSize: 48,
              lineHeight: 1.4,
              color: "white",
            }}
          >
            {copy.subtext}
          </div>
          <Img
            src={staticFile("getItOnGooglePlay.svg")}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <div style={{ flex: 1, minWidth: 0, overflow: "hidden" }}>
          <Img
            src={staticFile("phoneGrid.png")}
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              opacity: gridOpacity,
              scale: gridScale,
              rotate: `${gridRotate}deg`,
              transformOrigin: "center center",
            }}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
