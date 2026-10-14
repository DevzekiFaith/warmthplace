"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export function HeroArtworkCollage() {
  return (
    <section className="hero-wrapper" aria-label="Hero Showcase">
      {/* Split Backdrop Canvas */}
      <div className="hero-split-backdrop" aria-hidden="true">
        <div className="hero-backdrop-left" />
        <div className="hero-backdrop-right" />
      </div>

      {/* Atmospheric Watercolor Wash behind the watermark */}
      <div className="hero-watermark-wash" aria-hidden="true" />

      {/* Grand Typographic Watermark "Art." matching the reference */}
      <div className="hero-watermark-art" aria-hidden="true">
        Art.
      </div>

      {/* Decorative Wireframe Isometric Geometric Shapes from the reference */}
      <svg
        className="hero-wireframe-cube"
        viewBox="0 0 100 100"
        fill="none"
        stroke="#24221E"
        strokeWidth="1.2"
        aria-hidden="true"
      >
        {/* Impossible Triangle / Penrose & Isometric Cube motif */}
        <path d="M50 15L85 35V75L50 95L15 75V35Z" strokeDasharray="3 3" />
        <path d="M50 15V55L85 75" />
        <path d="M15 75L50 55" />
        <circle cx="50" cy="55" r="4" fill="#A64B32" fillOpacity="0.4" />
      </svg>

      <svg
        className="hero-wireframe-prism"
        viewBox="0 0 120 120"
        fill="none"
        stroke="#24221E"
        strokeWidth="1"
        aria-hidden="true"
      >
        <polygon points="60,10 110,100 10,100" strokeDasharray="2 2" />
        <line x1="60" y1="10" x2="60" y2="100" />
        <line x1="10" y1="100" x2="85" y2="55" />
        <line x1="110" y1="100" x2="35" y2="55" />
      </svg>

      {/* Concentric ripples in the olive field */}
      <svg
        className="hero-concentric-circles"
        viewBox="0 0 200 200"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1"
        aria-hidden="true"
      >
        <circle cx="100" cy="100" r="30" strokeDasharray="2 3" />
        <circle cx="100" cy="100" r="60" strokeDasharray="3 4" />
        <circle cx="100" cy="100" r="90" strokeDasharray="4 6" />
        <line x1="100" y1="10" x2="100" y2="190" strokeOpacity="0.3" />
        <line x1="10" y1="100" x2="190" y2="100" strokeOpacity="0.3" />
      </svg>

      {/* Main Container Content */}
      <div className="container" style={{ position: "relative", zIndex: 10 }}>
        <div className="hero-content-grid">
          {/* Left Editorial Copy Column */}
          <div className="hero-copy-column">
            <span className="kicker">
              African Art • Contemporary Living • Enduring Stories
            </span>
            <h1 className="hero-editorial-heading">
              Explore the expressions of <em>creativity!</em>
            </h1>
            <p className="hero-supporting-text">
              Warmthplace Art Studio curates museum-calibre original canvases,
              sculptural earthenware, and handwoven textiles from celebrated
              West African artists. Crafted for distinctive domestic architecture
              and global collectors.
            </p>

            <div className="hero-cta-group">
              <Link href="/shop/art" className="btn btn-primary">
                Explore Artworks
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>

              <Link href="/collections" className="btn btn-secondary">
                View Collections
              </Link>
            </div>

            {/* Quick Micro Pathways */}
            <div
              style={{
                display: "flex",
                gap: "1.5rem",
                marginTop: "2.5rem",
                paddingTop: "1.5rem",
                borderTop: "1px solid var(--border-subtle)",
              }}
            >
              <div>
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.6rem",
                    fontWeight: 500,
                    lineHeight: 1,
                    color: "var(--color-ink-charcoal)",
                  }}
                >
                  100%
                </span>
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--color-ink-light)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  Verified Provenance
                </span>
              </div>
              <div style={{ width: "1px", backgroundColor: "var(--border-subtle)" }} />
              <div>
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.6rem",
                    fontWeight: 500,
                    lineHeight: 1,
                    color: "var(--color-ink-charcoal)",
                  }}
                >
                  Global
                </span>
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--color-ink-light)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  Insured Art Freight
                </span>
              </div>
              <div style={{ width: "1px", backgroundColor: "var(--border-subtle)" }} />
              <div>
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.6rem",
                    fontWeight: 500,
                    lineHeight: 1,
                    color: "var(--color-ink-charcoal)",
                  }}
                >
                  Lagos
                </span>
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--color-ink-light)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  Studio & Gallery House
                </span>
              </div>
            </div>
          </div>

          {/* Right Triptych Composition — The signature feature of the user's reference! */}
          <div className="hero-collage-column">
            <div className="triptych-stage">
              {/* Strip 1: Left narrow vertical slice (Harmattan Procession) */}
              <div className="triptych-strip-left">
                <Image
                  src="/images/catalogue/harmattan-procession.jpg"
                  alt="Harmattan Procession by Amina E. Adeleke"
                  fill
                  sizes="(max-width: 768px) 60px, 80px"
                  style={{ objectFit: "cover" }}
                  priority
                />
                <Link
                  href="/products/harmattan-procession"
                  className="triptych-link-overlay"
                  title="View Harmattan Procession"
                >
                  Harmattan
                </Link>
              </div>

              {/* Strip 2 & Arch: Center column */}
              <div className="triptych-column-center">
                {/* Semicircular arch cutout at top */}
                <div className="triptych-arch-top">
                  <Image
                    src="/images/catalogue/ancestral-geometry.jpg"
                    alt="Ancestral Geometry by Kofi Mensah"
                    fill
                    sizes="(max-width: 768px) 100px, 140px"
                    style={{ objectFit: "cover" }}
                    priority
                  />
                  <Link
                    href="/products/ancestral-geometry-i"
                    className="triptych-link-overlay"
                    title="View Ancestral Geometry"
                  >
                    Geometry
                  </Link>
                </div>

                {/* Vertical strip below arch (Market Women at Dusk) */}
                <div className="triptych-strip-center">
                  <Image
                    src="/images/catalogue/market-women-at-dusk.jpg"
                    alt="Market Women at Dusk by Amina E. Adeleke"
                    fill
                    sizes="(max-width: 768px) 120px, 160px"
                    style={{ objectFit: "cover" }}
                    priority
                  />
                  <Link
                    href="/products/market-women-at-dusk"
                    className="triptych-link-overlay"
                    title="View Market Women at Dusk"
                  >
                    At Dusk
                  </Link>
                </div>
              </div>

              {/* Strip 3: Right tall slate-indigo strip (Indigo Tide & Evening Lantern) */}
              <div className="triptych-strip-right">
                <Image
                  src="/images/catalogue/indigo-tide.jpg"
                  alt="Indigo Tide & The Evening Lantern by Nkem Agbo"
                  fill
                  sizes="(max-width: 768px) 120px, 180px"
                  style={{ objectFit: "cover" }}
                  priority
                />
                <Link
                  href="/products/indigo-tide-evening-lantern"
                  className="triptych-link-overlay"
                  title="View Indigo Tide & The Evening Lantern"
                >
                  Indigo Tide
                </Link>
              </div>

              {/* Geometric triangle arrow accent between strips pointing right */}
              <div className="triptych-triangle-arrow" aria-hidden="true" />
            </div>

            {/* Vertical typography caption on far right */}
            <div className="hero-vertical-caption" aria-hidden="true">
              Contemporary African Art & Living Objects
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
