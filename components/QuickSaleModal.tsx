"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCurrency } from "./CurrencyContext";

const SALE_DURATION_SECONDS = 4 * 3600 + 45 * 60; // 4h 45m
const EXPIRY_STORAGE_KEY = "warmthplace_quick_sale_expiry_v3";
const DISMISSED_STORAGE_KEY = "warmthplace_quick_sale_seen_session_v3";
const CLAIMED_STORAGE_KEY = "warmthplace_quick_sale_claimed_v3";
const DISCOUNT_CODE = "WARMTH10";

const FLASH_DEAL_ITEMS = [
  {
    slug: "white-stags-twilight-glade",
    title: "White Stags Glade",
    image: "/images/catalogue/white-stags-twilight-glade-room.jpg",
    wasKobo: 29000000,
    nowKobo: 26100000,
  },
  {
    slug: "obsidian-storm",
    title: "Obsidian Storm",
    image: "/images/catalogue/obsidian-storm-room.jpg",
    wasKobo: 50000000,
    nowKobo: 45000000,
  },
  {
    slug: "golden-harvest-matriarchs",
    title: "Three Matriarchs",
    image: "/images/catalogue/golden-harvest-matriarchs-room.jpg",
    wasKobo: 60000000,
    nowKobo: 54000000,
  },
];

export function QuickSaleModal() {
  const { format } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(SALE_DURATION_SECONDS);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);

    let expiryTime = 0;
    try {
      const savedExpiry = localStorage.getItem(EXPIRY_STORAGE_KEY);
      const now = Date.now();
      if (savedExpiry && Number(savedExpiry) > now + 60 * 1000) {
        expiryTime = Number(savedExpiry);
      } else {
        expiryTime = now + SALE_DURATION_SECONDS * 1000;
        localStorage.setItem(EXPIRY_STORAGE_KEY, String(expiryTime));
      }
    } catch {
      expiryTime = Date.now() + SALE_DURATION_SECONDS * 1000;
    }

    const updateTimer = () => {
      const now = Date.now();
      const diff = Math.max(0, Math.floor((expiryTime - now) / 1000));
      if (diff <= 0) {
        expiryTime = Date.now() + SALE_DURATION_SECONDS * 1000;
        try {
          localStorage.setItem(EXPIRY_STORAGE_KEY, String(expiryTime));
        } catch {
          // ignore
        }
        setSecondsLeft(SALE_DURATION_SECONDS);
      } else {
        setSecondsLeft(diff);
      }
    };

    updateTimer();
    const timerId = setInterval(updateTimer, 1000);

    let openTimeout: ReturnType<typeof setTimeout> | null = null;
    try {
      const seenSession = sessionStorage.getItem(DISMISSED_STORAGE_KEY);
      if (!seenSession) {
        openTimeout = setTimeout(() => {
          setIsOpen(true);
        }, 1200);
      }
    } catch {
      openTimeout = setTimeout(() => {
        setIsOpen(true);
      }, 1200);
    }

    return () => {
      clearInterval(timerId);
      if (openTimeout) clearTimeout(openTimeout);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    try {
      sessionStorage.setItem(DISMISSED_STORAGE_KEY, "true");
    } catch {
      // ignore
    }
  };

  const handleClaim = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(DISCOUNT_CODE);
    }
    setCopied(true);
    try {
      localStorage.setItem(CLAIMED_STORAGE_KEY, "true");
    } catch {
      // ignore
    }
    setTimeout(() => setCopied(false), 2500);
  };

  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;
  const pad = (n: number) => String(n).padStart(2, "0");

  if (!mounted) return null;

  return (
    <>
      {/* COMPACT FLOATING CORNER COUPON WIDGET (Jumia / Temu style) */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.85, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 12 }}
            transition={{ type: "spring", stiffness: 420, damping: 26 }}
            onClick={() => setIsOpen(true)}
            className="jtk-floating-widget"
            aria-label="Open 10% Flash Sale Coupon"
          >
            <span className="jtk-widget-tag">⚡ -10%</span>
            <span className="jtk-widget-info">
              <span className="jtk-widget-title">Flash Deal</span>
              <span className="jtk-widget-timer">
                {pad(hours)}:{pad(minutes)}:{pad(seconds)}
              </span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* JUMIA / TEMU / KONGA STYLE COMPACT FLASH COUPON POP-UP */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="jtk-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="jtk-popup-title"
          >
            <motion.div
              className="jtk-popup-wrap"
              initial={{ opacity: 0, scale: 0.86, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 12 }}
              transition={{ type: "spring", stiffness: 420, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="jtk-card">
                {/* TOP FLASH HEADER BANNER */}
                <div className="jtk-header">
                  <div className="jtk-header-top">
                    <span className="jtk-flash-pill">⚡ FLASH SALE</span>
                    <div className="jtk-timer-inline" aria-label="Time remaining">
                      <span className="jtk-timer-label">Ends in</span>
                      <span className="jtk-t-box">{pad(hours)}</span>
                      <span className="jtk-t-sep">:</span>
                      <span className="jtk-t-box">{pad(minutes)}</span>
                      <span className="jtk-t-sep">:</span>
                      <span className="jtk-t-box jtk-t-sec">{pad(seconds)}</span>
                    </div>
                  </div>

                  <h3 id="jtk-popup-title" className="jtk-headline">
                    <span className="jtk-big-pct">10% OFF</span> ALL ART &amp; PRINTS
                  </h3>
                  <p className="jtk-sub">
                    Limited-time collector voucher • Originals &amp; Editions
                  </p>
                </div>

                {/* BODY: COUPON TICKET + 3 TINY FLASH THUMBNAILS */}
                <div className="jtk-body">
                  {/* Perforated Coupon Ticket */}
                  <div className="jtk-coupon">
                    <div className="jtk-coupon-left">
                      <span className="jtk-coupon-badge">10% OFF</span>
                      <div className="jtk-coupon-meta">
                        <span className="jtk-coupon-code">CODE: {DISCOUNT_CODE}</span>
                        <span className="jtk-coupon-desc">Valid sitewide today</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleClaim}
                      className={`jtk-copy-btn ${copied ? "copied" : ""}`}
                    >
                      {copied ? "✓ CLAIMED" : "CLAIM"}
                    </button>
                  </div>

                  {/* 3-Item Mini Flash Grid (52px thumbnails) */}
                  <div className="jtk-mini-grid">
                    {FLASH_DEAL_ITEMS.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/products/${item.slug}`}
                        onClick={() => {
                          handleClaim();
                          handleClose();
                        }}
                        className="jtk-mini-item"
                      >
                        <div className="jtk-mini-thumb">
                          <Image
                            src={item.image}
                            alt={item.title}
                            width={64}
                            height={64}
                            style={{ objectFit: "cover", width: "100%", height: "100%" }}
                          />
                          <span className="jtk-mini-badge">-10%</span>
                        </div>
                        <div className="jtk-mini-price">
                          <strong>{format(item.nowKobo)}</strong>
                          <del>{format(item.wasKobo)}</del>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Primary Action CTA */}
                  <Link
                    href="/shop/art"
                    onClick={() => {
                      handleClaim();
                      handleClose();
                    }}
                    className="jtk-cta-btn"
                  >
                    {copied ? "✓ CODE COPIED — SHOP NOW →" : "CLAIM 10% OFF & SHOP NOW →"}
                  </Link>
                </div>
              </div>

              {/* Temu / Jumia style bottom circular close button */}
              <button
                type="button"
                onClick={handleClose}
                className="jtk-close-circle"
                aria-label="Close Flash Sale Popup"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
