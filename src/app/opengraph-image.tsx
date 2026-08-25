import { ImageResponse } from "next/og";
import { profile } from "../../content/profile";

// Static social-card image. ImageResponse can't consume Tailwind tokens/CSS
// vars, so the design-system hex values are inlined here (the one legitimate
// place for raw hex — this generates an image, it isn't a themed component).
// Light palette only; social cards aren't theme-aware.
export const alt = `${profile.name} — Cloud & Backend Engineering`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#FAFAF8",
          padding: "80px",
        }}
      >
        {/* warm -> teal bar, echoing the journey timeline gradient */}
        <div
          style={{
            width: "160px",
            height: "10px",
            borderRadius: "9999px",
            backgroundImage: "linear-gradient(90deg, #B45309, #0F766E)",
            marginBottom: "40px",
          }}
        />
        <div style={{ fontSize: 68, fontWeight: 700, color: "#14181F", lineHeight: 1.1 }}>
          {profile.name}
        </div>
        <div style={{ fontSize: 40, color: "#0F766E", marginTop: "20px" }}>
          {profile.heroHeadline}
        </div>
        <div style={{ fontSize: 26, color: "#5B6472", marginTop: "28px", maxWidth: "900px" }}>
          {profile.location}
        </div>
      </div>
    ),
    size,
  );
}
