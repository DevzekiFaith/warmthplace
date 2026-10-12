"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface HomeReferenceMockupProps {
  onScrollToCatalogue?: () => void;
}

export function HomeReferenceMockup({ onScrollToCatalogue }: HomeReferenceMockupProps) {
  const [activeBrandName, setActiveBrandName] = useState<"PORT_MUZIRIS" | "WARMTHPLACE">("PORT_MUZIRIS");

  const scrollToShop = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById("shop-catalogue");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    } else if (onScrollToCatalogue) {
      onScrollToCatalogue();
    }
  };

  return (
    <section className="mockup-presentation-canvas" aria-label="1/1 Reference Artwork Hero">
      {/* ─── 1. SPLIT VIEWPORT BACKGROUND ─── */}
      <div className="mockup-split-bg" aria-hidden="true">
        <div className="mockup-split-sand" />
        <div className="mockup-split-olive" />
      </div>

      {/* ─── 2. WIREFRAME GEOMETRIC OVERLAY (EXACT MATCH TO REFERENCE) ─── */}
      <div className="mockup-wireframes-layer" aria-hidden="true">
        {/* Top-Left: Penrose Impossible Triangle in Beige field */}
        <svg
          className="wireframe-shape wireframe-triangle"
          viewBox="0 0 140 140"
          fill="none"
          stroke="#2C2720"
          strokeWidth="1.2"
        >
          {/* Outer isometric triangle */}
          <polygon points="70,12 128,118 12,118" strokeDasharray="3 3" opacity="0.35" />
          <polygon points="70,30 114,108 26,108" opacity="0.4" />
          <line x1="70" y1="12" x2="70" y2="70" opacity="0.3" />
          <line x1="12" y1="118" x2="60" y2="90" opacity="0.3" />
          <line x1="128" y1="118" x2="80" y2="90" opacity="0.3" />
        </svg>

        {/* Top-Center: Isometric 3D Cube spanning beige/olive center boundary */}
        <svg
          className="wireframe-shape wireframe-cube"
          viewBox="0 0 120 120"
          fill="none"
          stroke="#2A2822"
          strokeWidth="1.2"
        >
          {/* Isometric hexagon outline */}
          <polygon points="60,10 105,36 105,88 60,114 15,88 15,36" opacity="0.32" />
          {/* Inner isometric Y axis */}
          <line x1="60" y1="62" x2="60" y2="10" opacity="0.38" />
          <line x1="60" y1="62" x2="105" y2="88" opacity="0.38" />
          <line x1="60" y1="62" x2="15" y2="88" opacity="0.38" />
          {/* Internal dotted projection */}
          <line x1="60" y1="10" x2="60" y2="114" strokeDasharray="2 3" opacity="0.2" />
        </svg>

        {/* Top-Right: Tilted 3D Isometric Cylinder in Olive field */}
        <svg
          className="wireframe-shape wireframe-cylinder-top"
          viewBox="0 0 100 100"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.2"
        >
          <g transform="rotate(-35 50 50)" opacity="0.35">
            <ellipse cx="50" cy="22" rx="28" ry="11" />
            <ellipse cx="50" cy="78" rx="28" ry="11" strokeDasharray="3 3" />
            <line x1="22" y1="22" x2="22" y2="78" />
            <line x1="78" y1="22" x2="78" y2="78" />
          </g>
        </svg>

        {/* Bottom-Left: Interlocking 3D Knot / Polygon in Beige field */}
        <svg
          className="wireframe-shape wireframe-knot"
          viewBox="0 0 160 160"
          fill="none"
          stroke="#2C2720"
          strokeWidth="1.2"
        >
          <g opacity="0.32">
            <path d="M40 30L120 30L140 70L60 70Z" strokeDasharray="3 2" />
            <path d="M60 70L140 70L120 120L40 120Z" />
            <path d="M20 80L40 30L60 70L40 120Z" />
            <line x1="40" y1="30" x2="120" y2="120" strokeDasharray="2 4" />
          </g>
        </svg>

        {/* Far-Right: Tilted floating cylinder on right edge */}
        <svg
          className="wireframe-shape wireframe-cylinder-edge"
          viewBox="0 0 80 120"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.2"
        >
          <g transform="rotate(25 40 60)" opacity="0.25">
            <ellipse cx="40" cy="20" rx="20" ry="8" />
            <ellipse cx="40" cy="90" rx="20" ry="8" strokeDasharray="2 3" />
            <line x1="20" y1="20" x2="20" y2="90" />
            <line x1="60" y1="20" x2="60" y2="90" />
          </g>
        </svg>

        {/* Bottom-Right: Curved 3D Arc in Olive field */}
        <svg
          className="wireframe-shape wireframe-arc"
          viewBox="0 0 120 120"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.2"
        >
          <g opacity="0.3">
            <path d="M20 90C35 40 85 40 100 90" strokeDasharray="4 3" />
            <path d="M30 95C42 52 78 52 90 95" />
            <line x1="20" y1="90" x2="30" y2="95" />
            <line x1="100" y1="90" x2="90" y2="95" />
          </g>
        </svg>
      </div>

      {/* ─── 3. THE FLOATING MONITOR / TABLET SCREEN FRAME ─── */}
      <div className="mockup-bezel-wrapper">
        <div className="mockup-bezel">
          {/* Inner Screen Surface */}
          <div className="mockup-screen">
            {/* Header: Classical Arch Emblem + Menu */}
            <header className="mockup-screen-header">
              {/* Arch Emblem Logo */}
              <div
                className="mockup-logo-cluster"
                onClick={() =>
                  setActiveBrandName((prev) =>
                    prev === "PORT_MUZIRIS" ? "WARMTHPLACE" : "PORT_MUZIRIS"
                  )
                }
                title="Click to toggle reference title (Port Muziris / Warmthplace)"
                role="button"
                tabIndex={0}
              >
                <svg
                  className="mockup-arch-svg"
                  viewBox="0 0 44 48"
                  fill="none"
                  stroke="#7A6F5D"
                  strokeWidth="1.5"
                >
                  {/* Outer Roman Arch */}
                  <path d="M6 46V18C6 9.163 13.163 2 22 2C30.837 2 38 9.163 38 18V46" />
                  {/* Inner Arch */}
                  <path d="M12 46V20C12 14.477 16.477 10 22 10C27.523 10 32 14.477 32 20V46" />
                  {/* Vertical Center Spine */}
                  <line x1="22" y1="10" x2="22" y2="46" stroke="#9E8D77" strokeWidth="1" />
                  {/* Keystones */}
                  <line x1="12" y1="20" x2="6" y2="18" stroke="#9E8D77" strokeWidth="1" />
                  <line x1="32" y1="20" x2="38" y2="18" stroke="#9E8D77" strokeWidth="1" />
                  <circle cx="22" cy="6" r="1.5" fill="#9E8D77" />
                </svg>

                <div className="mockup-brand-typography">
                  {activeBrandName === "PORT_MUZIRIS" ? (
                    <>
                      <span className="mockup-brand-line">PORT</span>
                      <span className="mockup-brand-line">MUZIRIS</span>
                    </>
                  ) : (
                    <>
                      <span className="mockup-brand-line">WARMTH</span>
                      <span className="mockup-brand-line">PLACE</span>
                    </>
                  )}
                </div>
              </div>

              {/* Navigation Items (Exact match to reference) */}
              <nav className="mockup-screen-nav" aria-label="Reference Navigation">
                <Link href="/" className="mockup-nav-item active">
                  Home
                </Link>
                <Link href="/about" className="mockup-nav-item">
                  About
                </Link>
                <Link href="/collections" className="mockup-nav-item">
                  Accomodation
                </Link>
                <Link href="/shop/decor" className="mockup-nav-item">
                  Resort Services
                </Link>
                <Link href="/shop/art" className="mockup-nav-item">
                  Art
                </Link>
                <Link href="/contact" className="mockup-nav-item">
                  Contact Us
                </Link>
              </nav>
            </header>

            {/* Screen Hero Body */}
            <div className="mockup-hero-body">
              {/* Left Group: Watercolor Wash, "Art.", Headline, Link */}
              <div className="mockup-left-group">
                {/* Translucent Sky-Blue Watercolor Splash */}
                <div className="mockup-watercolor-splash" aria-hidden="true">
                  <svg viewBox="0 0 400 180" fill="none" className="watercolor-svg">
                    <defs>
                      <filter id="watercolor-blur" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="14" />
                      </filter>
                      <linearGradient id="watercolor-grad" x1="0%" y1="0%" x2="100%" y2="50%">
                        <stop offset="0%" stopColor="#9ABFE0" stopOpacity="0.75" />
                        <stop offset="50%" stopColor="#BCD5EB" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#D5E5F2" stopOpacity="0.25" />
                      </linearGradient>
                    </defs>
                    {/* Organic hand-brushed blob path */}
                    <path
                      d="M20 95 C 10 40, 90 20, 160 35 C 230 15, 330 30, 370 70 C 400 110, 340 145, 270 155 C 200 170, 110 150, 60 140 C 25 130, 15 110, 20 95 Z"
                      fill="url(#watercolor-grad)"
                      filter="url(#watercolor-blur)"
                    />
                  </svg>
                </div>

                {/* Stippled / Halftone "Art." Watermark */}
                <div className="mockup-watermark-art" aria-hidden="true">
                  <svg viewBox="0 0 320 160" className="art-stippled-svg">
                    <defs>
                      <pattern id="stipple-dots" width="4" height="4" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="1.1" fill="#24221E" fillOpacity="0.32" />
                      </pattern>
                      <mask id="art-mask">
                        <text
                          x="10"
                          y="125"
                          fontFamily="Georgia, 'Times New Roman', serif"
                          fontSize="135"
                          fontStyle="normal"
                          fontWeight="400"
                          fill="#FFFFFF"
                        >
                          Art.
                        </text>
                      </mask>
                    </defs>
                    {/* Fill text with stippled dot pattern */}
                    <rect
                      x="0"
                      y="0"
                      width="320"
                      height="160"
                      fill="url(#stipple-dots)"
                      mask="url(#art-mask)"
                    />
                  </svg>
                </div>

                {/* Main Headline */}
                <h1 className="mockup-headline">
                  Explore the expressions
                  <br />
                  of creativity!
                </h1>

                {/* Link */}
                <a
                  href="#shop-catalogue"
                  onClick={scrollToShop}
                  className="mockup-explore-link"
                >
                  Explore Collections
                </a>
              </div>

              {/* Right Group: Signature Artwork Collage Triptych */}
              <div className="mockup-right-group">
                {/* Background Concentric Radar Rings */}
                <div className="mockup-concentric-circles" aria-hidden="true">
                  <svg viewBox="0 0 280 280" fill="none" stroke="#B8C8D2" strokeWidth="1">
                    <circle cx="140" cy="140" r="40" strokeDasharray="3 3" opacity="0.7" />
                    <circle cx="140" cy="140" r="75" opacity="0.6" />
                    <circle cx="140" cy="140" r="115" strokeDasharray="4 4" opacity="0.45" />
                    <line x1="140" y1="20" x2="140" y2="260" opacity="0.35" />
                    <line x1="20" y1="140" x2="260" y2="140" opacity="0.35" />
                  </svg>
                </div>

                <div className="mockup-collage-stage">
                  {/* 1. Small Terracotta Wedge / Triangle Pointer */}
                  <div className="mockup-pointer-triangle" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <polygon points="4,2 20,12 4,22" fill="#935742" />
                    </svg>
                  </div>

                  {/* 2. Left Narrow Strip (Harmattan Procession) */}
                  <Link
                    href="/products/harmattan-procession"
                    className="mockup-strip strip-left"
                    title="Harmattan Procession — Amina E. Adeleke"
                  >
                    <Image
                      src="/images/catalogue/harmattan-procession.jpg"
                      alt="Harmattan Procession"
                      fill
                      sizes="80px"
                      style={{ objectFit: "cover" }}
                      priority
                    />
                    <div className="strip-hover-curtain">
                      <span>View</span>
                    </div>
                  </Link>

                  {/* 3. Center Column (Semicircle Arch Top + Rectangular Strip Bottom) */}
                  <div className="mockup-center-column">
                    {/* Arch Top */}
                    <Link
                      href="/products/ancestral-geometry-i"
                      className="mockup-arch-top"
                      title="Ancestral Geometry — Kofi Mensah"
                    >
                      <Image
                        src="/images/catalogue/ancestral-geometry.jpg"
                        alt="Ancestral Geometry"
                        fill
                        sizes="130px"
                        style={{ objectFit: "cover" }}
                        priority
                      />
                      <div className="strip-hover-curtain">
                        <span>View</span>
                      </div>
                    </Link>

                    {/* Strip Bottom */}
                    <Link
                      href="/products/market-women-at-dusk"
                      className="mockup-strip strip-center-bottom"
                      title="Market Women at Dusk — Amina E. Adeleke"
                    >
                      <Image
                        src="/images/catalogue/market-women-at-dusk.jpg"
                        alt="Market Women at Dusk"
                        fill
                        sizes="130px"
                        style={{ objectFit: "cover" }}
                        priority
                      />
                      <div className="strip-hover-curtain">
                        <span>View</span>
                      </div>
                    </Link>
                  </div>

                  {/* 4. Deep Teal / Slate Column Silhouette */}
                  <div className="mockup-teal-pillar" aria-hidden="true" />

                  {/* 5. Right Signature Tall Strip (Indigo Tide & Swimming Terracotta Fish) */}
                  <Link
                    href="/products/indigo-tide-evening-lantern"
                    className="mockup-strip strip-right"
                    title="Indigo Tide & The Evening Lantern — Tariq Osei"
                  >
                    <Image
                      src="/images/catalogue/indigo-tide.jpg"
                      alt="Indigo Tide & The Evening Lantern"
                      fill
                      sizes="150px"
                      style={{ objectFit: "cover" }}
                      priority
                    />
                    <div className="strip-hover-curtain">
                      <span>View</span>
                    </div>
                  </Link>
                </div>

                {/* Vertical Label "Sculpture" on the far right */}
                <div className="mockup-vertical-tag" aria-hidden="true">
                  <span className="tag-text">Sculpture</span>
                  <div className="tag-pin">
                    <span className="tag-line" />
                    <span className="tag-circle" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── 4. BOTTOM INTERACTION INDICATOR ─── */}
      <div className="mockup-bottom-hint">
        <a href="#shop-catalogue" onClick={scrollToShop} className="mockup-scroll-badge">
          <span>Explore Warmthplace Art House & Gallery Store</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </a>
      </div>
    </section>
  );
}
