import { Fragment } from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { PhoneFrame } from "../components/PhoneFrame";

type Overlay = {
  src: string;
  x: number;
  y: number;
  width?: number;
  rotate?: number;
  scale?: number;
  zIndex?: number;
};

export type PhoneSpec = {
  width?: number;
  height?: number;
  left?: number | string;
  right?: number | string;
  top?: number | string;
  bottom?: number | string;
  /** e.g. "-50% 0px" for horizontal centering */
  translate?: string;
  rotate?: number;
  scale?: number;
  zIndex?: number;
};

type Props = {
  title: string;
  subtitle?: string;
  screenshot: string;
  /** If provided, renders a second overlapping phone showing this screen. */
  screenshot2?: string;
  /** Overrides for the main phone's size/position. */
  phone?: PhoneSpec;
  /** Overrides for the second phone (duo only). */
  phone2?: PhoneSpec;
  overlays?: Overlay[];
  accentColor?: string;
};

const ScreenImg: React.FC<{ src: string }> = ({ src }) => (
  <Img
    src={staticFile(src)}
    style={{ width: "100%", height: "100%", objectFit: "cover" }}
  />
);

const phoneStyle = (spec: PhoneSpec): React.CSSProperties => ({
  left: spec.left,
  right: spec.right,
  top: spec.top,
  bottom: spec.bottom,
  translate: spec.translate,
  rotate: spec.rotate !== undefined ? `${spec.rotate}deg` : undefined,
  scale: spec.scale,
  zIndex: spec.zIndex,
});

const SINGLE_DEFAULT: PhoneSpec = {
  width: 700,
  height: 1479,
  left: "50%",
  bottom: 50,
  translate: "-50% 0px",
};

// left phone in duo
const DUO_BACK_DEFAULT: PhoneSpec = {
  width: 640,
  height: 1349,
  left: -80,
  bottom: 150,
  rotate: -8,
  zIndex: 1,
};

// right phone in duo
const DUO_FRONT_DEFAULT: PhoneSpec = {
  width: 640,
  height: 1349,
  right: -60,
  bottom: 40,
  rotate: 6,
  zIndex: 2,
};

export const StoreScreenshot: React.FC<Props> = ({
  title,
  subtitle,
  screenshot,
  screenshot2,
  phone,
  phone2,
  overlays,
  accentColor = "#ffcf00",
}) => {
  const main = screenshot2
    ? { ...DUO_FRONT_DEFAULT, ...phone }
    : { ...SINGLE_DEFAULT, ...phone };
  const back = { ...DUO_BACK_DEFAULT, ...phone2 };
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#111114",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          marginTop: 50,
          padding: "0 20px",
          fontSize: 84,
          fontWeight: 800,
          lineHeight: 1.15,
          color: "white",
          textAlign: "center",
        }}
      >
        {title.split("\n").map((line, li) => (
          <Fragment key={li}>
            {li > 0 && <br />}
            {line.split("*").map((part, i) =>
              i % 2 === 1 ? (
                <span key={i} style={{ color: accentColor }}>
                  {part}
                </span>
              ) : (
                <span key={i}>{part}</span>
              ),
            )}
          </Fragment>
        ))}
      </div>

      {subtitle && (
        <div
          style={{
            marginTop: 36,
            padding: "0 100px",
            fontSize: 38,
            fontWeight: 400,
            lineHeight: 1.4,
            color: "rgba(255, 255, 255, 0.65)",
            textAlign: "center",
          }}
        >
          {subtitle.split("\n").map((line, li) => (
            <Fragment key={li}>
              {li > 0 && <br />}
              {line}
            </Fragment>
          ))}
        </div>
      )}

      {!screenshot2 ? (
        <PhoneFrame
          width={main.width}
          height={main.height}
          notch={false}
          style={phoneStyle(main)}
        >
          <ScreenImg src={screenshot} />
        </PhoneFrame>
      ) : (
        <>
          <PhoneFrame
            width={back.width}
            height={back.height}
            notch={false}
            style={phoneStyle(back)}
          >
            <ScreenImg src={screenshot2} />
          </PhoneFrame>
          <PhoneFrame
            width={main.width}
            height={main.height}
            notch={false}
            style={phoneStyle(main)}
          >
            <ScreenImg src={screenshot} />
          </PhoneFrame>
        </>
      )}

      {overlays?.map((overlay, i) => (
        <Img
          key={i}
          src={staticFile(overlay.src)}
          style={{
            position: "absolute",
            left: overlay.x,
            top: overlay.y,
            width: overlay.width,
            rotate: `${overlay.rotate ?? 0}deg`,
            scale: overlay.scale ?? 1,
            zIndex: overlay.zIndex ?? 10,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};
