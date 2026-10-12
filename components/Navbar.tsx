"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "./CartContext";
import { useCurrency } from "./CurrencyContext";

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const { totals, openCart } = useCart();
  const { currency, setCurrency, currencies } = useCurrency();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 380);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Art", href: "/shop/art" },
    { label: "Home Décor", href: "/shop/decor" },
    { label: "Collections", href: "/collections" },
    { label: "Artists", href: "/artists" },
    { label: "Journal", href: "/journal" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  // On the home page, the 1/1 reference mockup displays the initial header.
  // The global gallery navbar glides in smoothly when the collector scrolls into the catalogue.
  if (isHome && !scrolled) {
    return null;
  }

  return (
    <>
      <div
        style={{
          backgroundColor: "var(--color-ink-charcoal)",
          color: "var(--color-gallery-ivory)",
          fontSize: "0.74rem",
          letterSpacing: "0.08em",
          textAlign: "center",
          padding: "0.45rem 1rem",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.5rem",
        }}
      >
        <span>
          Complimentary White-Glove Crated Transit on Orders Over ₦2,000,000
        </span>
        <span style={{ opacity: 0.5 }}>|</span>
        <span style={{ color: "var(--color-muted-brass)" }}>
          Museum Certificate of Authenticity with Every Original Work
        </span>
      </div>

      <header
        className="site-header"
        style={
          isHome
            ? {
                position: "sticky",
                top: 0,
                zIndex: 100,
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                animation: "fadeInDown 0.3s ease",
              }
            : undefined
        }
      >
      <div className="container header-inner">
        {/* Brand Logo & Monogram */}
        <Link href="/" className="brand-monogram">
          {/* Architectural Arch Emblem inspired by reference image */}
          <svg
            className="brand-arch-logo"
            viewBox="0 0 36 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Outer arch */}
            <path
              d="M3 41V18C3 9.71573 9.71573 3 18 3C26.2843 3 33 9.71573 33 18V41"
              stroke="#24221E"
              strokeWidth="1.8"
            />
            {/* Inner arch */}
            <path
              d="M8 41V20C8 14.4772 12.4772 10 18 10C23.5228 10 28 14.4772 28 20V41"
              stroke="#24221E"
              strokeWidth="1.2"
            />
            {/* Central vertical spine / portal accent */}
            <line x1="18" y1="12" x2="18" y2="41" stroke="#A64B32" strokeWidth="1.2" />
            <circle cx="18" cy="6.5" r="1.5" fill="#B89A65" />
          </svg>
          <div className="brand-text">
            <span className="brand-title">Warmthplace</span>
            <span className="brand-subtitle">Art Studio</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav aria-label="Main Navigation">
          <ul className="nav-links">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`nav-link ${isActive ? "active" : ""}`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Action Controls: Currency Switcher, Search, Bag */}
        <div className="header-actions">
          {/* Currency Switcher */}
          <select
            className="currency-select"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            aria-label="Select Currency"
            title="Switch display currency"
          >
            {Object.entries(currencies).map(([code, config]) => (
              <option key={code} value={code}>
                {config.label}
              </option>
            ))}
          </select>

          {/* Search Trigger */}
          <Link
            href="/search"
            className="action-icon-btn"
            aria-label="Search Collection"
            title="Search collection"
          >
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </Link>

          {/* Cart Bag Trigger */}
          <button
            type="button"
            className="action-icon-btn"
            onClick={openCart}
            aria-label={`Shopping bag with ${totals.itemCount} items`}
            title="View shopping bag"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {totals.itemCount > 0 && (
              <span className="cart-count-badge">{totals.itemCount}</span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="action-icon-btn mobile-nav-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {mobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Slideout */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: "var(--color-gallery-ivory)",
            borderBottom: "1px solid var(--border-medium)",
            padding: "1.5rem 2rem 2rem",
          }}
        >
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: "1.2rem",
            }}
          >
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 500,
                    fontFamily: "var(--font-serif)",
                    display: "block",
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li style={{ paddingTop: "0.8rem", borderTop: "1px solid var(--border-subtle)" }}>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                style={{ fontSize: "0.82rem", color: "var(--color-ink-light)" }}
              >
                Curatorial Administration →
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
    </>
  );
}
