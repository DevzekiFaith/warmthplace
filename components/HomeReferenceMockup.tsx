"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * HeroSlideData defines each slide in the signature triptych collage.
 * You can add new slides here anytime — each slide automatically uses
 * the exact same geometric layout (left strip, center arch, center bottom, right strip).
 */
export interface HeroSlideData {
  id: string;
  tag: string;
  watermark: string;
  headline: {
    line1: string;
    line2: string;
  };
  exploreText: string;
  exploreHref: string;
  leftStrip: {
    src: string;
    alt: string;
    title: string;
    href: string;
  };
  centerArch: {
    src: string;
    alt: string;
    title: string;
    href: string;
  };
  centerBottom: {
    src: string;
    alt: string;
    title: string;
    href: string;
  };
  rightStrip: {
    src: string;
    alt: string;
    title: string;
    href: string;
  };
}

export const HERO_SLIDES: HeroSlideData[] = [
  {
    id: "gallery-fine-art",
    tag: "Fine Art",
    watermark: "Art.",
    headline: {
      line1: "Explore the expressions",
      line2: "of creativity!",
    },
    exploreText: "Explore Collections",
    exploreHref: "#shop-catalogue",
    leftStrip: {
      src: "/images/catalogue/harmattan-procession.jpg",
      alt: "Harmattan Procession",
      title: "Harmattan Procession — Nkem Agbo",
      href: "/products/harmattan-procession",
    },
    centerArch: {
      src: "/images/catalogue/ancestral-geometry.jpg",
      alt: "Ancestral Geometry",
      title: "Ancestral Geometry — Nkem Agbo",
      href: "/products/ancestral-geometry-i",
    },
    centerBottom: {
      src: "/images/catalogue/market-women-at-dusk.jpg",
      alt: "Market Women at Dusk",
      title: "Market Women at Dusk — Nkem Agbo",
      href: "/products/market-women-at-dusk",
    },
    rightStrip: {
      src: "/images/catalogue/indigo-tide.jpg",
      alt: "Ceremonial Rhythm: The Emerald Drummer",
      title: "Ceremonial Rhythm: The Emerald Drummer — Nkem Agbo",
      href: "/products/indigo-tide-evening-lantern",
    },
  },
  {
    id: "golden-harvest-expression",
    tag: "Originals",
    watermark: "Harvest.",
    headline: {
      line1: "Vibrant rhythms.",
      line2: "Living expressions.",
    },
    exploreText: "Discover Original Canvases",
    exploreHref: "/shop/art",
    leftStrip: {
      src: "/images/hero/artwork-abstract-canvas.jpg",
      alt: "Canopy & Grace: Royal Gazelles at Twilight",
      title: "Canopy & Grace: Royal Gazelles at Twilight — Nkem Agbo",
      href: "/products/chromatic-field-impasto",
    },
    centerArch: {
      src: "/images/catalogue/golden-harvest-matriarchs.jpg",
      alt: "Golden Harvest of the Matriarchs",
      title: "Golden Harvest of the Matriarchs — Nkem Agbo",
      href: "/products/golden-harvest-matriarchs",
    },
    centerBottom: {
      src: "/images/catalogue/golden-harvest-matriarchs-room.jpg",
      alt: "Golden Harvest in Contemporary Living Space",
      title: "Golden Harvest of the Matriarchs in Curated Interior",
      href: "/products/golden-harvest-matriarchs",
    },
    rightStrip: {
      src: "/images/hero/hero-african-drummers.jpg",
      alt: "Ceremonial African Drummers & Dancers in-situ room interior",
      title: "Ceremonial Drummers — In-Situ Room Setting",
      href: "/products/ceremonial-african-drummers",
    },
  },
  {
    id: "living-spaces-tradition",
    tag: "Curated",
    watermark: "Form.",
    headline: {
      line1: "Transformative art for",
      line2: "distinctive spaces.",
    },
    exploreText: "Explore Curated Living",
    exploreHref: "/shop/decor",
    leftStrip: {
      src: "/images/hero/hero-african-drummers.jpg",
      alt: "Ceremonial Drummers in Sunlit Hearth",
      title: "Ceremonial Drummers in Contemporary Living Room",
      href: "/products/ceremonial-african-drummers",
    },
    centerArch: {
      src: "/images/catalogue/incised-terracotta-vessel.jpg",
      alt: "Handcrafted Incised Terracotta Vessel",
      title: "Incised Terracotta Vessel — Master Potter",
      href: "/products/incised-terracotta-vessel",
    },
    centerBottom: {
      src: "/images/hero/artwork-abstract-canvas.jpg",
      alt: "Canopy & Grace: Royal Gazelles at Twilight",
      title: "Canopy & Grace: Royal Gazelles at Twilight — Nkem Agbo",
      href: "/products/chromatic-field-impasto",
    },
    rightStrip: {
      src: "/images/hero/hero-abstract-canvas.jpg",
      alt: "Canopy & Grace: Royal Gazelles at Twilight in Contemporary Living Space",
      title: "Canopy & Grace: Royal Gazelles at Twilight in Curated Interior",
      href: "/products/chromatic-field-impasto",
    },
  },
];

