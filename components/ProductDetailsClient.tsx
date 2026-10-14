"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartContext";
import { useCurrency } from "@/components/CurrencyContext";
import { ImageZoom } from "@/components/ImageZoom";
import { EnquiryModal } from "@/components/EnquiryModal";
import { RoomScaleVisualizer } from "@/components/RoomScaleVisualizer";
import { ArtTearSheetModal } from "@/components/ArtTearSheetModal";
import { EstimatedDeliveryBox } from "@/components/EstimatedDeliveryBox";
import { BASE_CURRENCY } from "@/lib/constants";
import { formatPrice } from "@/lib/currency";

export interface ProductProps {
  product: {
    id: string;
    slug: string;
    title: string;
    department: string;
    category: string;
    productType: string;
    editionSize?: number | null;
    description: string;
    medium?: string | null;
    materials?: string | null;
    year?: number | null;
    widthCm?: number | null;
    heightCm?: number | null;
    depthCm?: number | null;
    weightKg?: number | null;
    orientation?: string | null;
    price: number;
    currency: string;
    stock: number;
    enquiryOnly: boolean;
    shippingClass: string;
    artist?: {
      name: string;
      slug: string;
      discipline: string;
      location?: string | null;
    } | null;
    images: {
      url: string;
      alt: string;
    }[];
  };
}

