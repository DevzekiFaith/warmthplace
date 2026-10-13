"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "./CartContext";
import { useCurrency } from "./CurrencyContext";

interface NavLinkItem {
  label: string;
  href: string;
  kicker: string;
}

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchQuery, setMobileSearchQuery] = useState("");
  const { totals, openCart } = useCart();
  const { currency, setCurrency, currencies } = useCurrency();

  // Scroll listener for sticky header styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Handle escape key to close drawer & manage body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks: NavLinkItem[] = [
    { label: "Art", href: "/shop/art", kicker: "Originals & Bronzes" },
    { label: "Home Décor", href: "/shop/decor", kicker: "Ceramics & Textiles" },
    { label: "Collections", href: "/collections", kicker: "Curated Series" },
    { label: "Artists", href: "/artists", kicker: "Studio Masters" },
    { label: "Journal", href: "/journal", kicker: "Curatorial Stories" },
    { label: "About", href: "/about", kicker: "The Art House" },
    { label: "Contact", href: "/contact", kicker: "Private Viewings" },
  ];

  const handleMobileSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileSearchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(mobileSearchQuery.trim())}`);
      setMobileMenuOpen(false);
      setMobileSearchQuery("");
    }
  };

  return (
    <>
      {/* ─── PRINCIPAL SITE HEADER ─── */}
      <header className={`site-header ${scrolled ? "header-scrolled" : ""}`}>
        <div className="container header-inner">
          {/* Brand Logo & Monogram */}
          <Link href="/" className="brand-monogram" aria-label="Warmthplace Arts Home">
            <div className="brand-emblem-wrap">
              <Image
                src="/images/brand/warmthplace-emblem-circle.png"
                alt="Warmthplace Arts Monogram Emblem"
                width={42}
                height={42}
                priority
                className="brand-emblem-img"
              />
            </div>
            <div className="brand-text">
              <span className="brand-title">Warmthplace</span>
              <span className="brand-subtitle">Arts</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav" aria-label="Main Navigation">
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

          {/* Action Controls: Currency Switcher, Search, Bag, Mobile Toggle */}
          <div className="header-actions">
            {/* Desktop / Tablet Currency Switcher */}
            <div className="currency-select-wrap">
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
            </div>

            {/* Search Trigger */}
            <Link
              href="/search"
              className="action-icon-btn"
              aria-label="Search Collection"
              title="Search collection"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </Link>

            {/* Shopping Bag Trigger */}
            <button
              type="button"
              className="action-icon-btn bag-btn"
              onClick={openCart}
              aria-label={`Shopping bag with ${totals.itemCount} items`}
              title="View shopping bag"
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
                aria-hidden="true"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {totals.itemCount > 0 && (
                <span className="cart-count-badge" aria-label={`${totals.itemCount} items in cart`}>
                  {totals.itemCount}
                </span>
              )}
            </button>

            {/* Mobile / Tablet Menu Button */}
            <button
              type="button"
              className={`action-icon-btn mobile-nav-toggle ${mobileMenuOpen ? "is-open" : ""}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
            >
              <span className="hamburger-box">
                <span className="hamburger-inner" />
              </span>
            </button>
          </div>
        </div>

        {/* ─── 3. MOBILE & TABLET DRAWER NAVIGATION ─── */}
        <div
          id="mobile-nav-drawer"
          className={`mobile-drawer-wrapper ${mobileMenuOpen ? "is-visible" : ""}`}
          aria-hidden={!mobileMenuOpen}
        >
          {/* Backdrop */}
          <div
            className="mobile-drawer-backdrop"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Sheet */}
          <div className="mobile-drawer-sheet">
            {/* Mobile Search Form */}
            <form onSubmit={handleMobileSearch} className="mobile-drawer-search">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="mobile-search-icon"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="search"
                className="mobile-search-input"
                placeholder="Search art, ceramics, artists..."
                value={mobileSearchQuery}
                onChange={(e) => setMobileSearchQuery(e.target.value)}
                aria-label="Search collection"
              />
              {mobileSearchQuery && (
                <button
                  type="submit"
                  className="mobile-search-submit"
                  aria-label="Submit Search"
                >
                  Go
                </button>
              )}
            </form>

            {/* Quick Currency Selector Pills */}
            <div className="mobile-currency-bar">
              <span className="mobile-currency-label">Currency</span>
              <div className="mobile-currency-pills">
                {Object.entries(currencies).map(([code, config]) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => setCurrency(code)}
                    className={`mobile-currency-pill ${currency === code ? "active" : ""}`}
                  >
                    {config.symbol} {code}
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation Pathway Links */}
            <nav className="mobile-nav-list" aria-label="Mobile Navigation">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`mobile-nav-item ${isActive ? "active" : ""}`}
                  >
                    <div className="mobile-nav-item-content">
                      <span className="mobile-nav-item-title">{link.label}</span>
                      <span className="mobile-nav-item-kicker">{link.kicker}</span>
                    </div>
                    <span className="mobile-nav-item-arrow" aria-hidden="true">→</span>
                  </Link>
                );
              })}
            </nav>

            {/* Drawer Footer Information */}
            <div className="mobile-drawer-footer">
              <div className="mobile-drawer-contact">
                <span className="mobile-footer-tag">Victoria Island, Lagos</span>
                <span className="mobile-footer-sub">Worldwide Insured Transit</span>
                <a href="mailto:nkempearl2@gmail.com" className="mobile-footer-email">
                  nkempearl2@gmail.com
                </a>
                <a href="tel:+2348133084124" style={{ fontSize: "0.82rem", color: "var(--color-ink-muted)", marginTop: "0.25rem", display: "block" }}>
                  +234 813 308 4124
                </a>
              </div>

              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="mobile-admin-link"
              >
                Curatorial Administration ↗
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
