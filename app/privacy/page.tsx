import React from "react";
import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Privacy Policy & Collector Confidentiality | ${SITE_NAME}`,
  description:
    "How Warmthplace protects collector confidentiality, personal data, transaction security, and provenance records.",
};

export default function PrivacyPage() {
  return (
    <div className="container" style={{ paddingTop: "3rem", paddingBottom: "7rem", maxWidth: "860px" }}>
      {/* Header */}
      <div style={{ marginBottom: "3.5rem" }}>
        <span className="kicker">Confidentiality & Data Protection</span>
        <h1
          style={{
            fontSize: "clamp(2.4rem, 4.5vw, 3.6rem)",
            lineHeight: 1.15,
            marginTop: "0.5rem",
            marginBottom: "1rem",
          }}
        >
          Collector Privacy & Data Policy
        </h1>
        <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "var(--color-ink-muted)" }}>
          Effective Date: January 1, 2026. Warmthplace recognizes that privacy is an essential tenet
          of art collecting. We maintain absolute confidentiality regarding collector identities and holdings.
        </p>
      </div>

      {/* Section 1: Collector Confidentiality */}
      <div style={{ marginBottom: "3rem" }}>
        <div
          style={{
            backgroundColor: "var(--color-gallery-ivory)",
            border: "1px solid var(--border-subtle)",
            padding: "2.25rem",
            borderRadius: "2px",
            marginBottom: "1.5rem",
          }}
        >
          <span className="kicker" style={{ color: "var(--color-terracotta)" }}>
            High-Value Discretion
          </span>
          <h2 style={{ fontSize: "1.75rem", marginTop: "0.4rem", marginBottom: "1rem" }}>
            1. Strict Collector Anonymity
          </h2>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.75, color: "var(--color-ink-light)", margin: 0 }}>
            Warmthplace never publishes, rents, or discloses the identity of private collectors, their
            acquisition values, or their residential locations to third parties, media outlets, or marketing
            agencies. When artworks are published in curatorial monographs, provenance is attributed exclusively
            as &ldquo;Private Collection, [City]&rdquo; unless the collector provides express written instruction otherwise.
          </p>
        </div>
      </div>

      {/* Section 2: Data We Collect */}
      <div style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.6rem", marginBottom: "0.85rem" }}>
          2. Information We Collect
        </h2>
        <div style={{ fontSize: "0.95rem", lineHeight: 1.75, color: "var(--color-ink-light)" }}>
          <p>
            To deliver museum-grade services and fulfill fine art logistics, we collect:
          </p>
          <ul style={{ paddingLeft: "1.5rem", marginTop: "0.5rem", marginBottom: "1rem" }}>
            <li><strong>Contact Information:</strong> Name, email address, telephone/WhatsApp number, and courier destination.</li>
            <li><strong>Transaction Records:</strong> Artworks acquired, certificates of authenticity generated, and invoicing records.</li>
            <li><strong>Curatorial Preferences:</strong> Inquiries regarding specific artists, medium preferences, and architectural projects.</li>
          </ul>
        </div>
      </div>

      {/* Section 3: Payment Gateway Security */}
      <div style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.6rem", marginBottom: "0.85rem" }}>
          3. PCI-DSS Certified Transaction Security
        </h2>
        <div style={{ fontSize: "0.95rem", lineHeight: 1.75, color: "var(--color-ink-light)" }}>
          <p>
            Online card payments are processed via Paystack, a PCI-DSS Level 1 certified payment gateway.
            Warmthplace does not store or process debit or credit card CVV codes or complete primary account
            numbers on our servers. All transactions travel over encrypted TLS 1.3 channels.
          </p>
        </div>
      </div>

      {/* Section 4: Data Retention & Rights */}
      <div style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.6rem", marginBottom: "0.85rem" }}>
          4. Your Rights under NDPR & International Law
        </h2>
        <div style={{ fontSize: "0.95rem", lineHeight: 1.75, color: "var(--color-ink-light)" }}>
          <p>
            Under the Nigeria Data Protection Regulation (NDPR) and corresponding global standards (GDPR),
            you have the right to request access to your stored personal information, request correction of
            inaccurate records, or request deletion of your marketing contact details.
          </p>
          <p>
            To exercise your privacy rights, contact our Data Protection Officer at{" "}
            <a href="mailto:concierge@warmthplace.com" style={{ color: "var(--color-terracotta)", textDecoration: "underline" }}>
              concierge@warmthplace.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
