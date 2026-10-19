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
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 650px"
        priority
        loading="eager"
        style={{
          objectFit: "cover",
        }}
      />
    </div>
  );
}

