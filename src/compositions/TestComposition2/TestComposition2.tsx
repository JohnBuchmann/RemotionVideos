import { Interactive, Solid } from "remotion";
import { Logo } from "../../components/Logo";

type Props = {};

export const TestComposition2: React.FC<Props> = () => {
  return (
    <>
      <Interactive.Div
        name="Text"
        style={{
          position: "absolute",
          translate: "297px 329px",
          fontFamily: "sans-serif",
          fontSize: 54,
          color: "white",
        }}
      >
        Bro
      </Interactive.Div>
      <Solid
        width={100}
        height={100}
        color="gray"
        style={{
          position: "absolute",
          scale: 0.57,
          translate: "334px -173.7px",
          rotate: "21deg",
          backgroundColor: "rgba(183, 61, 61, 0.66)",
          borderRadius: 75,
          borderStyle: "solid",
          borderWidth: 10,
        }}
      />
      <Logo />
    </>
  );
};

export default TestComposition2;