interface HomeReferenceMockupProps {
  onScrollToCatalogue?: () => void;
}

export function HomeReferenceMockup({ onScrollToCatalogue }: HomeReferenceMockupProps) {
  const [activeBrandName, setActiveBrandName] = useState<"PORT_MUZIRIS" | "WARMTHPLACE">("WARMTHPLACE");
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const autoSlideTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isHoveredRef = useRef(false);

  const totalSlides = HERO_SLIDES.length;
  const currentSlide = HERO_SLIDES[currentSlideIndex];

  const changeSlide = useCallback(
    (newIndex: number) => {
      if (isFading) return;
      setIsFading(true);
      setTimeout(() => {
        setCurrentSlideIndex(newIndex);
        setIsFading(false);
      }, 260);
    },
    [isFading]
  );

  const nextSlide = useCallback(() => {
    const nextIndex = (currentSlideIndex + 1) % totalSlides;
    changeSlide(nextIndex);
  }, [currentSlideIndex, totalSlides, changeSlide]);

  const prevSlide = useCallback(() => {
    const prevIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
    changeSlide(prevIndex);
  }, [currentSlideIndex, totalSlides, changeSlide]);

  // Auto-advance slider every 6.5s unless hovered
  useEffect(() => {
    const startTimer = () => {
      autoSlideTimerRef.current = setInterval(() => {
        if (!isHoveredRef.current) {
          nextSlide();
        }
      }, 6500);
    };

    startTimer();
    return () => {
      if (autoSlideTimerRef.current) clearInterval(autoSlideTimerRef.current);
    };
  }, [nextSlide]);

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
          <polygon points="60,10 105,36 105,88 60,114 15,88 15,36" opacity="0.32" />
          <line x1="60" y1="62" x2="60" y2="10" opacity="0.38" />
          <line x1="60" y1="62" x2="105" y2="88" opacity="0.38" />
          <line x1="60" y1="62" x2="15" y2="88" opacity="0.38" />
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
      <div
        className="mockup-bezel-wrapper"
        onMouseEnter={() => {
          isHoveredRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
        }}
      >
        <div className="mockup-bezel">
          {/* Inner Screen Surface */}
          <div className="mockup-screen">
            {/* Header: Official Warmthplace Emblem + Responsive Menu */}
            <header className="mockup-screen-header">
              {/* Brand Logo Cluster */}
              <div
                className="mockup-logo-cluster"
                onClick={() =>
                  setActiveBrandName((prev) =>
                    prev === "PORT_MUZIRIS" ? "WARMTHPLACE" : "PORT_MUZIRIS"
                  )
                }
                title="Click to toggle reference title"
                role="button"
                tabIndex={0}
              >
                <div className="mockup-emblem-icon-wrap">
                  <Image
                    src="/images/brand/warmthplace-emblem-circle.png"
                    alt="Warmthplace Arts Emblem"
                    width={34}
                    height={34}
                    className="brand-emblem-img"
                  />
                </div>

                <div className="mockup-brand-typography">
                  <span className="mockup-brand-line">
                    {activeBrandName === "PORT_MUZIRIS" ? "PORT MUZIRIS" : "WARMTHPLACE"}
                  </span>
                  <span className="mockup-brand-subline">ARTS</span>
                </div>
              </div>

              {/* Navigation Items (Responsive & Art-Studio Aligned) */}
              <nav className="mockup-screen-nav" aria-label="Reference Navigation">
                <Link href="/" className="mockup-nav-item active">
                  Home
                </Link>
                <Link href="/shop/art" className="mockup-nav-item">
                  Art
                </Link>
                <Link href="/shop/decor" className="mockup-nav-item">
                  Home Décor
                </Link>
                <Link href="/collections" className="mockup-nav-item">
                  Collections
                </Link>
                <Link href="/artists" className="mockup-nav-item">
                  Artists
                </Link>
                <Link href="/about" className="mockup-nav-item">
                  About
                </Link>
                <Link href="/contact" className="mockup-nav-item">
                  Contact
                </Link>
              </nav>
            </header>

            {/* Screen Hero Body with Dynamic Content */}
            <div className={`mockup-hero-body${isFading ? " is-transitioning" : ""}`}>
              {/* Left Group: Watercolor Wash, Watermark, Headline, Link */}
              <div className="mockup-left-group">
                {/* Translucent Sky-Blue Watercolor Splash */}
                <div className="mockup-watercolor-splash" aria-hidden="true" suppressHydrationWarning>
                  <svg viewBox="0 0 400 180" fill="none" className="watercolor-svg" suppressHydrationWarning>
                    <defs>
                      <filter id="watercolor-blur" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="14" />
                      </filter>
                      <linearGradient id="watercolor-grad" x1="0%" y1="0%" x2="100%" y2="50%" suppressHydrationWarning>
                        <stop offset="0%" stopColor="#C4DCED" stopOpacity="0.82" />
                        <stop offset="55%" stopColor="#9AC0DC" stopOpacity="0.65" />
                        <stop offset="100%" stopColor="#D5E5F2" stopOpacity="0.25" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M20 95 C 10 40, 90 20, 160 35 C 230 15, 330 30, 370 70 C 400 110, 340 145, 270 155 C 200 170, 110 150, 60 140 C 25 130, 15 110, 20 95 Z"
                      fill="url(#watercolor-grad)"
                      filter="url(#watercolor-blur)"
                    />
                  </svg>
                </div>

                {/* Stippled / Halftone Dynamic Watermark */}
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
                          {currentSlide.watermark}
                        </text>
                      </mask>
                    </defs>
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
                  {currentSlide.headline.line1}
                  <br />
                  {currentSlide.headline.line2}
                </h1>

                {/* Explore Link */}
                <a
                  href={currentSlide.exploreHref}
                  onClick={currentSlide.exploreHref.startsWith("#") ? scrollToShop : undefined}
                  className="mockup-explore-link"
                >
                  {currentSlide.exploreText}
                </a>

                {/* Slider Pagination Controls (Left Subtitle Group) */}
                <div className="mockup-slider-meta">
                  <span className="mockup-slide-counter">
                    0{currentSlideIndex + 1} <span className="counter-sep">/</span> 0{totalSlides}
                  </span>
                  <div className="mockup-slide-pills">
                    {HERO_SLIDES.map((slide, idx) => (
                      <button
                        key={slide.id}
                        type="button"
                        onClick={() => changeSlide(idx)}
                        className={`mockup-slide-pill${idx === currentSlideIndex ? " active" : ""}`}
                        aria-label={`Jump to artwork slide ${idx + 1}`}
                        title={slide.tag}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Group: Signature Artwork Collage Triptych + Interactive Arrow Slider */}
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
                  {/* ─── 1. INTERACTIVE TERRACOTTA SLIDER ARROW CONTROLLER ─── */}
                  <div className="mockup-slider-trigger-cluster">
                    {/* Previous Button (Faded wedge) */}
                    <button
                      type="button"
                      onClick={prevSlide}
                      className="mockup-pointer-btn mockup-prev-arrow"
                      aria-label="Previous artwork set"
                      title="Previous artwork set"
                    >
                      <svg viewBox="0 0 24 24" fill="none" className="wedge-svg">
                        <polygon points="20,2 4,12 20,22" fill="#935742" />
                      </svg>
                    </button>

                    {/* Primary Terracotta Pointer Wedge (Click to Advance Slide) */}
                    <button
                      type="button"
                      onClick={nextSlide}
                      className="mockup-pointer-btn mockup-next-arrow"
                      aria-label="Next artwork set"
                      title="Click to slide to next artworks"
                    >
                      <svg viewBox="0 0 24 24" fill="none" className="wedge-svg primary-wedge">
                        <polygon points="4,2 20,12 4,22" fill="#935742" />
                      </svg>
                      <span className="wedge-pulse-ring" aria-hidden="true" />
                    </button>
                  </div>

                  {/* ─── 2. Left Narrow Strip ─── */}
                  <Link
                    href={currentSlide.leftStrip.href}
                    className="mockup-strip strip-left"
                    title={currentSlide.leftStrip.title}
                  >
                    <Image
                      key={`left-${currentSlide.leftStrip.src}`}
                      src={currentSlide.leftStrip.src}
                      alt={currentSlide.leftStrip.alt}
                      fill
                      sizes="90px"
                      style={{ objectFit: "cover" }}
                      priority
                      loading="eager"
                      className="mockup-slide-img"
                    />
                    <div className="strip-hover-curtain">
                      <span>View</span>
                    </div>
                  </Link>

                  {/* ─── 3. Center Column (Semicircle Arch Top + Rectangular Strip Bottom) ─── */}
                  <div className="mockup-center-column">
                    {/* Arch Top */}
                    <Link
                      href={currentSlide.centerArch.href}
                      className="mockup-arch-top"
                      title={currentSlide.centerArch.title}
                    >
                      <Image
                        key={`arch-${currentSlide.centerArch.src}`}
                        src={currentSlide.centerArch.src}
                        alt={currentSlide.centerArch.alt}
                        fill
                        sizes="140px"
                        style={{ objectFit: "cover" }}
                        priority
                        loading="eager"
                        className="mockup-slide-img"
                      />
                      <div className="strip-hover-curtain">
                        <span>View</span>
                      </div>
                    </Link>

                    {/* Strip Bottom */}
                    <Link
                      href={currentSlide.centerBottom.href}
                      className="mockup-strip strip-center-bottom"
                      title={currentSlide.centerBottom.title}
                    >
                      <Image
                        key={`bottom-${currentSlide.centerBottom.src}`}
                        src={currentSlide.centerBottom.src}
                        alt={currentSlide.centerBottom.alt}
                        fill
                        sizes="140px"
                        style={{ objectFit: "cover" }}
                        priority
                        loading="eager"
                        className="mockup-slide-img"
                      />
                      <div className="strip-hover-curtain">
                        <span>View</span>
                      </div>
                    </Link>
                  </div>

                  {/* ─── 4. Deep Teal / Slate Column Silhouette ─── */}
                  <div className="mockup-teal-pillar" aria-hidden="true" />

                  {/* ─── 5. Right Signature Tall Strip ─── */}
                  <Link
                    href={currentSlide.rightStrip.href}
                    className="mockup-strip strip-right"
                    title={currentSlide.rightStrip.title}
                  >
                    <Image
                      key={`right-${currentSlide.rightStrip.src}`}
                      src={currentSlide.rightStrip.src}
                      alt={currentSlide.rightStrip.alt}
                      fill
                      sizes="160px"
                      style={{ objectFit: "cover" }}
                      priority
                      loading="eager"
                      className="mockup-slide-img"
                    />
                    <div className="strip-hover-curtain">
                      <span>View</span>
                    </div>
                  </Link>
                </div>

                {/* Vertical Label dynamically reflecting slide tag on the far right */}
                <div className="mockup-vertical-tag" aria-hidden="true">
                  <span className="tag-text">{currentSlide.tag}</span>
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
