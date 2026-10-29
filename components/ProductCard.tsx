"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "./CartContext";
import { useCurrency } from "./CurrencyContext";
import { BASE_CURRENCY } from "@/lib/constants";
import {
  formatPrice,
  getPrintPriceKobo,
  PRINT_MIN_PRICE_KOBO,
  PRINT_MAX_PRICE_KOBO,
} from "@/lib/currency";

export interface ProductCardProps {
  product: {
    id: string;
    slug: string;
    title: string;
    department: string;
    category: string;
    productType: string;
    editionSize?: number | null;
    price: number;
    currency: string;
    stock: number;
    medium?: string | null;
    materials?: string | null;
    widthCm?: number | null;
    heightCm?: number | null;
    depthCm?: number | null;
    enquiryOnly?: boolean;
    shippingClass: string;
    artist?: {
      name: string;
      slug: string;
    } | null;
    images: {
      url: string;
      alt: string;
    }[];
  };
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const { currency, setCurrency, format } = useCurrency();
  const [isSaved, setIsSaved] = useState(false);

  const primaryImage = product.images[0] || {
    url: "/images/catalogue/harmattan-procession.jpg",
    alt: product.title,
  };

  const isLcpCandidate =
    priority ||
    primaryImage.url.includes("meadow-symphony-panoramic-impasto") ||
    primaryImage.url.includes("white-stags-twilight-glade") ||
    primaryImage.url.includes("royal-accord-ankara-couple") ||
    primaryImage.url.includes("savannah-strata-azure-horizon") ||
    primaryImage.url.includes("tufted-companion-on-olive-jute") ||
    primaryImage.url.includes("courtyard-tambourine-celebration") ||
    primaryImage.url.includes("midnight-afrobeat-saxophonist") ||
    primaryImage.url.includes("harvest-canopy-tree-of-vitality") ||
    primaryImage.url.includes("rain-on-ochre-pop-duck") ||
    primaryImage.url.includes("trinity-blossoms-on-raw-jute") ||
    primaryImage.url.includes("canopy-and-grace") ||
    primaryImage.url.includes("royal-gazelles") ||
    primaryImage.url.includes("white-stags-twilight") ||
    primaryImage.url.includes("solar-vortex") ||
    primaryImage.url.includes("indigo-tide") ||
    primaryImage.url.includes("tree-of-life-ochre");

