"use client";

import React, { useState } from "react";
import Image from "next/image";

export function ImageZoom({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div
      className="pdp-main-image"
      onMouseEnter={() => setIsZoomed(true)}
      onMouseLeave={() => setIsZoomed(false)}
      onMouseMove={handleMouseMove}
      style={{
        cursor: isZoomed ? "crosshair" : "zoom-in",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 650px"
        priority
        style={{
          objectFit: "cover",
          transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
          transform: isZoomed ? "scale(1.8)" : "scale(1)",
          transition: isZoomed ? "none" : "transform var(--transition-normal)",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: "1rem",
          right: "1rem",
          background: "rgba(244, 240, 232, 0.9)",
          backdropFilter: "blur(4px)",
          padding: "0.35rem 0.75rem",
          fontSize: "0.72rem",
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          borderRadius: "2px",
          color: "var(--color-ink-charcoal)",
          pointerEvents: "none",
        }}
      >
        Hover to Zoom
      </div>
    </div>
  );
}
