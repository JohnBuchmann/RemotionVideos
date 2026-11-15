import { Fragment } from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import type { FeatureGridConfig } from "./featureGrid";

const AccentText: React.FC<{ text: string; accentColor: string }> = ({
  text,
  accentColor,
}) => (
  <>
    {text.split("\n").map((line, li) => (
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
  </>
);

export const FeatureGridScreenshot: React.FC<
  FeatureGridConfig & { accentColor?: string }
> = ({ title, sections, accentColor = "#ffcf00" }) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#111114",
        fontFamily: "sans-serif",
        padding: "60px 50px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          fontSize: 92,
          fontWeight: 800,
          color: "white",
          textAlign: "center",
          marginBottom: 70,
        }}
      >
        <AccentText text={title} accentColor={accentColor} />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          columnGap: 70,
          rowGap: 80,
        }}
      >
        {sections.map((section, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div
              style={{ position: "relative", top: section.textShift ?? 0 }}
            >
              <div
                style={{
                  fontSize: 40,
                  fontWeight: 700,
                  color: "white",
                  marginBottom: 20,
                  height: 108,
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
              >
                <div>
                  <AccentText
                    text={section.heading}
                    accentColor={accentColor}
                  />
                </div>
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 400,
                  lineHeight: 1.4,
                  color: "rgba(255, 255, 255, 0.65)",
                  marginBottom: 36,
                  padding: "0 20px",
                  height: 96,
                }}
              >
                {section.text.split("\n").map((line, li) => (
                  <Fragment key={li}>
                    {li > 0 && <br />}
                    {line}
                  </Fragment>
                ))}
              </div>
            </div>
            <div
              style={{
                width: 455,
                height: 520,
                margin: "0 auto",
                borderRadius: 28,
                overflow: "hidden",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.45)",
                position: "relative",
              }}
            >
              <Img
                src={staticFile(section.image)}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: 455,
                  height: 520,
                  objectFit: "cover",
                  objectPosition: "top",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
