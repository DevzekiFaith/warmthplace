"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setSubscribed(true);
        setEmail("");
      }
    } catch {
      // fallback
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="site-footer">
      <div className="container">
        {/* Main 4-Column Grid */}
        <div className="footer-main-grid">
          {/* Brand Column */}
          <div className="footer-brand-col">
            <h3 className="footer-brand-title">{SITE_NAME}</h3>
            <p className="footer-brand-tagline">{SITE_TAGLINE}</p>
            <p className="footer-brand-desc">
              A balanced contemporary African art house and homeware studio based
              in Lagos, Nigeria. We bridge fine art curation with sculptural
              living objects for international collectors, interior designers, and
              cultural enthusiasts.
            </p>
            <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem" }}>
              <span style={{ fontSize: "0.82rem", color: "var(--color-muted-brass)" }}>
                Victoria Island, Lagos • Worldwide Insured Dispatch
              </span>
            </div>
          </div>

          {/* Collection Pathways */}
          <div>
            <h4 className="footer-col-title">Art & Living</h4>
            <ul className="footer-links">
              <li>
                <Link href="/shop/art" className="footer-link">
                  Original Paintings
                </Link>
              </li>
              <li>
                <Link href="/shop/art?category=WORK_ON_PAPER" className="footer-link">
                  Works on Paper
                </Link>
              </li>
              <li>
                <Link href="/shop/art?category=SCULPTURE" className="footer-link">
                  Sculpture & Castings
                </Link>
              </li>
              <li>
                <Link href="/shop/decor?category=CERAMICS" className="footer-link">
                  Burnished Ceramics
                </Link>
              </li>
              <li>
                <Link href="/shop/decor?category=TEXTILES" className="footer-link">
                  Handwoven Textiles
                </Link>
              </li>
              <li>
                <Link href="/shop/decor?category=DECORATIVE_OBJECTS" className="footer-link">
                  Cast Brass Accents
                </Link>
              </li>
            </ul>
          </div>

          {/* Curatorial & Editorial */}
          <div>
            <h4 className="footer-col-title">Curatorial</h4>
            <ul className="footer-links">
              <li>
                <Link href="/collections" className="footer-link">
                  Curated Collections
                </Link>
              </li>
              <li>
                <Link href="/artists" className="footer-link">
                  Artists & Makers
                </Link>
              </li>
              <li>
                <Link href="/journal" className="footer-link">
                  Editorial Journal
                </Link>
              </li>
              <li>
                <Link href="/about" className="footer-link">
                  About the Studio House
                </Link>
              </li>
              <li>
                <Link href="/contact" className="footer-link">
                  Commissions & Enquiries
                </Link>
              </li>
              <li>
                <Link href="/admin" className="footer-link" style={{ opacity: 0.6 }}>
                  Curator Access
                </Link>
              </li>
            </ul>
          </div>

          {/* Client Care & Transparency */}
          <div>
            <h4 className="footer-col-title">Collector Care</h4>
            <ul className="footer-links">
              <li>
                <Link href="/shipping-returns" className="footer-link">
                  Shipping & Crating
                </Link>
              </li>
              <li>
                <Link href="/shipping-returns#customs" className="footer-link">
                  Duties & International Transit
                </Link>
              </li>
              <li>
                <Link href="/terms" className="footer-link">
                  Authenticity Guarantee
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="footer-link">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="footer-link">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="footer-link">
                  Concierge Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Box in Footer */}
        <div className="newsletter-box" style={{ marginBottom: "3.5rem" }}>
          <div className="newsletter-content">
            <span className="kicker" style={{ color: "var(--color-muted-brass)" }}>
              The Warmthplace Dispatch
            </span>
            <h3 className="newsletter-title">Stories from the Studio & New Releases</h3>
            <p className="newsletter-desc">
              Receive thoughtful essays on West African art history, early access to
              limited editions, and private views of newly acquired original canvases.
            </p>

            {subscribed ? (
              <div
                style={{
                  padding: "1rem",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "2px",
                  color: "#FFFFFF",
                  fontSize: "0.95rem",
                }}
              >
                Thank you for joining our curatorial circle. We look forward to sharing our journey with you.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="newsletter-form">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="newsletter-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email Address for newsletter"
                />
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Joining..." : "Subscribe"}
                </button>
              </form>
            )}

            <p className="newsletter-consent">
              We respect your privacy. Unsubscribe at any time. No spam, ever.
            </p>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="footer-bottom-row">
          <div>
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </div>

          <div className="footer-currency-notice">
            Base operating currency is Nigerian Naira (NGN). Foreign currency conversions
            are indicative. International orders are handled with museum-grade crating.
          </div>

          <div style={{ display: "flex", gap: "1.5rem" }}>
            <Link href="/privacy" style={{ color: "inherit" }}>
              Privacy
            </Link>
            <Link href="/terms" style={{ color: "inherit" }}>
              Terms
            </Link>
            <Link href="/shipping-returns" style={{ color: "inherit" }}>
              Shipping
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
