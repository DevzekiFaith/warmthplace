"use client";

import React from "react";
import Image from "next/image";

interface ArtTearSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    slug: string;
    title: string;
    department: string;
    category: string;
    productType: string;
    description: string;
    medium?: string | null;
    materials?: string | null;
    year?: number | null;
    widthCm?: number | null;
    heightCm?: number | null;
    depthCm?: number | null;
    weightKg?: number | null;
    price: number;
    currency: string;
    artist?: {
      name: string;
      discipline: string;
      location?: string | null;
    } | null;
    images: { url: string; alt: string }[];
  };
  frameFinish: string;
  formattedPrice: string;
}

export function ArtTearSheetModal({
  isOpen,
  onClose,
  product,
  frameFinish,
  formattedPrice,
}: ArtTearSheetModalProps) {
  if (!isOpen) return null;

  const w = product.widthCm || 120;
  const h = product.heightCm || 100;
  const d = product.depthCm || 5;
  const wIn = (w * 0.393701).toFixed(1);
  const hIn = (h * 0.393701).toFixed(1);
  const dIn = (d * 0.393701).toFixed(1);
  const primaryImg = product.images[0]?.url || "/images/catalogue/indigo-tide.jpg";

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(23, 23, 23, 0.8)",
        backdropFilter: "blur(8px)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "4px",
          maxWidth: "840px",
          width: "100%",
          maxHeight: "92vh",
          overflowY: "auto",
          boxShadow: "0 30px 70px rgba(0, 0, 0, 0.4)",
          border: "1px solid #D8D0C0",
        }}
      >
        {/* Modal Action Header */}
        <div
          style={{
            padding: "1rem 1.75rem",
            backgroundColor: "#FAF7F2",
            borderBottom: "1px solid #E8E2D5",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span
              style={{
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                fontWeight: 600,
                color: "#A64B32",
              }}
            >
              Curatorial Spec Sheet / Tear Sheet
            </span>
            <span style={{ fontSize: "0.75rem", color: "#8A857B" }}>
              • Catalog Ref: #SG748
            </span>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
            <button
              type="button"
              onClick={handlePrint}
              className="btn btn-secondary"
              style={{ padding: "0.4rem 1rem", fontSize: "0.8rem" }}
            >
              🖨️ Print / Save PDF
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Tear Sheet"
              style={{
                fontSize: "1.6rem",
                lineHeight: 1,
                color: "#5C5850",
                cursor: "pointer",
                padding: "0 0.4rem",
              }}
            >
              ×
            </button>
          </div>
        </div>

        {/* Printable Tear Sheet Content */}
        <div style={{ padding: "2.5rem 3rem", color: "#24221E" }}>
          {/* Studio Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              borderBottom: "2px solid #24221E",
              paddingBottom: "1.25rem",
              marginBottom: "2rem",
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.8rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                WARMTHPLACE
              </h2>
              <div
                style={{
                  fontSize: "0.78rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#8A857B",
                  marginTop: "0.2rem",
                }}
              >
                Contemporary West African Art &amp; Living Gallery
              </div>
            </div>
            <div style={{ textAlign: "right", fontSize: "0.8rem", color: "#5C5850" }}>
              <div>Studio &amp; Archive: Lagos • London • Abuja</div>
              <div>curator@warmthplace.com • warmthplace.com</div>
              <div style={{ marginTop: "0.25rem", color: "#A64B32", fontWeight: 600 }}>
                ARCHIVE CATALOG #SG748
              </div>
            </div>
          </div>

          {/* Main Grid: Artwork photo & core details */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.1fr",
              gap: "2.5rem",
              alignItems: "start",
              marginBottom: "2.5rem",
            }}
          >
            {/* Artwork Display with chosen frame */}
            <div
              style={{
                position: "relative",
                aspectRatio: "4 / 5",
                backgroundColor: "#FAF7F2",
                borderRadius: "2px",
                overflow: "hidden",
                border: "1px solid #D8D0C0",
                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
              }}
            >
              <Image
                src={primaryImg}
                alt={product.title}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>

            {/* Details Column */}
            <div>
              <div
                style={{
                  fontSize: "0.75rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#A64B32",
                  fontWeight: 600,
                  marginBottom: "0.4rem",
                }}
              >
                {product.productType === "ORIGINAL" ? "Original Artwork • Unique 1 of 1" : "Limited Edition"}
              </div>

              <h1
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "2rem",
                  lineHeight: 1.2,
                  marginBottom: "0.6rem",
                  color: "#24221E",
                }}
              >
                {product.title}
              </h1>

              {product.artist && (
                <div style={{ fontSize: "1rem", color: "#5C5850", marginBottom: "1.25rem" }}>
                  <strong>{product.artist.name}</strong>
                  <span style={{ fontSize: "0.85rem", color: "#8A857B", marginLeft: "0.5rem" }}>
                    ({product.artist.discipline} — {product.artist.location})
                  </span>
                </div>
              )}

              {/* Price Banner */}
              <div
                style={{
                  padding: "0.85rem 1.25rem",
                  backgroundColor: "#F4F0E8",
                  borderRadius: "2px",
                  border: "1px solid #E8E2D5",
                  marginBottom: "1.5rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <span style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "#8A857B" }}>
                    Acquisition Value:
                  </span>
                  <div style={{ fontSize: "1.4rem", fontWeight: 600, color: "#24221E" }}>
                    {formattedPrice}
                  </div>
                </div>
                <div style={{ fontSize: "0.78rem", color: "#2E7D32", fontWeight: 600 }}>
                  ✓ Available for Direct Studio Dispatch
                </div>
              </div>

              {/* Specs Table */}
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "0.85rem",
                  lineHeight: 1.6,
                }}
              >
                <tbody>
                  <tr style={{ borderBottom: "1px solid #E8E2D5" }}>
                    <th style={{ textAlign: "left", padding: "0.45rem 0", color: "#8A857B", width: "35%" }}>
                      Dimensions (Metric)
                    </th>
                    <td style={{ padding: "0.45rem 0", color: "#24221E", fontWeight: 500 }}>
                      {w}H × {h}W × {d}D cm
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #E8E2D5" }}>
                    <th style={{ textAlign: "left", padding: "0.45rem 0", color: "#8A857B" }}>
                      Dimensions (Imperial)
                    </th>
                    <td style={{ padding: "0.45rem 0", color: "#24221E", fontWeight: 500 }}>
                      {wIn}&quot;H × {hIn}&quot;W × {dIn}&quot;D inches
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #E8E2D5" }}>
                    <th style={{ textAlign: "left", padding: "0.45rem 0", color: "#8A857B" }}>
                      Medium &amp; Surface
                    </th>
                    <td style={{ padding: "0.45rem 0", color: "#24221E" }}>
                      {product.medium || "Oil and heavy-body acrylic impasto on Belgian linen"}
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #E8E2D5" }}>
                    <th style={{ textAlign: "left", padding: "0.45rem 0", color: "#8A857B" }}>
                      Selected Framing
                    </th>
                    <td style={{ padding: "0.45rem 0", color: "#24221E", fontWeight: 600 }}>
                      {frameFinish} with 10mm shadow gap (Ready to Hang)
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #E8E2D5" }}>
                    <th style={{ textAlign: "left", padding: "0.45rem 0", color: "#8A857B" }}>
                      Year &amp; Authenticity
                    </th>
                    <td style={{ padding: "0.45rem 0", color: "#24221E" }}>
                      {product.year || 2026} • Signed recto/verso + Studio Seal Certificate
                    </td>
                  </tr>
                  <tr>
                    <th style={{ textAlign: "left", padding: "0.45rem 0", color: "#8A857B" }}>
                      Weight / Crating
                    </th>
                    <td style={{ padding: "0.45rem 0", color: "#24221E" }}>
                      {product.weightKg || 7.5} kg net • Museum-grade custom timber crate
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Curatorial Description Section */}
          <div
            style={{
              padding: "1.25rem 1.5rem",
              backgroundColor: "#FAF7F2",
              borderRadius: "2px",
              border: "1px solid #E8E2D5",
              marginBottom: "2rem",
            }}
          >
            <h4
              style={{
                fontSize: "0.85rem",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "#24221E",
                marginBottom: "0.5rem",
              }}
            >
              Curatorial Narrative &amp; Surface Analysis
            </h4>
            <p style={{ fontSize: "0.88rem", lineHeight: 1.6, color: "#5C5850" }}>
              {product.description}
            </p>
          </div>

          {/* Authentication & Signature Footer */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2rem",
              paddingTop: "1.5rem",
              borderTop: "1px solid #E8E2D5",
              fontSize: "0.78rem",
              color: "#8A857B",
            }}
          >
            <div>
              <div style={{ fontWeight: 600, color: "#24221E", marginBottom: "0.25rem" }}>
                Museum Packing &amp; White-Glove Transit
              </div>
              <div>
                Double-walled custom timber crating with archival closed-cell foam and desiccant vapor barrier. Dispatched with end-to-end transit insurance via specialized art courier.
              </div>
            </div>
            <div>
              <div style={{ fontWeight: 600, color: "#24221E", marginBottom: "0.25rem" }}>
                Provenance Guarantee
              </div>
              <div>
                Guaranteed genuine and cataloged into the Warmthplace Permanent Archive. Accompanied by registered Certificate of Authenticity signed by the artist.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
