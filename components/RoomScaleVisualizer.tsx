"use client";

import React, { useState } from "react";
import Image from "next/image";

interface RoomScaleVisualizerProps {
  isOpen: boolean;
  onClose: () => void;
  artworkTitle: string;
  artworkImage: string;
  artistName?: string | null;
  widthCm?: number | null;
  heightCm?: number | null;
  depthCm?: number | null;
  frameFinish?: string;
}

export function RoomScaleVisualizer({
  isOpen,
  onClose,
  artworkTitle,
  artworkImage,
  artistName,
  widthCm = 120,
  heightCm = 100,
  depthCm = 5,
  frameFinish = "Natural Oak",
}: RoomScaleVisualizerProps) {
  const [furnitureType, setFurnitureType] = useState<"bench" | "sofa" | "console">("bench");

  if (!isOpen) return null;

  const w = widthCm || 120;
  const h = heightCm || 100;
  const wIn = (w * 0.393701).toFixed(1);
  const hIn = (h * 0.393701).toFixed(1);

  // In a standard 260cm high wall, calculate scale percentage
  // 260cm wall height maps to 440px in container
  const wallHeightCm = 260;
  const stageHeightPx = 440;
  const pxPerCm = stageHeightPx / wallHeightCm;

  const artHeightPx = Math.min(stageHeightPx * 0.75, Math.max(120, h * pxPerCm));
  const artWidthPx = (w / h) * artHeightPx;

  // Frame border styling based on selected finish
  const getFrameStyle = () => {
    switch (frameFinish) {
      case "Obsidian Black":
        return {
          border: "8px solid #1A1A1A",
          boxShadow: "0 18px 38px rgba(0, 0, 0, 0.32), 0 4px 12px rgba(0,0,0,0.22)",
        };
      case "Champagne Gold":
        return {
          border: "8px solid #C5A059",
          boxShadow: "0 18px 38px rgba(0, 0, 0, 0.28), 0 0 16px rgba(197, 160, 89, 0.25)",
        };
      case "Frameless Gallery Wrap":
        return {
          border: "none",
          boxShadow: "0 16px 36px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(0,0,0,0.1)",
        };
      case "Natural Oak":
      default:
        return {
          border: "8px solid #C4A47C",
          boxShadow: "0 18px 38px rgba(0, 0, 0, 0.28), 0 4px 10px rgba(0,0,0,0.15)",
        };
    }
  };

  return (
    <div
      className="scale-modal-backdrop"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(23, 23, 23, 0.75)",
        backdropFilter: "blur(8px)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        className="scale-modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "#FAF7F2",
          borderRadius: "4px",
          maxWidth: "880px",
          width: "100%",
          maxHeight: "92vh",
          overflowY: "auto",
          border: "1px solid #D8D0C0",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.35)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "1.25rem 1.75rem",
            borderBottom: "1px solid #E8E2D5",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#FFFFFF",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "0.72rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#A64B32",
                fontWeight: 600,
              }}
            >
              Architectural Room Visualizer • Eye-Level Scale
            </div>
            <h3 style={{ fontSize: "1.3rem", marginTop: "0.2rem", color: "#24221E" }}>
              {artworkTitle}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Room Visualizer"
            style={{
              fontSize: "1.6rem",
              lineHeight: 1,
              color: "#5C5850",
              cursor: "pointer",
              padding: "0.25rem 0.5rem",
            }}
          >
            ×
          </button>
        </div>

        {/* Dimension & Staging Bar */}
        <div
          style={{
            padding: "0.75rem 1.75rem",
            backgroundColor: "#F4F0E8",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.75rem",
            fontSize: "0.82rem",
            color: "#5C5850",
            borderBottom: "1px solid #E8E2D5",
          }}
        >
          <div>
            <strong>True Dimensions:</strong> {w}H × {h}W cm ({wIn}&quot;H × {hIn}&quot;W) • Depth: {depthCm} cm ({((depthCm || 5) * 0.3937).toFixed(1)}&quot;) • Finish: <strong>{frameFinish}</strong>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "#8A857B" }}>
              Stage Setting:
            </span>
            <button
              type="button"
              onClick={() => setFurnitureType("bench")}
              style={{
                padding: "0.25rem 0.65rem",
                fontSize: "0.75rem",
                borderRadius: "2px",
                border: furnitureType === "bench" ? "1px solid #24221E" : "1px solid #D8D0C0",
                backgroundColor: furnitureType === "bench" ? "#24221E" : "#FFFFFF",
                color: furnitureType === "bench" ? "#FFFFFF" : "#24221E",
                fontWeight: 500,
              }}
            >
              Gallery Stone Bench
            </button>
            <button
              type="button"
              onClick={() => setFurnitureType("sofa")}
              style={{
                padding: "0.25rem 0.65rem",
                fontSize: "0.75rem",
                borderRadius: "2px",
                border: furnitureType === "sofa" ? "1px solid #24221E" : "1px solid #D8D0C0",
                backgroundColor: furnitureType === "sofa" ? "#24221E" : "#FFFFFF",
                color: furnitureType === "sofa" ? "#FFFFFF" : "#24221E",
                fontWeight: 500,
              }}
            >
              Living Room Sofa
            </button>
            <button
              type="button"
              onClick={() => setFurnitureType("console")}
              style={{
                padding: "0.25rem 0.65rem",
                fontSize: "0.75rem",
                borderRadius: "2px",
                border: furnitureType === "console" ? "1px solid #24221E" : "1px solid #D8D0C0",
                backgroundColor: furnitureType === "console" ? "#24221E" : "#FFFFFF",
                color: furnitureType === "console" ? "#FFFFFF" : "#24221E",
                fontWeight: 500,
              }}
            >
              Console Table
            </button>
          </div>
        </div>

        {/* Gallery Stage */}
        <div
          style={{
            position: "relative",
            height: "460px",
            backgroundColor: "#EFECE6",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundImage: "radial-gradient(circle at 50% 28%, #FFFFFF 0%, #EFECE6 75%)",
          }}
        >
          {/* Overhead Gallery Spotlight cone */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "420px",
              height: "280px",
              background: "radial-gradient(ellipse at 50% 0%, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0) 70%)",
              pointerEvents: "none",
            }}
          />

          {/* Eye-level reference line (150cm / 59in from floor) */}
          <div
            style={{
              position: "absolute",
              top: "45%",
              left: "1rem",
              right: "1rem",
              borderTop: "1px dashed rgba(138, 133, 123, 0.25)",
              pointerEvents: "none",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <span style={{ fontSize: "0.68rem", color: "#8A857B", marginTop: "-16px", backgroundColor: "rgba(239, 236, 230, 0.8)", padding: "0 4px" }}>
              Standard Museum Eye-Level (150 cm / 59&quot;)
            </span>
          </div>

          {/* Wall scale marker */}
          <div
            style={{
              position: "absolute",
              left: "1.25rem",
              top: "1.25rem",
              fontSize: "0.72rem",
              color: "#8A857B",
              fontFamily: "var(--font-sans)",
            }}
          >
            Wall Height: 2.6 m / 8.5 ft
          </div>

          {/* Artwork on Wall */}
          <div
            style={{
              position: "relative",
              marginTop: "48px",
              width: `${artWidthPx}px`,
              height: `${artHeightPx}px`,
              ...getFrameStyle(),
              borderRadius: "2px",
              overflow: "hidden",
              transition: "all 0.3s ease",
            }}
          >
            <Image
              src={artworkImage}
              alt={artworkTitle}
              fill
              sizes={`${Math.round(artWidthPx)}px`}
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* Dimension badge overlaid below artwork */}
          <div
            style={{
              marginTop: "8px",
              backgroundColor: "rgba(255, 255, 255, 0.92)",
              backdropFilter: "blur(4px)",
              padding: "4px 12px",
              borderRadius: "12px",
              border: "1px solid #D8D0C0",
              fontSize: "0.72rem",
              color: "#24221E",
              fontWeight: 600,
              boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
            }}
          >
            {w}H × {h}W cm ({wIn}&quot; × {hIn}&quot;)
          </div>

          {/* Furniture Element */}
          <div
            style={{
              position: "relative",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              zIndex: 2,
            }}
          >
            {furnitureType === "bench" && (
              // Minimalist Stone Plinth Bench (like Pinterest Meson Art pin!)
              <div
                style={{
                  width: "480px",
                  height: "36px",
                  backgroundColor: "#D9D4CB",
                  borderRadius: "2px",
                  boxShadow: "0 14px 24px rgba(36, 34, 30, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.4)",
                  border: "1px solid #C5BFB5",
                  position: "relative",
                  marginBottom: "8px",
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "0 40px",
                }}
              >
                {/* Stone bench support blocks */}
                <div style={{ width: "38px", height: "18px", backgroundColor: "#BFB9AE", position: "absolute", bottom: "-18px", left: "60px", boxShadow: "0 4px 8px rgba(0,0,0,0.12)" }} />
                <div style={{ width: "38px", height: "18px", backgroundColor: "#BFB9AE", position: "absolute", bottom: "-18px", right: "60px", boxShadow: "0 4px 8px rgba(0,0,0,0.12)" }} />
              </div>
            )}

            {furnitureType === "sofa" && (
              // Modern low-profile 3-seater sofa back
              <div
                style={{
                  width: "560px",
                  height: "56px",
                  backgroundColor: "#E2DDD3",
                  borderRadius: "6px 6px 0 0",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.1), inset 0 2px 4px rgba(255,255,255,0.6)",
                  border: "1px solid #CFC8BC",
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "0.72rem",
                  color: "#8A857B",
                  letterSpacing: "0.05em",
                }}
              >
                Contemporary 3-Seater Sofa (220 cm Wide)
              </div>
            )}

            {furnitureType === "console" && (
              // Minimalist Floating Oak Console
              <div
                style={{
                  width: "420px",
                  height: "22px",
                  backgroundColor: "#B89A65",
                  borderRadius: "2px",
                  boxShadow: "0 8px 16px rgba(0,0,0,0.12)",
                  border: "1px solid #A18552",
                  position: "relative",
                  marginBottom: "16px",
                }}
              />
            )}

            {/* Gallery Floor with shadow line */}
            <div
              style={{
                width: "100%",
                height: "32px",
                backgroundColor: "#E5E1D8",
                borderTop: "2px solid #CFC9BD",
                boxShadow: "inset 0 4px 10px rgba(0,0,0,0.04)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.7rem",
                color: "#8A857B",
              }}
            >
              Gallery Limestone Floor
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div
          style={{
            padding: "1.25rem 1.75rem",
            backgroundColor: "#FFFFFF",
            borderTop: "1px solid #E8E2D5",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div style={{ fontSize: "0.82rem", color: "#5C5850" }}>
            💡 <em>Tip: Standard residential hanging height places the vertical center of the artwork at 145–150 cm (57–60 inches) from the floor.</em>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-primary"
            style={{ padding: "0.6rem 1.4rem", fontSize: "0.85rem" }}
          >
            Return to Artwork Details
          </button>
        </div>
      </div>
    </div>
  );
}
