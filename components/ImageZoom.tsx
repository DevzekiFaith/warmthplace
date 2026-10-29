"use client";

import React from "react";
import Image from "next/image";

export function ImageZoom({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <div
      className="pdp-main-image"
      style={{
        overflow: "hidden",
        position: "relative",
        aspectRatio: "auto",
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={900}
        sizes="(max-width: 1024px) 100vw, 680px"
        priority
        loading="eager"
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          objectFit: "contain",
        }}
      />
    </div>
  );
}

