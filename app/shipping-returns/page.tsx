import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Shipping, Crating & Returns | ${SITE_NAME}`,
  description:
    "Learn about our museum-grade crating protocols, insured international air transit, customs clearance, and collector return guarantees.",
};

export default function ShippingReturnsPage() {
  return (
    <div className="container" style={{ paddingTop: "3rem", paddingBottom: "7rem" }}>
      {/* Editorial Header */}
      <div style={{ maxWidth: "800px", marginBottom: "4rem" }}>
        <span className="kicker">Collector Care & Logistics</span>
        <h1
          style={{
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            lineHeight: 1.15,
            marginTop: "0.5rem",
            marginBottom: "1.25rem",
          }}
        >
          Museum-Grade Crating & Insured Global Transit
        </h1>
        <p style={{ fontSize: "1.15rem", lineHeight: 1.7, color: "var(--color-ink-muted)" }}>
          Every artwork and tactile home object entrusted to Warmthplace is handled under
          rigorous museum conservation standards. We provide tracked, insured white-glove delivery
          across Nigeria and worldwide via specialized art logistics.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
          gap: "2.5rem",
          marginBottom: "5rem",
        }}
      >
        {/* Pillar 1 */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid var(--border-subtle)",
            padding: "clamp(1.25rem, 3.5vw, 2.25rem)",
            borderRadius: "2px",
          }}
        >
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              backgroundColor: "rgba(147, 87, 66, 0.1)",
              color: "var(--color-terracotta)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1.25rem",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
          </div>
          <h3 style={{ fontSize: "1.25rem", marginBottom: "0.6rem" }}>Custom Timber Crating</h3>
          <p style={{ fontSize: "0.92rem", color: "var(--color-ink-light)", lineHeight: 1.65, margin: 0 }}>
            Large original canvases, bronze castings, and burnished ceramic vessels are sealed in
            double-walled, ISPM-15 heat-treated plywood crates lined with archival polyethylene foam,
            vapor barriers, and shock-indicator sensors.
          </p>
        </div>

        {/* Pillar 2 */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid var(--border-subtle)",
            padding: "clamp(1.25rem, 3.5vw, 2.25rem)",
            borderRadius: "2px",
          }}
        >
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              backgroundColor: "rgba(147, 87, 66, 0.1)",
              color: "var(--color-terracotta)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1.25rem",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <h3 style={{ fontSize: "1.25rem", marginBottom: "0.6rem" }}>100% Value Transit Insurance</h3>
          <p style={{ fontSize: "0.92rem", color: "var(--color-ink-light)", lineHeight: 1.65, margin: 0 }}>
            All shipments travel fully insured from our studio threshold until physical handover into
            your care. In the rare event of transit damage, you are protected with comprehensive repair
            or immediate replacement/refund guarantees.
          </p>
        </div>

        {/* Pillar 3 */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid var(--border-subtle)",
            padding: "clamp(1.25rem, 3.5vw, 2.25rem)",
            borderRadius: "2px",
          }}
        >
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              backgroundColor: "rgba(147, 87, 66, 0.1)",
              color: "var(--color-terracotta)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1.25rem",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <h3 style={{ fontSize: "1.25rem", marginBottom: "0.6rem" }}>White-Glove Delivery</h3>
          <p style={{ fontSize: "0.92rem", color: "var(--color-ink-light)", lineHeight: 1.65, margin: 0 }}>
            Within Lagos Metropolitan areas, our in-house art handlers deliver directly to your residence,
            placing works inside your salon and assisting with uncrating and debris removal by prior appointment.
          </p>
        </div>
      </div>

      {/* Shipping Zones & Timelines Table */}
      <div style={{ marginBottom: "5rem" }}>
        <span className="kicker">Transit Schedule & Rates</span>
        <h2 style={{ fontSize: "2rem", marginTop: "0.4rem", marginBottom: "1.5rem" }}>
          Delivery Zones & Timelines
        </h2>

        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              backgroundColor: "#FFFFFF",
              border: "1px solid var(--border-subtle)",
              fontSize: "0.92rem",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "var(--color-gallery-ivory)", borderBottom: "1px solid var(--border-subtle)", textAlign: "left" }}>
                <th style={{ padding: "1rem 1.25rem", fontWeight: 600 }}>Destination Zone</th>
                <th style={{ padding: "1rem 1.25rem", fontWeight: 600 }}>Courier Partner</th>
                <th style={{ padding: "1rem 1.25rem", fontWeight: 600 }}>Estimated Transit</th>
                <th style={{ padding: "1rem 1.25rem", fontWeight: 600 }}>Base Crating & Transit</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                <td style={{ padding: "1.25rem", fontWeight: 500 }}>Lagos Metropolitan (White-Glove)</td>
                <td style={{ padding: "1.25rem" }}>Dedicated Warmthplace Courier</td>
                <td style={{ padding: "1.25rem" }}>1–2 Business Days</td>
                <td style={{ padding: "1.25rem" }}>₦15,000 (Free over ₦2,000,000)</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                <td style={{ padding: "1.25rem", fontWeight: 500 }}>Nigeria (Interstate Insured)</td>
                <td style={{ padding: "1.25rem" }}>Tracked Secure Art Logistics</td>
                <td style={{ padding: "1.25rem" }}>3–5 Business Days</td>
                <td style={{ padding: "1.25rem" }}>₦35,000 (Free over ₦3,500,000)</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                <td style={{ padding: "1.25rem", fontWeight: 500 }}>United Kingdom & Europe</td>
                <td style={{ padding: "1.25rem" }}>DHL Express Fine Art Cargo</td>
                <td style={{ padding: "1.25rem" }}>4–7 Business Days</td>
                <td style={{ padding: "1.25rem" }}>₦145,000 (~$95 USD)</td>
              </tr>
              <tr>
                <td style={{ padding: "1.25rem", fontWeight: 500 }}>North America & Global Destinations</td>
                <td style={{ padding: "1.25rem" }}>DHL Express & Global Art Handlers</td>
                <td style={{ padding: "1.25rem" }}>5–9 Business Days</td>
                <td style={{ padding: "1.25rem" }}>₦185,000 (~$120 USD)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Customs, Duties & Export Clearance Anchor */}
      <div id="customs" style={{ marginBottom: "5rem", scrollMarginTop: "120px" }}>
        <div
          style={{
            backgroundColor: "var(--color-gallery-ivory)",
            border: "1px solid var(--border-subtle)",
            padding: "clamp(2rem, 4vw, 3.5rem)",
            borderRadius: "2px",
          }}
        >
          <span className="kicker" style={{ color: "var(--color-terracotta)" }}>
            Cross-Border Logistics
          </span>
          <h2 style={{ fontSize: "1.85rem", marginTop: "0.4rem", marginBottom: "1.25rem" }}>
            Customs Clearance, Duties & Export Permits
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: "2rem" }}>
            <div>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
                National Antiquities Clearance & Export Documentation
              </h3>
              <p style={{ fontSize: "0.92rem", lineHeight: 1.7, color: "var(--color-ink-light)", margin: 0 }}>
                Every contemporary artwork leaving Nigeria is accompanied by formal documentation issued
                in accordance with Nigerian export regulations certifying it as contemporary fine art
                produced by living masters (distinct from regulated antiquities). This documentation guarantees
                smooth transit through international borders.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
                Tariff Classification & Local Import Duties
              </h3>
              <p style={{ fontSize: "0.92rem", lineHeight: 1.7, color: "var(--color-ink-light)", margin: 0 }}>
                Original paintings and sculptures are generally classified internationally under Harmonized
                System (HS) Code 9701 (Works of Art), which enjoy duty-free or reduced VAT status in many
                jurisdictions including the United States, UK, and European Union. Local VAT or customs
                brokerage fees remain the collector’s responsibility, and our concierge provides guidance throughout.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Return & Inspection Policy */}
      <div>
        <span className="kicker">Peace of Mind Guarantee</span>
        <h2 style={{ fontSize: "1.85rem", marginTop: "0.4rem", marginBottom: "1.25rem" }}>
          14-Day Curatorial Inspection & Returns Protocol
        </h2>

        <div style={{ maxWidth: "800px", fontSize: "0.95rem", lineHeight: 1.75, color: "var(--color-ink-light)" }}>
          <p>
            We want every collector to feel absolute confidence in their acquisition. Upon delivery,
            you have <strong>14 calendar days</strong> to inspect the artwork in your intended living space.
          </p>
          <p>
            If a work does not harmonize with your interior architecture, you may initiate a return for
            store credit or exchange, provided the work is in pristine, unaltered condition in its original
            crating. Due to the high-value logistics involved, return transit and insurance costs are borne
            by the collector, unless the return is due to transit discrepancy.
          </p>
          <p>
            To initiate an inspection review or coordinate return freight, please contact our Curatorial
            Concierge at{" "}
            <a href="mailto:nkempearl2@gmail.com" style={{ color: "var(--color-terracotta)", textDecoration: "underline" }}>
              nkempearl2@gmail.com
            </a>{" "}
            or speak directly with your dedicated curator.
          </p>

          <div style={{ marginTop: "2rem" }}>
            <Link href="/contact" className="btn btn-secondary">
              Contact Curatorial Concierge →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
