import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ContactFormClient } from "@/components/ContactFormClient";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Contact & Private Viewings | ${SITE_NAME}`,
  description:
    "Connect with the Warmthplace Curatorial Team. Arrange private salon viewings in Victoria Island Lagos, enquire about masterworks, or discuss architectural commissions.",
};

export default function ContactPage() {
  return (
    <div className="container" style={{ paddingTop: "3rem", paddingBottom: "7rem" }}>
      {/* Editorial Header */}
      <div style={{ maxWidth: "800px", marginBottom: "4rem" }}>
        <span className="kicker">Direct Curatorial Concierge</span>
        <h1
          style={{
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            lineHeight: 1.15,
            marginTop: "0.5rem",
            marginBottom: "1.25rem",
          }}
        >
          Private Viewings, Acquisitions & Architectural Enquiries
        </h1>
        <p style={{ fontSize: "1.15rem", lineHeight: 1.7, color: "var(--color-ink-muted)" }}>
          Whether you are acquiring a monumental canvas for a private collection, commissioning bespoke
          homeware for an architectural project, or arranging a quiet salon viewing in Lagos, our
          curatorial team is here to assist you.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "clamp(2.5rem, 5vw, 4.5rem)",
          alignItems: "start",
        }}
      >
        {/* Left Column: Studio Information & Curatorial Details */}
        <div>
          <div
            style={{
              backgroundColor: "var(--color-gallery-ivory)",
              border: "1px solid var(--border-subtle)",
              padding: "2.5rem",
              borderRadius: "2px",
              marginBottom: "2.5rem",
            }}
          >
            <span className="kicker" style={{ color: "var(--color-terracotta)" }}>
              Studio & Physical Gallery
            </span>
            <h2 style={{ fontSize: "1.7rem", marginTop: "0.4rem", marginBottom: "1.25rem" }}>
              The Warmthplace Salon
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div>
                <h4 style={{ fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-ink-light)", marginBottom: "0.35rem" }}>
                  Studio Address
                </h4>
                <p style={{ fontSize: "1rem", lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
                  7 Victoria Island Crescent
                  <br />
                  Victoria Island, Lagos, Nigeria
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-ink-light)", marginBottom: "0.35rem" }}>
                  Private Salon Hours
                </h4>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>
                  <strong>Tuesday – Saturday:</strong> 10:00 – 18:00 WAT
                  <br />
                  <strong>Sunday:</strong> 12:00 – 17:00 WAT (By Appointment Only)
                  <br />
                  <strong>Monday:</strong> Curatorial Conservation & Studio Closed
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-ink-light)", marginBottom: "0.35rem" }}>
                  Curatorial Concierge
                </h4>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>
                  Email:{" "}
                  <a href="mailto:concierge@warmthplace.com" style={{ color: "var(--color-terracotta)", textDecoration: "underline" }}>
                    concierge@warmthplace.com
                  </a>
                  <br />
                  Telephone:{" "}
                  <a href="tel:+23418882026" style={{ color: "inherit", fontWeight: 500 }}>
                    +234 1 888 2026
                  </a>
                  <br />
                  WhatsApp Concierge:{" "}
                  <a
                    href="https://wa.me/23418882026?text=Hello%20Warmthplace%20Curatorial%20Team,%20I%20would%20like%20to%20enquire%20about%20a%20work."
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--color-terracotta)", textDecoration: "underline" }}
                  >
                    +234 1 888 2026 (Live Chat)
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Curatorial Services Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div
              style={{
                border: "1px solid var(--border-subtle)",
                padding: "1.75rem",
                borderRadius: "2px",
                backgroundColor: "#FFFFFF",
              }}
            >
              <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                Architectural Trade & Interior Designers
              </h3>
              <p style={{ fontSize: "0.9rem", color: "var(--color-ink-light)", lineHeight: 1.6, margin: 0 }}>
                We partner with residential architects and interior designers globally, offering
                curatorial scale consulting, custom textile sizing, and trade terms for verified studios.
              </p>
            </div>

            <div
              style={{
                border: "1px solid var(--border-subtle)",
                padding: "1.75rem",
                borderRadius: "2px",
                backgroundColor: "#FFFFFF",
              }}
            >
              <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                Museum-Grade White-Glove Crated Transit
              </h3>
              <p style={{ fontSize: "0.9rem", color: "var(--color-ink-light)", lineHeight: 1.6, margin: 0 }}>
                Every artwork ships insured up to full declared value with official certificates of
                authenticity and timber crating. Complimentary transit on orders over ₦2,000,000.
              </p>
              <div style={{ marginTop: "0.75rem" }}>
                <Link href="/shipping-returns" className="btn-text" style={{ fontSize: "0.82rem" }}>
                  Read Shipping & Crating Protocols →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Curatorial Enquiry Form */}
        <div>
          <ContactFormClient />
        </div>
      </div>
    </div>
  );
}
