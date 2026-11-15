type Props = {
  /** Content shown on the screen — an <Img>, <Video>, <OffthreadVideo>, or any JSX. */
  children: React.ReactNode;
  width?: number;
  height?: number;
  /** Show the Dynamic Island–style pill at the top of the screen. */
  notch?: boolean;
  style?: React.CSSProperties;
};

export const PhoneFrame: React.FC<Props> = ({
  children,
  width = 420,
  height = 860,
  notch = false,
  style,
}) => {
  const bezel = 14;
  const outerRadius = Math.round(width * 0.08);
  const innerRadius = outerRadius - bezel;

  return (
    <div
      style={{
        position: "absolute",
        width,
        height,
        borderRadius: outerRadius,
        backgroundColor: "#6b6b75",
        border: "2px solid #8a8a94",
        boxShadow:
          "0 30px 80px rgba(0, 0, 0, 0.5), inset 0 0 0 2px rgba(255, 255, 255, 0.15)",
        padding: bezel,
        boxSizing: "border-box",
        ...style,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          borderRadius: innerRadius,
          overflow: "hidden",
          backgroundColor: "#000",
        }}
      >
        {children}
        {notch && (
          <div
            style={{
              position: "absolute",
              top: 14,
              left: "50%",
              transform: "translateX(-50%)",
              width: width * 0.28,
              height: width * 0.055,
              borderRadius: 999,
              backgroundColor: "#000",
            }}
          />
        )}
      </div>
    </div>
  );
};
