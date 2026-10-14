"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartContext";
import { useCurrency } from "@/components/CurrencyContext";
import { BASE_CURRENCY } from "@/lib/constants";
import { formatPrice } from "@/lib/currency";

export default function CartPage() {
  const { items, totals, updateQuantity, removeItem } = useCart();
  const { format, currency } = useCurrency();

  const [destinationCountry, setDestinationCountry] = useState("NG");
  const [shippingQuote, setShippingQuote] = useState<{
    zoneName: string;
    estimate: string;
    totalShipping: number;
    isFree: boolean;
  } | null>(null);
  const [loadingQuote, setLoadingQuote] = useState(false);

  // Fetch shipping quote from server
  const handleCalculateShipping = async () => {
    if (items.length === 0) return;
    setLoadingQuote(true);
    try {
      const res = await fetch("/api/shipping/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          country: destinationCountry,
          items: items.map((i) => ({
            shippingClass: i.shippingClass,
            quantity: i.quantity,
            price: i.price,
          })),
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setShippingQuote(data.quote);
      }
    } catch {
      // fallback
    } finally {
      setLoadingQuote(false);
    }
  };

  const calculatedShippingAmount = shippingQuote ? shippingQuote.totalShipping : 0;
  const grandTotal = totals.subtotal + calculatedShippingAmount;

  return (
    <div className="container" style={{ paddingTop: "3rem", paddingBottom: "7rem" }}>
      <header className="catalogue-header" style={{ marginBottom: "3rem" }}>
        <span className="kicker">Acquisitions In Progress</span>
        <h1 style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>
          Your Shopping Bag
        </h1>
        <p>Review selected original artworks and artisanal homeware objects.</p>
      </header>

      {items.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "5rem 1rem",
            backgroundColor: "var(--color-canvas-light)",
            borderRadius: "3px",
            border: "1px dashed var(--border-medium)",
          }}
        >
          <h2 style={{ fontSize: "1.8rem", marginBottom: "0.75rem" }}>
            Your bag is currently empty
          </h2>
          <p style={{ maxWidth: "420px", margin: "0 auto 2rem", color: "var(--color-ink-muted)" }}>
            Explore our curated gallery collection of original African canvases,
            sculptures, ceramics, and textiles.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
            <Link href="/shop/art" className="btn btn-primary">
              Discover Fine Art
            </Link>
            <Link href="/shop/decor" className="btn btn-secondary">
              Explore Home Décor
            </Link>
          </div>
        </div>
      ) : (
        <div className="cart-layout-grid">
          {/* Items List */}
          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "100px 1fr auto",
                    gap: "1.5rem",
                    paddingBottom: "1.5rem",
                    borderBottom: "1px solid var(--border-subtle)",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      aspectRatio: "3 / 4",
                      borderRadius: "2px",
                      overflow: "hidden",
                      background: "#EEEAE1",
                    }}
                  >
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      sizes="100px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>

                  <div>
                    {item.artistName && (
                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--color-ink-light)",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                        }}
                      >
                        {item.artistName}
                      </span>
                    )}
                    <h3
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "1.35rem",
                        marginTop: "2px",
                        marginBottom: "6px",
                      }}
                    >
                      <Link href={`/products/${item.slug}`}>{item.title}</Link>
                    </h3>

                    <div style={{ fontSize: "0.82rem", color: "var(--color-ink-light)", marginBottom: "8px" }}>
                      {item.category.replace(/_/g, " ")} • {item.shippingClass}
                    </div>

                    {/* Quantity Controls */}
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        border: "1px solid var(--border-medium)",
                        borderRadius: "2px",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{ padding: "0.25rem 0.75rem", fontSize: "0.95rem" }}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span
                        style={{
                          padding: "0 0.75rem",
                          fontWeight: 600,
                          fontSize: "0.85rem",
                        }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{ padding: "0.25rem 0.75rem", fontSize: "0.95rem" }}
                        aria-label="Increase quantity"
                        disabled={item.quantity >= item.stock}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        fontSize: "1.15rem",
                        fontWeight: 600,
                        color: "var(--color-ink-charcoal)",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {format(item.price * item.quantity)}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      style={{
                        color: "var(--color-ink-light)",
                        fontSize: "0.78rem",
                        textDecoration: "underline",
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "2rem" }}>
              <Link href="/shop/art" className="btn-text">
                ← Continue Browsing Collection
              </Link>
            </div>
          </div>

          {/* Summary & Shipping Estimator */}
          <div
            style={{
              backgroundColor: "var(--color-canvas-light)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "3px",
              padding: "2rem",
            }}
          >
            <h2 style={{ fontSize: "1.6rem", marginBottom: "1.5rem" }}>
              Order Summary
            </h2>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.75rem",
                fontSize: "0.95rem",
              }}
            >
              <span>Subtotal ({totals.itemCount} items)</span>
              <strong>{format(totals.subtotal)}</strong>
            </div>

            {/* Live Shipping Estimator */}
            <div
              style={{
                padding: "1.25rem 0",
                borderTop: "1px solid var(--border-subtle)",
                borderBottom: "1px solid var(--border-subtle)",
                margin: "1.25rem 0",
              }}
            >
              <label
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                Estimate Shipping by Destination
              </label>

              <div style={{ display: "flex", gap: "0.5rem" }}>
                <select
                  value={destinationCountry}
                  onChange={(e) => setDestinationCountry(e.target.value)}
                  className="form-control"
                  style={{ flexGrow: 1, fontSize: "0.85rem" }}
                  aria-label="Destination country for shipping calculation"
                >
                  <option value="NG">Nigeria (Lagos / Nationwide)</option>
                  <option value="GB">United Kingdom (Air Express)</option>
                  <option value="US">United States (Insured Freight)</option>
                  <option value="CA">Canada (Insured Freight)</option>
                  <option value="FR">France & EU (Air Express)</option>
                  <option value="DE">Germany & EU (Air Express)</option>
                  <option value="GH">Ghana (ECOWAS Priority)</option>
                  <option value="ZA">South Africa (Air Express)</option>
                  <option value="AE">UAE & Middle East</option>
                </select>

                <button
                  type="button"
                  onClick={handleCalculateShipping}
                  className="btn btn-secondary"
                  style={{ padding: "0 1rem", fontSize: "0.75rem" }}
                  disabled={loadingQuote}
                >
                  {loadingQuote ? "..." : "Calculate"}
                </button>
              </div>

              {shippingQuote && (
                <div
                  style={{
                    marginTop: "1rem",
                    padding: "0.85rem",
                    backgroundColor: "#FFFFFF",
                    borderRadius: "2px",
                    border: "1px solid var(--border-subtle)",
                    fontSize: "0.82rem",
                  }}
                >
                  <div style={{ fontWeight: 600, color: "var(--color-ink-charcoal)" }}>
                    {shippingQuote.zoneName}
                  </div>
                  <div style={{ color: "var(--color-ink-muted)", margin: "3px 0 6px" }}>
                    {shippingQuote.estimate}
                  </div>
                  <div style={{ fontWeight: 600, color: "var(--color-terracotta)" }}>
                    {shippingQuote.isFree
                      ? "Complimentary Shipping"
                      : `Shipping: ${format(shippingQuote.totalShipping)}`}
                  </div>
                </div>
              )}
            </div>

            {shippingQuote && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.75rem",
                  fontSize: "0.95rem",
                }}
              >
                <span>Insured Freight</span>
                <strong>
                  {shippingQuote.isFree ? "Free" : format(shippingQuote.totalShipping)}
                </strong>
              </div>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingTop: "1rem",
                borderTop: "2px solid var(--color-ink-charcoal)",
                fontSize: "1.25rem",
                marginBottom: "1.5rem",
              }}
            >
              <span>Estimated Total</span>
              <strong>{format(grandTotal)}</strong>
            </div>

            {currency !== BASE_CURRENCY && (
              <p style={{ fontSize: "0.75rem", color: "var(--color-ink-light)", marginBottom: "1.5rem" }}>
                Official checkout transaction processed in <strong>{formatPrice(grandTotal, BASE_CURRENCY)}</strong>
              </p>
            )}

            <Link href="/checkout" className="btn btn-primary" style={{ width: "100%" }}>
              Proceed to Secure Checkout
            </Link>

            <p
              style={{
                fontSize: "0.72rem",
                color: "var(--color-ink-light)",
                textAlign: "center",
                marginTop: "1.25rem",
                lineHeight: 1.5,
              }}
            >
              Museum-standard crating and international transit insurance included.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
