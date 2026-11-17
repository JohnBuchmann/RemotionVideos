import { Audio } from "@remotion/media";
import {
  AbsoluteFill,
  Img,
  Series,
  interpolate,
  staticFile,
  useVideoConfig,
} from "remotion";
import { FeatureScene } from "./scenes/FeatureScene";
import { DownloadCTA } from "./scenes/DownloadCTA";
import { CalloutId, VIDEO_COPY, VideoLocale } from "./videoCopy";

const FPS = 30;
export const TRANSITION_FRAMES = 15;
export const CTA_SECONDS = 4;

export const BEATS: (Omit<
  React.ComponentProps<typeof FeatureScene>,
  "callouts"
> & {
  seconds: number;
  callouts: { id: CalloutId; at: number }[];
})[] = [
  {
    video: "videos/activeTimer.mp4",
    seconds: 6,
    startAtSeconds: 9,
    endAtSeconds: 15,
    accentColor: "#ffcf00",
    phoneSide: "left" as const,
    callouts: [{ id: "overview", at: 0 }],
  },
  {
    video: "videos/youtube.mp4",
    seconds: 6,
    // playbackRate: 1.2,
    accentColor: "#ffcf00",
    phoneSide: "right" as const,
    callouts: [{ id: "youtube", at: 0.7 }],
  },
  {
    video: "videos/editor.mp4",
    playbackRate: 2.75,
    seconds: 12,
    accentColor: "#ffcf00",
    phoneSide: "right" as const,
    callouts: [{ id: "editor", at: 0.5 }],
  },
  {
    video: "videos/discover.mp4",
    seconds: 8,
    playbackRate: 2,
    accentColor: "#ffcf00",
    phoneSide: "left" as const,
    callouts: [
      { id: "library", at: 0.7 },
      { id: "libraryYoutube", at: 3.5 },
    ],
  },
  // Add one entry per feature: { video, seconds, accentColor, phoneSide, callouts }
];

export const PlayStoreVideoComposition: React.FC<{ locale: VideoLocale }> = ({
  locale,
}) => {
  const { durationInFrames } = useVideoConfig();
  const copy = VIDEO_COPY[locale];
  return (
    <>
      <Audio
        src={staticFile("background-music.mp3")}
        loop
        volume={(f) =>
          interpolate(
            f,
            [0, 15, durationInFrames - 40, durationInFrames],
            [0, 0.4, 0.4, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            },
          )
        }
      />
      <AbsoluteFill>
        <Img
          src={staticFile("background.png")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>
      <Series>
        {BEATS.map((beat, i) => (
          <Series.Sequence
            key={i}
            durationInFrames={Math.round(beat.seconds * FPS)}
            offset={i === 0 ? 0 : -TRANSITION_FRAMES}
          >
            <FeatureScene
              video={beat.video}
              playbackRate={beat.playbackRate}
              startAtSeconds={beat.startAtSeconds}
              endAtSeconds={beat.endAtSeconds}
              callouts={beat.callouts.map(({ id, at }) => ({
                ...copy.callouts[id],
                at,
              }))}
              accentColor={beat.accentColor}
              phoneSide={beat.phoneSide}
              transitionFrames={TRANSITION_FRAMES}
            />
          </Series.Sequence>
        ))}
        <Series.Sequence
          durationInFrames={CTA_SECONDS * FPS}
          offset={-TRANSITION_FRAMES}
        >
          <DownloadCTA copy={copy.cta} />
        </Series.Sequence>
      </Series>
    </>
  );
};

export default PlayStoreVideoComposition;
