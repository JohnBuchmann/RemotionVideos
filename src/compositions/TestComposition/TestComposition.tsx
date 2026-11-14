import { Audio } from "@remotion/media";
import { Series, interpolate, staticFile } from "remotion";
import { Intro } from "./scenes/intro";

type Props = {};

export const TestComposition: React.FC<Props> = () => {
  return (
    <>
      <Audio
        src={staticFile("background-music.mp3")}
        volume={(f) =>
          interpolate(f, [0, 15, 740, 780], [0, 0.4, 0.4, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
      />
      <Series>
        <Series.Sequence durationInFrames={780}>
          <Intro />
        </Series.Sequence>
      </Series>
    </>
  );
};

export default TestComposition;
