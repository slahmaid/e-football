import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "PixelPitch — eFootball Blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          background: "#f7f5f1",
          color: "#121212",
          padding: "72px",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontFamily: "Arial, Helvetica, sans-serif",
            fontWeight: 700,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            marginBottom: 28,
            color: "#3a3a3a",
          }}
        >
          eFootball Blog
        </div>
        <div
          style={{
            fontSize: 88,
            fontWeight: 600,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            marginBottom: 28,
          }}
        >
          PixelPitch
        </div>
        <div
          style={{
            fontSize: 32,
            fontFamily: "Arial, Helvetica, sans-serif",
            color: "#3a3a3a",
            maxWidth: 820,
            lineHeight: 1.4,
          }}
        >
          Tactics, squad guides, and match analysis for competitive players.
        </div>
      </div>
    ),
    { ...size },
  );
}
