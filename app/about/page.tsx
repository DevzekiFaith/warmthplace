import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `About ${SITE_NAME} — Curatorial Philosophy & Craft`,
  description:
    "Learn about Warmthplace Art Studio: an African art house bridging fine art authority with contemporary home-lifestyle commerce.",
};

export default function AboutPage() {
  return (
    <div className="container" style={{ paddingTop: "3rem", paddingBottom: "7rem" }}>
      {/* Hero Header */}
      <div style={{ maxWidth: "800px", marginBottom: "4rem" }}>
        <span className="kicker">About the Art House</span>
        <h1
          style={{
            fontSize: "clamp(2.8rem, 5vw, 4.2rem)",
            lineHeight: 1.12,
            marginTop: "0.5rem",
            marginBottom: "1.5rem",
          }}
        >
          African Art. Contemporary Living. Enduring Stories.
        </h1>
        <p style={{ fontSize: "1.2rem", lineHeight: 1.7, color: "var(--color-ink-muted)" }}>
          Warmthplace was founded on a singular conviction: that contemporary African art
          is not a museum artifact to be admired only from afar, but a living, breathing
          presence capable of transforming how we inhabit our daily spaces.
        </p>
      </div>

      {/* Narrative Split 1 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(2.5rem, 5vw, 5rem)",
          alignItems: "center",
          marginBottom: "6rem",
        }}
      >
        <div style={{ position: "relative", height: "480px", borderRadius: "3px", overflow: "hidden" }}>
          <Image
            src="/images/catalogue/harmattan-procession.jpg"
            alt="Warmthplace curatorial gallery canvas"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>

        <div>
          <span className="kicker">Balanced Art House</span>
          <h2 style={{ fontSize: "2.2rem", marginTop: "0.4rem", marginBottom: "1rem" }}>
            The Intersection of Fine Art & Homeware
          </h2>
          <p style={{ fontSize: "1rem", lineHeight: 1.75, marginBottom: "1.25rem" }}>
            Too often, African creativity has been bifurcated by international markets:
            either isolated in austere, high-concept European galleries or reduced to
            souvenir marketplace trinkets.
          </p>
          <p style={{ fontSize: "1rem", lineHeight: 1.75, marginBottom: "1.5rem" }}>
            Warmthplace establishes a balanced third space. We operate with the
            rigorous curatorial standards of an international fine art gallery, while
            simultaneously honouring the tactile materiality of home objects: burnished
            terracotta vessels that ground an entryway, hand-spun cotton throws that drape
            over a sofa, and cast brass pieces that catch the evening light.
          </p>
          <div style={{ borderLeft: "2px solid var(--color-terracotta)", paddingLeft: "1rem" }}>
            <p style={{ fontStyle: "italic", fontFamily: "var(--font-serif)", fontSize: "1.15rem", color: "var(--color-ink-charcoal)" }}>
              &ldquo;We design for the collector who values authentic cultural storytelling as much as architectural harmony.&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Narrative Split 2 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(2.5rem, 5vw, 5rem)",
          alignItems: "center",
          marginBottom: "6rem",
        }}
      >
        <div>
          <span className="kicker">Direct Collaboration</span>
          <h2 style={{ fontSize: "2.2rem", marginTop: "0.4rem", marginBottom: "1rem" }}>
            Ethics, Provenance & Creator Equity
          </h2>
          <p style={{ fontSize: "1rem", lineHeight: 1.75, marginBottom: "1.25rem" }}>
            Every work in our catalogue is sourced through direct, equitable partnerships
            with artists, master weavers, and ceramists in Lagos, Accra, Enugu, and Kumasi.
            We reject the anonymisation of African craftsmanship.
          </p>
          <p style={{ fontSize: "1rem", lineHeight: 1.75, marginBottom: "2rem" }}>
            When you acquire a work through Warmthplace, you receive documented provenance,
            a physical museum Certificate of Authenticity, and the certainty that the
            artist has been fairly remunerated to sustain their multi-generational practice.
          </p>
          <div style={{ display: "flex", gap: "1rem" }}>
            <Link href="/artists" className="btn btn-secondary">
              Meet Our Artists →
            </Link>
            <Link href="/shop/art" className="btn btn-primary">
              View Gallery Works
            </Link>
          </div>
        </div>

        <div style={{ position: "relative", height: "480px", borderRadius: "3px", overflow: "hidden" }}>
          <Image
            src="/images/catalogue/incised-terracotta-vessel.jpg"
            alt="Handcrafted ceramic vessel detail"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>

      {/* Studio Location & Concierge Info */}
      <div
        style={{
          backgroundColor: "var(--color-canvas-light)",
          border: "1px solid var(--border-subtle)",
          borderRadius: "3px",
          padding: "clamp(2.5rem, 5vw, 4rem)",
          textAlign: "center",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <span className="kicker">Private Viewings</span>
        <h2 style={{ fontSize: "2.2rem", marginTop: "0.4rem", marginBottom: "1rem" }}>
          Visit the Studio House in Lagos
        </h2>
        <p style={{ fontSize: "1rem", lineHeight: 1.7, marginBottom: "2rem" }}>
          We welcome collectors, interior architects, and cultural enthusiasts for private
          viewings by appointment at our Victoria Island studio house. International
          consultations are also hosted via private video concierge.
        </p>
        <Link href="/contact" className="btn btn-primary">
          Schedule Private Viewing
        </Link>
      </div>
    </div>
  );
}
