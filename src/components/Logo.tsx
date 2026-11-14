import { CanvasImage, staticFile } from "remotion";

export const Logo: React.FC<{ style?: React.CSSProperties }> = ({ style }) => {
  return (
    <CanvasImage
      src={staticFile("icon.jpg")}
      style={{
        position: "absolute",
        width: 512,
        height: 512,
        scale: 0.405,
        translate: "-109px 339.4px",
        rotate: "9.5deg",
        borderWidth: 3,
        borderStyle: "dashed",
        borderRadius: 10,
        ...style,
      }}
    />
  );
};
