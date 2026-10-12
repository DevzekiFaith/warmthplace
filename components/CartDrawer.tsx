"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "./CartContext";
import { useCurrency } from "./CurrencyContext";
import { BASE_CURRENCY } from "@/lib/constants";
import { formatPrice } from "@/lib/currency";

export function CartDrawer() {
  const { items, totals, isOpen, closeCart, updateQuantity, removeItem } =
    useCart();
  const { format, currency } = useCurrency();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`cart-drawer-backdrop ${isOpen ? "open" : ""}`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <aside
        className={`cart-drawer-panel ${isOpen ? "open" : ""}`}
        role="dialog"
        aria-label="Shopping Bag"
        aria-modal="true"
      >
        {/* Header */}
        <div className="cart-drawer-header">
          <div>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.5rem",
                color: "var(--color-ink-charcoal)",
              }}
            >
              Shopping Bag
            </h2>
            <span
              style={{
                fontSize: "0.78rem",
                color: "var(--color-ink-light)",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              {totals.itemCount} {totals.itemCount === 1 ? "Item" : "Items"}
            </span>
          </div>

          <button
            type="button"
            onClick={closeCart}
            className="action-icon-btn"
            aria-label="Close Shopping Bag"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Items List */}
        <div className="cart-drawer-items">
          {items.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "4rem 1rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1.25rem",
              }}
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-ink-light)"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <p style={{ fontSize: "1.05rem", color: "var(--color-ink-charcoal)" }}>
                Your bag is currently empty.
              </p>
              <p style={{ fontSize: "0.85rem", color: "var(--color-ink-muted)", maxWidth: "260px" }}>
                Explore our curated gallery collection of original African art and artisanal home objects.
              </p>
              <Link
                href="/shop/art"
                onClick={closeCart}
                className="btn btn-secondary"
                style={{ marginTop: "0.5rem" }}
              >
                Discover Art
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="cart-item-row">
                <div className="cart-item-thumb">
                  <Image
                    src={item.imageUrl}
                    alt={item.imageAlt || item.title}
                    fill
                    sizes="80px"
                    style={{ objectFit: "cover" }}
                  />
                </div>

                <div>
                  {item.artistName && (
                    <span
                      style={{
                        fontSize: "0.72rem",
                        color: "var(--color-ink-light)",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        display: "block",
                      }}
                    >
                      {item.artistName}
                    </span>
                  )}
                  <Link
                    href={`/products/${item.slug}`}
                    onClick={closeCart}
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.1rem",
                      color: "var(--color-ink-charcoal)",
                      lineHeight: 1.25,
                      display: "block",
                      marginTop: "2px",
                      marginBottom: "6px",
                    }}
                  >
                    {item.title}
                  </Link>

                  <div
                    style={{
                      fontSize: "0.92rem",
                      fontWeight: 600,
                      color: "var(--color-ink-charcoal)",
                      marginBottom: "8px",
                    }}
                  >
                    {format(item.price * item.quantity)}
                  </div>

                  {/* Quantity controls */}
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
                      style={{
                        padding: "0.2rem 0.55rem",
                        fontSize: "0.85rem",
                        color: "var(--color-ink-charcoal)",
                      }}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span
                      style={{
                        padding: "0 0.55rem",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        minWidth: "22px",
                        textAlign: "center",
                      }}
                    >
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      style={{
                        padding: "0.2rem 0.55rem",
                        fontSize: "0.85rem",
                        color: "var(--color-ink-charcoal)",
                      }}
                      aria-label="Increase quantity"
                      disabled={item.quantity >= item.stock}
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  style={{
                    color: "var(--color-ink-light)",
                    fontSize: "0.8rem",
                    padding: "0.2rem",
                  }}
                  title="Remove item"
                  aria-label={`Remove ${item.title}`}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Subtotal & Checkout Actions */}
        {items.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-subtotal-row">
              <span className="cart-subtotal-label">Subtotal</span>
              <span className="cart-subtotal-amount">
                {format(totals.subtotal)}
              </span>
            </div>

            {currency !== BASE_CURRENCY && (
              <p
                style={{
                  fontSize: "0.72rem",
                  color: "var(--color-ink-light)",
                  marginBottom: "1rem",
                }}
              >
                Checkout is processed in official store base currency:{" "}
                <strong>{formatPrice(totals.subtotal, BASE_CURRENCY)}</strong>
              </p>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="btn btn-primary"
                style={{ width: "100%" }}
              >
                Proceed to Checkout
              </Link>
              <Link
                href="/cart"
                onClick={closeCart}
                className="btn btn-secondary"
                style={{ width: "100%", fontSize: "0.75rem", padding: "0.75rem" }}
              >
                View Bag & Shipping Calculator
              </Link>
            </div>

            <p
              style={{
                fontSize: "0.72rem",
                color: "var(--color-ink-light)",
                textAlign: "center",
                marginTop: "1rem",
              }}
            >
              Museum-grade crating & international insured transit guaranteed.
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