  const secondaryImage = product.images.length > 1 ? product.images[1] : null;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.enquiryOnly) {
      router.push(`/products/${product.slug}#enquire`);
      return;
    }
    addItem({
      id: product.id,
      slug: product.slug,
      title: product.title,
      artistName: product.artist?.name || null,
      department: product.department,
      category: product.category,
      productType: product.productType,
      price: product.price,
      currency: product.currency,
      imageUrl: primaryImage.url,
      imageAlt: primaryImage.alt,
      stock: product.stock,
      shippingClass: product.shippingClass,
    });
  };

  const handleToggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  // Dimensions formatted both in Metric and Imperial
  const w = product.widthCm;
  const h = product.heightCm;
  const wIn = w ? (w * 0.393701).toFixed(0) : null;
  const hIn = h ? (h * 0.393701).toFixed(0) : null;

  const dualDimensions =
    w && h ? `${h}H × ${w}W cm (${hIn}" × ${wIn}")` : null;

  const isArt = product.department === "ART";

  return (
    <article className="product-card">
      <Link
        href={`/products/${product.slug}`}
        className="product-image-container"
        tabIndex={0}
      >
        {/* Primary Artwork Image with CSS-driven transition */}
        <Image
          src={primaryImage.url}
          alt={primaryImage.alt || product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
          className={`product-image-primary ${secondaryImage ? "has-secondary" : ""}`}
          priority={isLcpCandidate}
          loading={isLcpCandidate ? "eager" : "lazy"}
        />

        {/* Secondary In-Situ Room View on Hover (Pure CSS, 100% hydration-safe) */}
        {secondaryImage && (
          <Image
            src={secondaryImage.url}
            alt={`${product.title} displayed in room interior`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
            className="product-image-secondary"
            loading="lazy"
          />
        )}

        {/* Overlay Badges */}
        <div className="product-badges-overlay">
          {isArt && (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem", alignItems: "flex-start" }}>
              <span className="badge badge-original" style={{ fontSize: "0.68rem", padding: "0.25rem 0.6rem" }}>
                Original 1/1 • Prints Available
              </span>
              {secondaryImage && (
                <span
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.94)",
                    backdropFilter: "blur(6px)",
                    color: "var(--color-ink-charcoal)",
                    fontSize: "0.68rem",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    padding: "0.25rem 0.6rem",
                    borderRadius: "2px",
                    border: "1px solid var(--border-subtle)",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.3rem",
                  }}
                >
                  <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "#C5A059" }} />
                  Gallery Display
                </span>
              )}
            </div>
          )}

          {product.productType === "EDITION" && (
            <span className="badge badge-edition" style={{ fontSize: "0.68rem", padding: "0.25rem 0.6rem" }}>
              Edition of {product.editionSize || 25}
            </span>
          )}

          {product.department === "DECOR" && (
            <span className="badge badge-decor" style={{ fontSize: "0.68rem", padding: "0.25rem 0.6rem" }}>
              Living Object
            </span>
          )}

          {product.stock <= 2 && product.stock > 0 && !product.enquiryOnly && (
            <span className="badge badge-low-stock" style={{ fontSize: "0.68rem", padding: "0.25rem 0.6rem" }}>
              Only {product.stock} Left
            </span>
          )}
        </div>

        {/* Pinterest-inspired Pin / Save Button */}
        <button
          type="button"
          onClick={handleToggleSave}
          aria-label={isSaved ? "Saved to collection" : "Save / Pin to collection"}
          style={{
            position: "absolute",
            top: "0.85rem",
            right: "0.85rem",
            zIndex: 4,
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            backgroundColor: isSaved ? "var(--color-terracotta)" : "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(4px)",
            color: isSaved ? "#FFFFFF" : "var(--color-ink-charcoal)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1rem",
            border: "1px solid var(--border-subtle)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
            transition: "all var(--transition-fast)",
            cursor: "pointer",
          }}
          title={isSaved ? "Saved to your collection" : "Save / Pin Artwork"}
        >
          {isSaved ? "♥" : "♡"}
        </button>

        {/* Quick Add Button on Hover */}
        <button
          type="button"
          onClick={handleQuickAdd}
          className="product-quick-add-btn"
          aria-label={
            product.enquiryOnly
              ? `Inquire about ${product.title}`
              : `Add ${product.title} to bag`
          }
        >
          {product.enquiryOnly ? "Inquire with Studio" : "Add to Bag"}
        </button>
      </Link>

      {/* =========================================================
          DIV ARRANGEMENT: ARTWORK DETAILS (PINTEREST / MESON ART STYLE)
         ========================================================= */}
      <div className="product-info">
        {/* Line 1: Artist attribution with verified check & Catalog Ref */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.3rem" }}>
          {product.artist ? (
            <Link
              href={`/artists/${product.artist.slug}`}
              className="product-artist"
              style={{
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.3rem",
                fontWeight: 600,
              }}
            >
              <span>{product.artist.name}</span>
              <span style={{ color: "#2E7D32", fontSize: "0.75rem" }}>✓</span>
            </Link>
          ) : (
            <span className="product-artist">
              Warmthplace Studio
            </span>
          )}

          {isArt && (
            <span
              style={{
                fontSize: "0.68rem",
                letterSpacing: "0.08em",
                color: "var(--color-ink-light)",
                textTransform: "uppercase",
              }}
            >
              #SG748
            </span>
          )}
        </div>

        {/* Line 2: Artwork Title */}
        <h3 className="product-title">
          <Link href={`/products/${product.slug}`}>{product.title}</Link>
        </h3>

        {/* Line 3: Medium & Dual Metric/Imperial Dimensions */}
        <div className="product-meta-specs">
          {dualDimensions ? (
            <span>1P • {dualDimensions}</span>
          ) : (
            product.medium || product.materials || "Original fine art"
          )}
        </div>

        {/* Line 4: Framing Specification Pill */}
        {isArt && (
          <div style={{ marginBottom: "0.5rem", display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
            <span
              style={{
                display: "inline-block",
                fontSize: "0.7rem",
                color: "var(--color-ink-muted)",
                backgroundColor: "var(--color-canvas-light)",
                padding: "2px 7px",
                borderRadius: "2px",
                border: "1px solid var(--border-subtle)",
              }}
            >
              Floater Frame Included
            </span>
            <span
              style={{
                display: "inline-block",
                fontSize: "0.7rem",
                color: "var(--color-terracotta)",
                backgroundColor: "rgba(166, 75, 50, 0.08)",
                padding: "2px 7px",
                borderRadius: "2px",
                border: "1px solid rgba(166, 75, 50, 0.2)",
                fontWeight: 500,
              }}
            >
              Archival Prints Avail.
            </span>
          </div>
        )}

        {/* Line 5: Delivery Days & Arrival Notice */}
        <div
          style={{
            fontSize: "0.74rem",
            color: "#2E7D32",
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
            marginBottom: "0.75rem",
          }}
        >
          <span>🚚</span>
          <span>Delivers in 5–7 business days • Insured Crate</span>
        </div>

        {/* Line 6: Price Row with Currency Switcher Support & Dual Print / Original Options */}
        <div className="product-price-row">
          <div className="product-price-main">
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.45rem", flexWrap: "wrap" }}>
              <span className="product-price-primary">
                {format(product.price)}
              </span>
              {isArt && (
                <span style={{ fontSize: "0.7rem", color: "var(--color-ink-light)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>
                  {product.category === "PRINT_EDITION" ? "Print Edition" : "Original"}
                </span>
              )}
            </div>
            {isArt && product.category !== "PRINT_EDITION" && (
              <div style={{ fontSize: "0.76rem", color: "var(--color-ink-muted)", marginTop: "2px" }}>
                Prints: <strong style={{ color: "var(--color-ink-charcoal)" }}>{format(getPrintPriceKobo(product.price))}</strong>{" "}
                <span style={{ fontSize: "0.68rem", color: "var(--color-ink-light)" }}>
                  ({format(PRINT_MIN_PRICE_KOBO)}–{format(PRINT_MAX_PRICE_KOBO)})
                </span>
              </div>
            )}
            {currency !== BASE_CURRENCY && (
              <div
                className="product-price-indicative"
                title="Official base checkout currency is Nigerian Naira (NGN)"
              >
                Base: {formatPrice(product.price, BASE_CURRENCY)}
              </div>
            )}
          </div>

          <div className="product-price-right">
            <div
              className="card-currency-toggle"
              role="group"
              aria-label="Toggle Naira or Dollar currency"
            >
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrency("NGN");
                }}
                className={`card-currency-btn ${currency === "NGN" ? "active" : ""}`}
                aria-pressed={currency === "NGN"}
                title="Show price in Nigerian Naira (₦)"
              >
                ₦
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrency("USD");
                }}
                className={`card-currency-btn ${currency === "USD" ? "active" : ""}`}
                aria-pressed={currency === "USD"}
                title="Show price in US Dollars ($)"
              >
                $
              </button>
            </div>
            <span
              style={{
                fontSize: "0.73rem",
                color: "#2E7D32",
                fontWeight: 500,
              }}
            >
              ● In Studio
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
