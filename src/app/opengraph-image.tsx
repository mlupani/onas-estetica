import { ImageResponse } from "next/og";

export const alt = "ONAS — estética integral en Lanús Oeste";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f6f1ea",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.06,
            backgroundImage:
              "radial-gradient(circle at 50% 50%, #8d7766 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 18,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 220,
              height: 220,
              borderRadius: 999,
              backgroundColor: "white",
              border: "1px solid #efe6db",
              boxShadow: "0 8px 32px rgba(28,22,18,0.08)",
            }}
          >
            <span
              style={{
                fontSize: 64,
                letterSpacing: 14,
                fontWeight: 400,
                color: "#1c1612",
                marginLeft: 14,
              }}
            >
              ONAS
            </span>
          </div>
          <span
            style={{
              fontSize: 22,
              letterSpacing: 10,
              color: "#8d7766",
              textTransform: "uppercase",
            }}
          >
            Estética Integral
          </span>
          <span
            style={{
              fontSize: 16,
              letterSpacing: 3,
              color: "#6b5c50",
            }}
          >
            Lanús Oeste · Buenos Aires
          </span>
        </div>
      </div>
    ),
    size
  );
}