export function ProductDetailsClient({ product }: ProductProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [scaleVisualizerOpen, setScaleVisualizerOpen] = useState(false);
  const [tearSheetOpen, setTearSheetOpen] = useState(false);
  const [selectedFrame, setSelectedFrame] = useState<"Natural Oak" | "Obsidian Black" | "Champagne Gold" | "Frameless Gallery Wrap">("Natural Oak");
  const [viewMode, setViewMode] = useState<"canvas" | "gallery">("canvas");
  const [isSaved, setIsSaved] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const { addItem } = useCart();
  const { format, currency } = useCurrency();

  const isArt = product.department === "ART";

  // Dimensions math
  const w = product.widthCm || 120;
  const h = product.heightCm || 100;
  const d = product.depthCm || 5;
  const wIn = (w * 0.393701).toFixed(1);
  const hIn = (h * 0.393701).toFixed(1);
  const dIn = (d * 0.393701).toFixed(1);
  const weightLbs = ((product.weightKg || 7.5) * 2.20462).toFixed(1);

  // Determine current image depending on view mode
  // If product has 2 images and gallery mode is selected, show image[1] (room view)
  const roomImage = product.images.length > 1 ? product.images[1] : null;
  const canvasImage = product.images[0] || {
    url: "/images/catalogue/harmattan-procession.jpg",
    alt: product.title,
  };

  const currentImage =
    viewMode === "gallery" && roomImage
      ? roomImage
      : product.images[selectedImageIndex] || canvasImage;

  const handleAddToCart = () => {
    addItem(
      {
        id: product.id,
        slug: product.slug,
        title: product.title,
        artistName: product.artist?.name || null,
        department: product.department,
        category: product.category,
        productType: product.productType,
        price: product.price,
        currency: product.currency,
        imageUrl: canvasImage.url,
        imageAlt: canvasImage.alt,
        stock: product.stock,
        shippingClass: product.shippingClass,
      },
      quantity
    );
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2400);
    }
  };

  const handleToggleSave = () => {
    setIsSaved(!isSaved);
  };

  // Frame preview style
  const getFramePreviewStyle = () => {
    if (viewMode === "gallery") return {};
    switch (selectedFrame) {
      case "Obsidian Black":
        return {
          border: "10px solid #1A1A1A",
          boxShadow: "0 18px 40px rgba(0,0,0,0.28), inset 0 0 0 2px rgba(255,255,255,0.08)",
        };
      case "Champagne Gold":
        return {
          border: "10px solid #C5A059",
          boxShadow: "0 18px 40px rgba(0,0,0,0.22), 0 0 12px rgba(197, 160, 89, 0.25)",
        };
      case "Frameless Gallery Wrap":
        return {
          border: "none",
          boxShadow: "0 16px 36px rgba(0,0,0,0.24)",
        };
      case "Natural Oak":
      default:
        return {
          border: "10px solid #C4A47C",
          boxShadow: "0 18px 40px rgba(0,0,0,0.24), 0 4px 12px rgba(0,0,0,0.12)",
        };
    }
  };

  const isOutOfStock = product.stock <= 0;

  return (
    <>
      <div className="pdp-grid">
        {/* =========================================================
            LEFT COLUMN: GALLERY & ARCHITECTURAL VIEW MODES
           ========================================================= */}
        <div className="pdp-gallery-container">
          {/* View Mode Switcher: Studio Canvas vs. Gallery Display vs. Room Scale */}
          {isArt && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.85rem",
                padding: "0.35rem 0.5rem",
                backgroundColor: "var(--color-canvas-pure)",
                borderRadius: "3px",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <div style={{ display: "flex", gap: "0.35rem" }}>
                <button
                  type="button"
                  onClick={() => setViewMode("canvas")}
                  style={{
                    padding: "0.4rem 0.85rem",
                    fontSize: "0.76rem",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    borderRadius: "2px",
                    border: viewMode === "canvas" ? "1px solid var(--color-ink-charcoal)" : "1px solid transparent",
                    backgroundColor: viewMode === "canvas" ? "var(--color-ink-charcoal)" : "transparent",
                    color: viewMode === "canvas" ? "#FFFFFF" : "var(--color-ink-muted)",
                    transition: "all var(--transition-fast)",
                  }}
                >
                  🖼️ Studio Canvas
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode("gallery")}
                  style={{
                    padding: "0.4rem 0.85rem",
                    fontSize: "0.76rem",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    borderRadius: "2px",
                    border: viewMode === "gallery" ? "1px solid var(--color-ink-charcoal)" : "1px solid transparent",
                    backgroundColor: viewMode === "gallery" ? "var(--color-ink-charcoal)" : "transparent",
                    color: viewMode === "gallery" ? "#FFFFFF" : "var(--color-ink-muted)",
                    transition: "all var(--transition-fast)",
                  }}
                >
                  🏛️ Gallery Display
                </button>
              </div>

              <button
                type="button"
                onClick={() => setScaleVisualizerOpen(true)}
                style={{
                  fontSize: "0.76rem",
                  fontWeight: 600,
                  color: "var(--color-terracotta)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  padding: "0.4rem 0.65rem",
                  borderRadius: "2px",
                  border: "1px dashed var(--color-terracotta)",
                  backgroundColor: "rgba(166, 75, 50, 0.05)",
                }}
              >
                📐 View in Room (Scale)
              </button>
            </div>
          )}

          {/* Interactive Image Frame with Badges */}
          <div
            style={{
              position: "relative",
              borderRadius: "3px",
              overflow: "hidden",
              transition: "all 0.3s ease",
              ...getFramePreviewStyle(),
            }}
          >
            {/* Top Badge Overlay */}
            <div
              style={{
                position: "absolute",
                top: "1rem",
                left: "1rem",
                zIndex: 4,
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
                pointerEvents: "none",
              }}
            >
              {viewMode === "gallery" ? (
                <span
                  style={{
                    backgroundColor: "rgba(36, 34, 30, 0.88)",
                    backdropFilter: "blur(6px)",
                    color: "#FFFFFF",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    padding: "0.35rem 0.75rem",
                    borderRadius: "2px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  }}
                >
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#C5A059" }} />
                  Gallery Display
                </span>
              ) : (
                <span
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.92)",
                    backdropFilter: "blur(6px)",
                    color: "var(--color-ink-charcoal)",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    padding: "0.35rem 0.75rem",
                    borderRadius: "2px",
                    border: "1px solid var(--border-subtle)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  }}
                >
                  Original Canvas • Impasto
                </span>
              )}
            </div>

            {/* Quick Pin / Save Button overlay */}
            <button
              type="button"
              onClick={handleToggleSave}
              aria-label={isSaved ? "Saved to your collection" : "Save to collection"}
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                zIndex: 4,
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                backgroundColor: isSaved ? "var(--color-terracotta)" : "rgba(255, 255, 255, 0.92)",
                backdropFilter: "blur(6px)",
                color: isSaved ? "#FFFFFF" : "var(--color-ink-charcoal)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.1rem",
                border: "1px solid var(--border-subtle)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                transition: "all var(--transition-fast)",
              }}
              title={isSaved ? "Saved to your collection" : "Save / Pin Artwork"}
            >
              {isSaved ? "♥" : "♡"}
            </button>

            {/* In-Situ Gallery Stage simulation if gallery mode & no secondary room photo */}
            {viewMode === "gallery" && !roomImage ? (
              <div
                style={{
                  position: "relative",
                  aspectRatio: "3 / 4",
                  backgroundColor: "#EBE7DF",
                  backgroundImage: "radial-gradient(circle at 50% 25%, #FFFFFF 0%, #EBE7DF 80%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "2rem",
                }}
              >
                {/* Overhead spotlight beam */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "360px",
                    height: "220px",
                    background: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 70%)",
                    pointerEvents: "none",
                  }}
                />

                {/* Framed Canvas on Gallery Wall */}
                <div
                  style={{
                    position: "relative",
                    width: "82%",
                    aspectRatio: `${w} / ${h}`,
                    ...getFramePreviewStyle(),
                    borderRadius: "2px",
                    overflow: "hidden",
                    marginBottom: "38px",
                  }}
                >
                  <Image
                    src={canvasImage.url}
                    alt={canvasImage.alt}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>

                {/* Stone Plinth Bench on floor (like the Pinterest reference!) */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "22px",
                    width: "75%",
                    height: "18px",
                    backgroundColor: "#D6D0C5",
                    borderRadius: "1px",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.12), inset 0 1px 1px rgba(255,255,255,0.4)",
                    border: "1px solid #BFB8AC",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "8px",
                    fontSize: "0.68rem",
                    color: "#8A857B",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  Gallery Architectural Setting
                </div>
              </div>
            ) : (
              <ImageZoom src={currentImage.url} alt={currentImage.alt} />
            )}
          </div>

          {/* Thumbnail switcher if multiple images */}
          {product.images.length > 1 && (
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
              {product.images.map((img, idx) => (
                <button
                  key={img.url}
                  type="button"
                  onClick={() => {
                    setSelectedImageIndex(idx);
                    setViewMode(idx === 1 ? "gallery" : "canvas");
                  }}
                  style={{
                    width: "82px",
                    height: "100px",
                    position: "relative",
                    borderRadius: "2px",
                    overflow: "hidden",
                    border:
                      selectedImageIndex === idx
                        ? "2px solid var(--color-ink-charcoal)"
                        : "1px solid var(--border-medium)",
                    boxShadow: selectedImageIndex === idx ? "0 4px 12px rgba(0,0,0,0.1)" : "none",
                  }}
                  aria-label={`View perspective ${idx + 1}`}
                >
                  <Image
                    src={img.url}
                    alt={img.alt}
                    fill
                    sizes="82px"
                    style={{ objectFit: "cover" }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      backgroundColor: "rgba(0,0,0,0.65)",
                      color: "#FFFFFF",
                      fontSize: "0.62rem",
                      textAlign: "center",
                      padding: "2px 0",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                    }}
                  >
                    {idx === 0 ? "Canvas" : "In Situ"}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Quick utility strip below image */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "1.25rem",
              padding: "0.75rem 1rem",
              backgroundColor: "var(--color-canvas-pure)",
              borderRadius: "3px",
              border: "1px solid var(--border-subtle)",
              fontSize: "0.82rem",
            }}
          >
            <div style={{ display: "flex", gap: "1rem", color: "var(--color-ink-muted)" }}>
              <span>🔍 <strong>Roll hover</strong> to magnify texture</span>
              <span>•</span>
              <span>✨ <strong>Hand-signed</strong> original</span>
            </div>
            <button
              type="button"
              onClick={() => setScaleVisualizerOpen(true)}
              className="btn-text"
              style={{ fontSize: "0.78rem" }}
            >
              Scale Guide →
            </button>
          </div>
        </div>

        {/* =========================================================
            RIGHT COLUMN: THE ART DETAIL PANEL & CURATORIAL SPECS
           ========================================================= */}
        <div>
          {/* Breadcrumb path & Catalog Ref */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: "0.85rem",
              flexWrap: "wrap",
              gap: "0.5rem",
            }}
          >
            <nav
              aria-label="Breadcrumb"
              style={{
                fontSize: "0.78rem",
                color: "var(--color-ink-light)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              <Link href="/">Home</Link> &gt;{" "}
              <Link href={product.department === "ART" ? "/shop/art" : "/shop/decor"}>
                {product.department === "ART" ? "Art" : "Home Décor"}
              </Link>{" "}
              &gt; <span>{product.category.replace(/_/g, " ")}</span>
            </nav>

            <span
              style={{
                fontSize: "0.72rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--color-terracotta)",
                fontWeight: 600,
                backgroundColor: "rgba(166, 75, 50, 0.08)",
                padding: "2px 8px",
                borderRadius: "2px",
              }}
            >
              ARCHIVE REF #SG748
            </span>
          </div>

          {/* Badges strip */}
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.85rem", flexWrap: "wrap" }}>
            {product.productType === "ORIGINAL" && (
              <span className="badge badge-original">Original Artwork</span>
            )}
            {product.productType === "EDITION" && (
              <span className="badge badge-edition">
                Limited Edition of {product.editionSize || 25}
              </span>
            )}
            <span
              className="badge"
              style={{
                backgroundColor: "rgba(36, 34, 30, 0.06)",
                color: "var(--color-ink-charcoal)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              1P Single Canvas
            </span>
            <span
              className="badge"
              style={{
                backgroundColor: "rgba(184, 154, 101, 0.12)",
                color: "var(--color-ink-charcoal)",
                border: "1px solid rgba(184, 154, 101, 0.3)",
              }}
            >
              Stretch + {selectedFrame}
            </span>
            {product.shippingClass === "FRAGILE" && (
              <span className="badge badge-sample">Museum Timber Crated</span>
            )}
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: "clamp(2.2rem, 3.8vw, 3.2rem)",
              lineHeight: 1.15,
              marginBottom: "0.45rem",
              color: "var(--color-ink-charcoal)",
            }}
          >
            {product.title}
          </h1>

          {/* Meson Art / Pinterest Structured Sub-line */}
          <div
            style={{
              fontSize: "0.95rem",
              fontFamily: "var(--font-sans)",
              color: "var(--color-ink-muted)",
              marginBottom: "1.25rem",
              letterSpacing: "0.02em",
            }}
          >
            <strong style={{ color: "var(--color-ink-charcoal)" }}>#SG748</strong> • 1P (Each {h}H × {w}W CM / {hIn}&quot;H × {wIn}&quot;W IN) / Stretch + {selectedFrame} Frame
          </div>

          {/* Artist Provenance Card */}
          {product.artist && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "0.85rem 1.15rem",
                backgroundColor: "var(--color-canvas-pure)",
                borderRadius: "3px",
                border: "1px solid var(--border-subtle)",
                marginBottom: "1.5rem",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  backgroundColor: "var(--color-slate-indigo)",
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  flexShrink: 0,
                }}
              >
                {product.artist.name.charAt(0)}
              </div>
              <div style={{ flexGrow: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <Link
                    href={`/artists/${product.artist.slug}`}
                    style={{
                      fontSize: "1.05rem",
                      fontWeight: 600,
                      color: "var(--color-ink-charcoal)",
                      fontFamily: "var(--font-serif)",
                    }}
                  >
                    {product.artist.name}
                  </Link>
                  <span
                    style={{
                      color: "#2E7D32",
                      fontSize: "0.85rem",
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                    title="Verified Studio Artist"
                  >
                    ✓
                  </span>
                </div>
                <div style={{ fontSize: "0.78rem", color: "var(--color-ink-light)" }}>
                  {product.artist.discipline} • {product.artist.location}
                </div>
              </div>
              <Link
                href={`/artists/${product.artist.slug}`}
                className="btn-text"
                style={{ fontSize: "0.76rem" }}
              >
                Profile →
              </Link>
            </div>
          )}

          {/* Price display with real-time currency selector */}
          <div
            style={{
              padding: "1.25rem 0",
              borderTop: "1px solid var(--border-subtle)",
              borderBottom: "1px solid var(--border-subtle)",
              marginBottom: "1.75rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", flexWrap: "wrap" }}>
              <span
                style={{
                  fontSize: "2.2rem",
                  fontWeight: 600,
                  color: "var(--color-ink-charcoal)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                {format(product.price)}
              </span>

              {currency !== BASE_CURRENCY && (
                <span
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--color-ink-light)",
                  }}
                >
                  (Store Base: {formatPrice(product.price, BASE_CURRENCY)})
                </span>
              )}
            </div>

            <div
              style={{
                fontSize: "0.82rem",
                color: "var(--color-ink-muted)",
                marginTop: "6px",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span>🚚 Complimentary Museum Wooden Crating</span>
              <span>•</span>
              <span>Insured White-Glove Courier Transit</span>
            </div>
          </div>

          {/* Interactive Frame Finish Customizer */}
          {isArt && (
            <div
              style={{
                marginBottom: "2rem",
                padding: "1.25rem",
                backgroundColor: "var(--color-canvas-pure)",
                borderRadius: "3px",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.75rem",
                }}
              >
                <label
                  style={{
                    fontSize: "0.8rem",
                    fontFamily: "var(--font-sans)",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--color-ink-charcoal)",
                  }}
                >
                  Framing Option: <span style={{ color: "var(--color-terracotta)" }}>{selectedFrame}</span>
                </label>
                <span style={{ fontSize: "0.75rem", color: "var(--color-ink-light)" }}>
                  10mm Floating Shadow Gap Included
                </span>
              </div>

              {/* Swatch Buttons */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                  gap: "0.6rem",
                }}
              >
                {[
                  { name: "Natural Oak", swatch: "#C4A47C", desc: "Rift-Sawn Oak" },
                  { name: "Obsidian Black", swatch: "#1A1A1A", desc: "Matte Hardwood" },
                  { name: "Champagne Gold", swatch: "#C5A059", desc: "Warm Gilded Leaf" },
                  { name: "Frameless Gallery Wrap", swatch: "#E8E2D5", desc: "Raw Belgian Edge" },
                ].map((f) => (
                  <button
                    key={f.name}
                    type="button"
                    onClick={() => setSelectedFrame(f.name as any)}
                    style={{
                      padding: "0.65rem 0.75rem",
                      borderRadius: "2px",
                      border:
                        selectedFrame === f.name
                          ? "2px solid var(--color-ink-charcoal)"
                          : "1px solid var(--border-medium)",
                      backgroundColor: selectedFrame === f.name ? "var(--color-canvas-light)" : "#FFFFFF",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.65rem",
                      cursor: "pointer",
                      transition: "all var(--transition-fast)",
                    }}
                  >
                    <span
                      style={{
                        width: "16px",
                        height: "16px",
                        borderRadius: "2px",
                        backgroundColor: f.swatch,
                        border: "1px solid rgba(0,0,0,0.15)",
                        flexShrink: 0,
                      }}
                    />
                    <div>
                      <div style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--color-ink-charcoal)", lineHeight: 1.2 }}>
                        {f.name}
                      </div>
                      <div style={{ fontSize: "0.68rem", color: "var(--color-ink-light)" }}>
                        {f.desc}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Dimensions Metric & Imperial Matrix */}
          <div
            style={{
              padding: "1rem 1.25rem",
              backgroundColor: "var(--color-canvas-light)",
              borderRadius: "3px",
              border: "1px solid var(--border-subtle)",
              marginBottom: "2rem",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
              fontSize: "0.85rem",
            }}
          >
            <div>
              <span style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-ink-light)", display: "block", marginBottom: "2px" }}>
                Metric Scale
              </span>
              <strong style={{ color: "var(--color-ink-charcoal)" }}>
                {h}H × {w}W × {d}D cm
              </strong>
              <div style={{ fontSize: "0.75rem", color: "var(--color-ink-muted)", marginTop: "2px" }}>
                Weight: {product.weightKg || 7.5} kg (unpacked)
              </div>
            </div>

            <div>
              <span style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-ink-light)", display: "block", marginBottom: "2px" }}>
                Imperial Scale (US/UK)
              </span>
              <strong style={{ color: "var(--color-ink-charcoal)" }}>
                {hIn}&quot;H × {wIn}&quot;W × {dIn}&quot;D in
              </strong>
              <div style={{ fontSize: "0.75rem", color: "var(--color-ink-muted)", marginTop: "2px" }}>
                Weight: {weightLbs} lbs (unpacked)
              </div>
            </div>
          </div>

          {/* Estimated Delivery Days, Arrival Date & Timeline (Meson Art / Pinterest Feature) */}
          <EstimatedDeliveryBox
            shippingClass={product.shippingClass}
            isOriginal={product.productType === "ORIGINAL"}
          />

          {/* Availability & Commerce Action Buttons */}
          <div style={{ marginBottom: "2.5rem" }}>
            {product.enquiryOnly ? (
              <div>
                <p style={{ fontSize: "0.92rem", marginBottom: "1rem" }}>
                  This selected monumental artwork is offered via curatorial concierge to
                  arrange bespoke insurance, international crating, or installation.
                </p>
                <button
                  type="button"
                  onClick={() => setEnquiryOpen(true)}
                  className="btn btn-primary"
                  style={{ width: "100%", height: "52px" }}
                >
                  Inquire with Studio Concierge
                </button>
              </div>
            ) : isOutOfStock ? (
              <div>
                <p style={{ color: "var(--color-terracotta)", fontWeight: 600, marginBottom: "1rem" }}>
                  This piece has been acquired and is currently in private collection.
                </p>
                <button
                  type="button"
                  onClick={() => setEnquiryOpen(true)}
                  className="btn btn-secondary"
                  style={{ width: "100%", height: "52px" }}
                >
                  Commission a Similar Piece
                </button>
              </div>
            ) : (
              <div>
                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "0.85rem" }}>
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="btn btn-primary"
                    style={{ flex: "2 1 240px", height: "52px", fontSize: "0.92rem" }}
                  >
                    Acquire Artwork • {format(product.price * quantity)}
                  </button>

                  <button
                    type="button"
                    onClick={() => setEnquiryOpen(true)}
                    className="btn btn-secondary"
                    style={{ flex: "1 1 140px", height: "52px", fontSize: "0.88rem" }}
                  >
                    Concierge Inquiry
                  </button>
                </div>

                {/* Secondary Action Strip: Save/Pin, Tear Sheet, Share */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "0.5rem",
                    paddingTop: "0.75rem",
                    borderTop: "1px solid var(--border-subtle)",
                  }}
                >
                  <button
                    type="button"
                    onClick={handleToggleSave}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      fontSize: "0.82rem",
                      color: isSaved ? "var(--color-terracotta)" : "var(--color-ink-muted)",
                      fontWeight: isSaved ? 600 : 500,
                    }}
                  >
                    <span>{isSaved ? "♥ Saved to Collection" : "♡ Save / Pin"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTearSheetOpen(true)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      fontSize: "0.82rem",
                      color: "var(--color-ink-muted)",
                    }}
                  >
                    📄 <span>Curator&apos;s Tear Sheet (PDF)</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleShare}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      fontSize: "0.82rem",
                      color: copiedLink ? "#2E7D32" : "var(--color-ink-muted)",
                    }}
                  >
                    🔗 <span>{copiedLink ? "Link Copied!" : "Share Piece"}</span>
                  </button>
                </div>
              </div>
            )}

            {product.stock > 0 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.82rem",
                  color: "#2E7D32",
                  marginTop: "0.85rem",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "#2E7D32",
                    display: "inline-block",
                  }}
                />
                In Studio Gallery Collection — 1 of 1 unique original
              </div>
            )}
          </div>

          {/* Curatorial Description & Impasto Surface Analysis */}
          <div style={{ marginBottom: "2.5rem" }}>
            <h3
              style={{
                fontSize: "1.05rem",
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "0.85rem",
                color: "var(--color-ink-charcoal)",
              }}
            >
              Curatorial Narrative &amp; Surface Analysis
            </h3>
            <p style={{ fontSize: "0.98rem", lineHeight: 1.75, color: "var(--color-ink-muted)" }}>
              {product.description}
            </p>
          </div>

          {/* Structured 4-Card Specifications Grid (Pinterest / Meson Art Style) */}
          <div style={{ marginBottom: "2.5rem" }}>
            <h3
              style={{
                fontSize: "1.05rem",
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "1rem",
                color: "var(--color-ink-charcoal)",
              }}
            >
              Artwork Specifications
            </h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "1rem",
              }}
            >
              {/* Card 1: Medium & Technique */}
              <div
                style={{
                  padding: "1.15rem",
                  backgroundColor: "var(--color-canvas-pure)",
                  borderRadius: "3px",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                <div style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-terracotta)", fontWeight: 600, marginBottom: "0.35rem" }}>
                  Technique &amp; Medium
                </div>
                <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--color-ink-charcoal)", marginBottom: "0.25rem" }}>
                  100% Hand-Painted Impasto
                </div>
                <div style={{ fontSize: "0.78rem", color: "var(--color-ink-muted)", lineHeight: 1.5 }}>
                  {product.medium || "Professional oils, palette-knife impasto on stretched Belgian linen"}
                </div>
              </div>

              {/* Card 2: Framing & Ready to Hang */}
              <div
                style={{
                  padding: "1.15rem",
                  backgroundColor: "var(--color-canvas-pure)",
                  borderRadius: "3px",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                <div style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-terracotta)", fontWeight: 600, marginBottom: "0.35rem" }}>
                  Framing &amp; Installation
                </div>
                <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--color-ink-charcoal)", marginBottom: "0.25rem" }}>
                  {selectedFrame} Floater
                </div>
                <div style={{ fontSize: "0.78rem", color: "var(--color-ink-muted)", lineHeight: 1.5 }}>
                  10mm recessed shadow gap. Pre-installed heavy-duty D-rings and braided steel museum wire.
                </div>
              </div>

              {/* Card 3: Authenticity & Certificate */}
              <div
                style={{
                  padding: "1.15rem",
                  backgroundColor: "var(--color-canvas-pure)",
                  borderRadius: "3px",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                <div style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-terracotta)", fontWeight: 600, marginBottom: "0.35rem" }}>
                  Provenance &amp; Archive
                </div>
                <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--color-ink-charcoal)", marginBottom: "0.25rem" }}>
                  Certificate of Authenticity
                </div>
                <div style={{ fontSize: "0.78rem", color: "var(--color-ink-muted)", lineHeight: 1.5 }}>
                  Signed recto and verso by the artist. Accompanied by physical museum certificate with studio wax seal.
                </div>
              </div>

              {/* Card 4: Packaging & Crating */}
              <div
                style={{
                  padding: "1.15rem",
                  backgroundColor: "var(--color-canvas-pure)",
                  borderRadius: "3px",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                <div style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-terracotta)", fontWeight: 600, marginBottom: "0.35rem" }}>
                  Museum Timber Crating
                </div>
                <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--color-ink-charcoal)", marginBottom: "0.25rem" }}>
                  White-Glove Insured Delivery
                </div>
                <div style={{ fontSize: "0.78rem", color: "var(--color-ink-muted)", lineHeight: 1.5 }}>
                  Bespoke reinforced timber crate with archival closed-cell foam and climate-sealed moisture barrier.
                </div>
              </div>
            </div>
          </div>

          {/* Collector Care & Dispatch Accordion Box */}
          <div
            style={{
              backgroundColor: "var(--color-canvas-light)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "3px",
              padding: "1.5rem",
            }}
          >
            <h4
              style={{
                fontSize: "0.92rem",
                fontWeight: 600,
                fontFamily: "var(--font-sans)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
                color: "var(--color-ink-charcoal)",
              }}
            >
              Collector Protection &amp; Dispatch Guarantee
            </h4>
            <ul
              style={{
                fontSize: "0.85rem",
                color: "var(--color-ink-muted)",
                paddingLeft: "1.2rem",
                lineHeight: 1.6,
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <li>
                <strong>14-Day In-Situ Inspection:</strong> Live with the artwork for 14 days. If the piece does not resonate with your space, our concierge arranges white-glove collection.
              </li>
              <li>
                <strong>Direct Studio Provenance:</strong> Sourced directly from artist ateliers in Enugu and Lagos with complete registered documentation.
              </li>
              <li>
                <strong>Customs &amp; Global Logistics:</strong> Complete export clearance and delivery duty handling managed directly by our curatorial team.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Enquiry Modal */}
      <EnquiryModal
        productTitle={product.title}
        productId={product.id}
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
      />

      {/* Room Scale Visualizer Modal */}
      <RoomScaleVisualizer
        isOpen={scaleVisualizerOpen}
        onClose={() => setScaleVisualizerOpen(false)}
        artworkTitle={product.title}
        artworkImage={canvasImage.url}
        artistName={product.artist?.name}
        widthCm={product.widthCm}
        heightCm={product.heightCm}
        depthCm={product.depthCm}
        frameFinish={selectedFrame}
      />

      {/* Curator Tear Sheet Printable Modal */}
      <ArtTearSheetModal
        isOpen={tearSheetOpen}
        onClose={() => setTearSheetOpen(false)}
        product={product}
        frameFinish={selectedFrame}
        formattedPrice={format(product.price)}
      />
    </>
  );
}
