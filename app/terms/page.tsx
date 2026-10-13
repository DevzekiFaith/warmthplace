import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Terms of Service & Authenticity Guarantee | ${SITE_NAME}`,
  description:
    "Official terms governing artwork acquisitions, authenticity guarantees, provenance documentation, copyright retention, and studio policies.",
};

export default function TermsPage() {
  return (
    <div className="container" style={{ paddingTop: "3rem", paddingBottom: "7rem", maxWidth: "860px" }}>
      {/* Header */}
      <div style={{ marginBottom: "3.5rem" }}>
        <span className="kicker">Legal & Curatorial Transparency</span>
        <h1
          style={{
            fontSize: "clamp(2.4rem, 4.5vw, 3.6rem)",
            lineHeight: 1.15,
            marginTop: "0.5rem",
            marginBottom: "1rem",
          }}
        >
          Terms of Service & Collector Guarantees
        </h1>
        <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "var(--color-ink-muted)" }}>
          Effective Date: January 1, 2026. These terms govern acquisitions, consultations,
          and services facilitated by Warmthplace Art Studio (Victoria Island, Lagos, Nigeria).
        </p>
      </div>

      {/* Section 1: Lifetime Authenticity Guarantee */}
      <div id="authenticity" style={{ marginBottom: "3rem", scrollMarginTop: "120px" }}>
        <div
          style={{
            backgroundColor: "var(--color-gallery-ivory)",
            border: "1px solid var(--border-subtle)",
            padding: "2.25rem",
            borderRadius: "2px",
            marginBottom: "2rem",
          }}
        >
          <span className="kicker" style={{ color: "var(--color-terracotta)" }}>
            Museum Standard
          </span>
          <h2 style={{ fontSize: "1.75rem", marginTop: "0.4rem", marginBottom: "1rem" }}>
            1. Lifetime Authenticity Guarantee & Provenance
          </h2>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.75, color: "var(--color-ink-light)" }}>
            Warmthplace guarantees the authenticity of every artwork, limited edition, and artisan living
            object represented in our gallery in perpetuity. Because we work in direct, exclusive primary-market
            partnership with our roster of living masters and artisanal guilds, every piece comes with an
            unbroken provenance dossier.
          </p>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.75, color: "var(--color-ink-light)", margin: 0 }}>
            Every acquisition includes a signed and sealed <strong>Museum Certificate of Authenticity (CoA)</strong>,
            bearing the artist&apos;s signature or studio mark, registration catalogue number, medium specifications,
            and high-resolution archival photographic provenance.
          </p>
        </div>
      </div>

      {/* Section 2: Acquisition & Payment Protocols */}
      <div style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.6rem", marginBottom: "0.85rem" }}>
          2. Acquisition & Payment Protocols
        </h2>
        <div style={{ fontSize: "0.95rem", lineHeight: 1.75, color: "var(--color-ink-light)" }}>
          <p>
            All prices are stated in Nigerian Naira (NGN), which serves as our official base transaction
            currency. Indicative pricing displayed in United States Dollars (USD), British Pounds (GBP),
            or Euros (EUR) is calculated using real-time market exchange rates for collector convenience.
          </p>
          <p>
            Payment may be remitted via secure card checkout (Paystack), wire transfer to our dedicated
            commercial accounts with Tier-1 Nigerian banking institutions, or through a formal Curatorial
            Invoice. Works remain the legal property of Warmthplace until payment is cleared in full.
          </p>
        </div>
      </div>

      {/* Section 3: Intellectual Property & Copyright */}
      <div style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.6rem", marginBottom: "0.85rem" }}>
          3. Copyright & Intellectual Property
        </h2>
        <div style={{ fontSize: "0.95rem", lineHeight: 1.75, color: "var(--color-ink-light)" }}>
          <p>
            The acquisition of a physical artwork does not convey copyright or reproduction rights.
            All moral and economic copyrights remain vested in the original creating artist and Warmthplace.
            Collectors may not reproduce, license, or commercially exploit images of the acquired artwork
            without prior written consent from the artist or gallery estate.
          </p>
        </div>
      </div>

      {/* Section 4: Shipping, Crating & Transit Risk */}
      <div style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.6rem", marginBottom: "0.85rem" }}>
          4. Crating & Risk Allocation
        </h2>
        <div style={{ fontSize: "0.95rem", lineHeight: 1.75, color: "var(--color-ink-light)" }}>
          <p>
            Warmthplace maintains comprehensive transit insurance up to 100% of declared acquisition value
            throughout the shipping journey. Risk transfers to the collector upon signed delivery confirmation
            by the carrier. Detailed logistics guidelines are available on our{" "}
            <Link href="/shipping-returns" style={{ color: "var(--color-terracotta)", textDecoration: "underline" }}>
              Shipping & Crating Policy
            </Link>
            .
          </p>
        </div>
      </div>

      {/* Section 5: Governing Law & Jurisdiction */}
      <div style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.6rem", marginBottom: "0.85rem" }}>
          5. Governing Law & Dispute Resolution
        </h2>
        <div style={{ fontSize: "0.95rem", lineHeight: 1.75, color: "var(--color-ink-light)" }}>
          <p>
            These Terms of Service are governed by and construed in accordance with the laws of the Federal
            Republic of Nigeria. Any dispute arising out of or in connection with these terms shall first be
            submitted to amicable mediation, failing which it shall be referred to the exclusive jurisdiction
            of the courts in Lagos State, Nigeria.
          </p>
        </div>
      </div>

      {/* Footer Contact */}
      <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "2rem" }}>
        <p style={{ fontSize: "0.85rem", color: "var(--color-ink-light)" }}>
          Questions regarding collector terms or gallery representation agreements should be directed to{" "}
          <a href="mailto:nkempearl2@gmail.com" style={{ color: "var(--color-terracotta)", textDecoration: "underline" }}>
            nkempearl2@gmail.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
