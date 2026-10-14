"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartContext";
import { useCurrency } from "@/components/CurrencyContext";
import { ImageZoom } from "@/components/ImageZoom";
import { EnquiryModal } from "@/components/EnquiryModal";
import { BASE_CURRENCY } from "@/lib/constants";
import { formatPrice } from "@/lib/currency";

interface ProductProps {
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
  const { addItem } = useCart();
  const { format, currency } = useCurrency();

  const currentImage = product.images[selectedImageIndex] || {
    url: "/images/catalogue/harmattan-procession.jpg",
    alt: product.title,
  };

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
        imageUrl: currentImage.url,
        imageAlt: currentImage.alt,
        stock: product.stock,
        shippingClass: product.shippingClass,
      },
      quantity
    );
  };

  const isOutOfStock = product.stock <= 0;

  return (
    <>
      <div className="pdp-grid">
        {/* Left Column: Gallery & Interactive Zoom */}
        <div className="pdp-gallery-container">
          <ImageZoom src={currentImage.url} alt={currentImage.alt} />

          {/* Thumbnail switcher if multiple images */}
          {product.images.length > 1 && (
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
              {product.images.map((img, idx) => (
                <button
                  key={img.url}
                  type="button"
                  onClick={() => setSelectedImageIndex(idx)}
                  style={{
                    width: "72px",
                    height: "90px",
                    position: "relative",
                    borderRadius: "2px",
                    overflow: "hidden",
                    border:
                      selectedImageIndex === idx
                        ? "2px solid var(--color-ink-charcoal)"
                        : "1px solid var(--border-medium)",
                  }}
                  aria-label={`View image ${idx + 1}`}
                >
                  <Image
                    src={img.url}
                    alt={img.alt}
                    fill
                    sizes="72px"
                    style={{ objectFit: "cover" }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Curatorial Details & Commerce Actions */}
        <div>
          {/* Breadcrumb path */}
          <nav
            aria-label="Breadcrumb"
            style={{
              fontSize: "0.78rem",
              color: "var(--color-ink-light)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "1rem",
            }}
          >
            <Link href="/">Home</Link> &gt;{" "}
            <Link
              href={
                product.department === "ART" ? "/shop/art" : "/shop/decor"
              }
            >
              {product.department === "ART" ? "Art" : "Home Décor"}
            </Link>{" "}
            &gt; <span>{product.category.replace(/_/g, " ")}</span>
          </nav>

          {/* Product Badges */}
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.85rem" }}>
            {product.productType === "ORIGINAL" && (
              <span className="badge badge-original">Original Artwork</span>
            )}
            {product.productType === "EDITION" && (
              <span className="badge badge-edition">
                Limited Edition of {product.editionSize || 25}
              </span>
            )}
            {product.department === "DECOR" && (
              <span className="badge badge-decor">Living Object</span>
            )}
            {product.shippingClass === "FRAGILE" && (
              <span className="badge badge-sample">Fragile Crated</span>
            )}
            {product.shippingClass === "OVERSIZED" && (
              <span className="badge badge-sample">Special Freight</span>
            )}
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: "clamp(2.2rem, 3.8vw, 3.2rem)",
              lineHeight: 1.15,
              marginBottom: "0.75rem",
            }}
          >
            {product.title}
          </h1>

          {/* Artist attribution */}
          {product.artist && (
            <div style={{ marginBottom: "1.5rem" }}>
              <span style={{ fontSize: "0.85rem", color: "var(--color-ink-light)" }}>
                By{" "}
              </span>
              <Link
                href={`/artists/${product.artist.slug}`}
                style={{
                  fontSize: "1.1rem",
                  fontFamily: "var(--font-serif)",
                  fontWeight: 600,
                  color: "var(--color-ink-charcoal)",
                  textDecoration: "underline",
                }}
              >
                {product.artist.name}
              </Link>
              <span
                style={{
                  fontSize: "0.8rem",
                  color: "var(--color-ink-muted)",
                  marginLeft: "0.75rem",
                }}
              >
                ({product.artist.location})
              </span>
            </div>
          )}

          {/* Price display with currency switcher responsiveness */}
          <div
            style={{
              padding: "1.25rem 0",
              borderTop: "1px solid var(--border-subtle)",
              borderBottom: "1px solid var(--border-subtle)",
              marginBottom: "1.75rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}>
              <span
                style={{
                  fontSize: "2rem",
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
                fontSize: "0.78rem",
                color: "var(--color-ink-light)",
                marginTop: "4px",
              }}
            >
              Tax calculated at checkout. White-glove crating and insured transit applied by zone.
            </div>
          </div>

          {/* Availability & Actions */}
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
                  style={{ width: "100%" }}
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
                  style={{ width: "100%" }}
                >
                  Commission a Similar Piece
                </button>
              </div>
            ) : (
              <div className="pdp-actions-row">
                {product.productType !== "ORIGINAL" && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid var(--border-medium)",
                      borderRadius: "2px",
                      height: "50px",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      style={{ padding: "0 0.85rem", fontSize: "1.1rem" }}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span
                      style={{
                        padding: "0 0.85rem",
                        fontWeight: 600,
                        fontSize: "0.95rem",
                      }}
                    >
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                      style={{ padding: "0 0.85rem", fontSize: "1.1rem" }}
                      aria-label="Increase quantity"
                      disabled={quantity >= product.stock}
                    >
                      +
                    </button>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="btn btn-primary"
                  style={{ flexGrow: 1, height: "50px" }}
                >
                  Add to Bag • {format(product.price * quantity)}
                </button>

                <button
                  type="button"
                  onClick={() => setEnquiryOpen(true)}
                  className="btn btn-secondary"
                  style={{ height: "50px", padding: "0 1.25rem" }}
                  title="Make an inquiry"
                  aria-label="Inquire about this piece"
                >
                  Enquire
                </button>
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
                In Studio Gallery Collection — {product.stock} available
              </div>
            )}
          </div>

          {/* Description */}
          <div style={{ marginBottom: "2.5rem" }}>
            <h3
              style={{
                fontSize: "1.1rem",
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: "0.85rem",
              }}
            >
              Curatorial Description
            </h3>
            <p style={{ fontSize: "0.98rem", lineHeight: 1.7, color: "var(--color-ink-muted)" }}>
              {product.description}
            </p>
          </div>

          {/* Specifications Table */}
          <div style={{ marginBottom: "2.5rem" }}>
            <h3
              style={{
                fontSize: "1.1rem",
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: "0.85rem",
              }}
            >
              Artwork Specifications
            </h3>
            <table className="pdp-specs-table">
              <tbody>
                {product.medium && (
                  <tr>
                    <th>Medium</th>
                    <td>{product.medium}</td>
                  </tr>
                )}
                {product.materials && (
                  <tr>
                    <th>Materials</th>
                    <td>{product.materials}</td>
                  </tr>
                )}
                {product.year && (
                  <tr>
                    <th>Year of Creation</th>
                    <td>{product.year}</td>
                  </tr>
                )}
                {(product.widthCm || product.heightCm) && (
                  <tr>
                    <th>Dimensions</th>
                    <td>
                      {product.widthCm} × {product.heightCm}
                      {product.depthCm ? ` × ${product.depthCm}` : ""} cm
                    </td>
                  </tr>
                )}
                {product.weightKg && (
                  <tr>
                    <th>Weight</th>
                    <td>{product.weightKg} kg (unpacked)</td>
                  </tr>
                )}
                {product.productType === "EDITION" && product.editionSize && (
                  <tr>
                    <th>Edition</th>
                    <td>Limited Run of {product.editionSize} (Hand-Signed)</td>
                  </tr>
                )}
                <tr>
                  <th>Provenance</th>
                  <td>Direct from Artist Studio / Warmthplace Certified</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Shipping, Crating & Authenticity Collapsible Box */}
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
                fontSize: "0.95rem",
                fontWeight: 600,
                fontFamily: "var(--font-sans)",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}
            >
              Collector Care & Dispatch
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
                <strong>Crated Delivery:</strong> Specially built timber crates with archival foam lining and moisture barriers for canvases and sculptures.
              </li>
              <li>
                <strong>Authenticity:</strong> Accompanied by a physical museum Certificate of Authenticity signed by the artist.
              </li>
              <li>
                <strong>Global Transit:</strong> Dispatched via DHL Express Art Freight with comprehensive tracking and transit insurance.
              </li>
              <li>
                <strong>Returns:</strong> 14-day inspection guarantee upon delivery for homeware; fine art returns subject to condition verification.
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
    </>
  );
}
