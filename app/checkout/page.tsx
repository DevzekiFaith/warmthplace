"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/CartContext";
import { useCurrency } from "@/components/CurrencyContext";

interface ShippingOption {
  id: string;
  name: string;
  baseCost: number; // in NGN
  freeOver: number; // in NGN
  estimate: string;
}

const SHIPPING_OPTIONS: ShippingOption[] = [
  {
    id: "lagos",
    name: "Lagos Metropolitan (White-Glove Courier)",
    baseCost: 15000,
    freeOver: 2000000,
    estimate: "1–2 business days via specialized art courier",
  },
  {
    id: "interstate",
    name: "Nigeria (Interstate Insured Delivery)",
    baseCost: 35000,
    freeOver: 3500000,
    estimate: "3–5 business days, fully crated and insured",
  },
  {
    id: "uk_europe",
    name: "United Kingdom & Europe (Air Cargo Express)",
    baseCost: 145000,
    freeOver: 999999999,
    estimate: "4–7 business days via DHL Express / Art Logistics. Includes export permits.",
  },
  {
    id: "global",
    name: "North America & Global (Fine Art Logistics)",
    baseCost: 185000,
    freeOver: 999999999,
    estimate: "5–9 business days with customs clearance assistance & museum-grade crating",
  },
];

export default function CheckoutPage() {
  const { items, totals, clearCart } = useCart();
  const { format } = useCurrency();

  const [selectedZone, setSelectedZone] = useState<string>("lagos");
  const [paymentMethod, setPaymentMethod] = useState<"paystack" | "bank_transfer" | "concierge_invoice">("paystack");
  const [collector, setCollector] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "Nigeria",
    postalCode: "",
    specialInstructions: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderSummary, setOrderSummary] = useState<{
    orderId: string;
    finalTotal: number;
    shippingCost: number;
    zoneName: string;
  } | null>(null);

  const activeZone = SHIPPING_OPTIONS.find((z) => z.id === selectedZone) || SHIPPING_OPTIONS[0];

  // Calculate shipping cost based on subtotal (in NGN, items prices are in NGN)
  const isFreeShipping = totals.subtotal >= activeZone.freeOver;
  const shippingCost = isFreeShipping ? 0 : activeZone.baseCost;
  const grandTotal = totals.subtotal + shippingCost;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedOrderId = `WP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setOrderSummary({
        orderId: generatedOrderId,
        finalTotal: grandTotal,
        shippingCost,
        zoneName: activeZone.name,
      });
      setIsSubmitting(false);
      setOrderComplete(true);
      clearCart();
    }, 1200);
  };

  if (orderComplete && orderSummary) {
    return (
      <div className="container" style={{ paddingTop: "4rem", paddingBottom: "7rem", maxWidth: "800px" }}>
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid var(--border-subtle)",
            padding: "clamp(2.5rem, 5vw, 4rem)",
            borderRadius: "2px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              backgroundColor: "rgba(147, 87, 66, 0.12)",
              color: "var(--color-terracotta)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.5rem",
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <span className="kicker">Acquisition Confirmed</span>
          <h1 style={{ fontSize: "2.4rem", marginTop: "0.5rem", marginBottom: "1rem" }}>
            Order #{orderSummary.orderId}
          </h1>

          <p style={{ color: "var(--color-ink-muted)", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "2rem" }}>
            Thank you, <strong>{collector.fullName || "Valued Collector"}</strong>. Your acquisition dossier has been
            created and our studio crating department has reserved your selected works.
          </p>

          <div
            style={{
              backgroundColor: "var(--color-gallery-ivory)",
              border: "1px solid var(--border-subtle)",
              padding: "1.75rem",
              borderRadius: "2px",
              textAlign: "left",
              marginBottom: "2.5rem",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem", fontSize: "0.95rem" }}>
              <span style={{ color: "var(--color-ink-light)" }}>Delivery Method:</span>
              <span style={{ fontWeight: 500 }}>{orderSummary.zoneName}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem", fontSize: "0.95rem" }}>
              <span style={{ color: "var(--color-ink-light)" }}>Transit & Crating:</span>
              <span style={{ fontWeight: 500 }}>
                {orderSummary.shippingCost === 0 ? "Complimentary Crated Transit" : format(orderSummary.shippingCost)}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem", fontSize: "0.95rem" }}>
              <span style={{ color: "var(--color-ink-light)" }}>Payment Protocol:</span>
              <span style={{ fontWeight: 500, textTransform: "capitalize" }}>
                {paymentMethod.replace("_", " ")}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingTop: "1rem",
                borderTop: "1px solid var(--border-subtle)",
                fontSize: "1.2rem",
                fontWeight: 600,
                color: "var(--color-ink-charcoal)",
              }}
            >
              <span>Total Acquired:</span>
              <span style={{ color: "var(--color-terracotta)" }}>{format(orderSummary.finalTotal)}</span>
            </div>
          </div>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/" className="btn btn-primary" style={{ padding: "0.9rem 2rem" }}>
              Return to Art House Home
            </Link>
            <Link href="/shop/art" className="btn btn-secondary" style={{ padding: "0.9rem 2rem" }}>
              Explore More Works
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container" style={{ paddingTop: "5rem", paddingBottom: "7rem", textAlign: "center", maxWidth: "600px" }}>
        <span className="kicker">Curated Checkout</span>
        <h1 style={{ fontSize: "2.4rem", marginTop: "0.5rem", marginBottom: "1rem" }}>
          Your Acquisition Bag is Empty
        </h1>
        <p style={{ color: "var(--color-ink-muted)", lineHeight: 1.7, marginBottom: "2.5rem" }}>
          You have not added any artworks or living objects to your checkout bag yet.
          Explore our current gallery catalogue or curated suites to begin your collection.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/shop/art" className="btn btn-primary">
            Explore Original Art →
          </Link>
          <Link href="/shop/decor" className="btn btn-secondary">
            Explore Living Décor →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: "3rem", paddingBottom: "7rem" }}>
      {/* Checkout Title */}
      <div style={{ marginBottom: "3rem" }}>
        <span className="kicker">Direct Studio Fulfillment</span>
        <h1 style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)", marginTop: "0.4rem" }}>
          Curated Collector Checkout
        </h1>
        <p style={{ color: "var(--color-ink-light)", marginTop: "0.5rem" }}>
          Museum Certificate of Authenticity and insured crating included with every dispatch.
        </p>
      </div>

      <form onSubmit={handlePlaceOrder}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "clamp(2rem, 4vw, 4rem)",
            alignItems: "start",
          }}
        >
          {/* Left Column: Collector Details & Shipping & Payment */}
          <div>
            {/* 1. Collector Contact Information */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid var(--border-subtle)",
                padding: "2rem",
                borderRadius: "2px",
                marginBottom: "2rem",
              }}
            >
              <h2 style={{ fontSize: "1.35rem", marginBottom: "1.5rem" }}>
                1. Collector Information
              </h2>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.76rem", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600, marginBottom: "0.35rem" }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={collector.fullName}
                    onChange={(e) => setCollector({ ...collector, fullName: e.target.value })}
                    placeholder="e.g. Tariq Adeleke"
                    style={{ width: "100%", padding: "0.8rem", border: "1px solid var(--border-subtle)", borderRadius: "2px" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.76rem", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600, marginBottom: "0.35rem" }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={collector.email}
                    onChange={(e) => setCollector({ ...collector, email: e.target.value })}
                    placeholder="collector@domain.com"
                    style={{ width: "100%", padding: "0.8rem", border: "1px solid var(--border-subtle)", borderRadius: "2px" }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.76rem", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600, marginBottom: "0.35rem" }}>
                  Phone / WhatsApp (for white-glove courier) *
                </label>
                <input
                  type="tel"
                  required
                  value={collector.phone}
                  onChange={(e) => setCollector({ ...collector, phone: e.target.value })}
                  placeholder="+234 800 000 0000"
                  style={{ width: "100%", padding: "0.8rem", border: "1px solid var(--border-subtle)", borderRadius: "2px" }}
                />
              </div>
            </div>

            {/* 2. Delivery & Crating Destination */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid var(--border-subtle)",
                padding: "2rem",
                borderRadius: "2px",
                marginBottom: "2rem",
              }}
            >
              <h2 style={{ fontSize: "1.35rem", marginBottom: "1.5rem" }}>
                2. Shipping & Crated Transit
              </h2>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", fontSize: "0.76rem", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600, marginBottom: "0.5rem" }}>
                  Select Shipping Zone *
                </label>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {SHIPPING_OPTIONS.map((zone) => {
                    const isZoneFree = totals.subtotal >= zone.freeOver;
                    return (
                      <label
                        key={zone.id}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.85rem",
                          padding: "1rem",
                          border: selectedZone === zone.id ? "1.5px solid var(--color-terracotta)" : "1px solid var(--border-subtle)",
                          backgroundColor: selectedZone === zone.id ? "rgba(147, 87, 66, 0.04)" : "#FFFFFF",
                          borderRadius: "2px",
                          cursor: "pointer",
                        }}
                      >
                        <input
                          type="radio"
                          name="shippingZone"
                          checked={selectedZone === zone.id}
                          onChange={() => setSelectedZone(zone.id)}
                          style={{ marginTop: "0.25rem" }}
                        />
                        <div style={{ flexGrow: 1 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                            <strong style={{ fontSize: "0.92rem" }}>{zone.name}</strong>
                            <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--color-terracotta)" }}>
                              {isZoneFree ? "Free (Orders > ₦2M)" : format(zone.baseCost)}
                            </span>
                          </div>
                          <p style={{ fontSize: "0.8rem", color: "var(--color-ink-light)", margin: "0.25rem 0 0" }}>
                            {zone.estimate}
                          </p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", fontSize: "0.76rem", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600, marginBottom: "0.35rem" }}>
                  Street Delivery Address *
                </label>
                <input
                  type="text"
                  required
                  value={collector.address}
                  onChange={(e) => setCollector({ ...collector, address: e.target.value })}
                  placeholder="Street name, Residence or Private Collection suite"
                  style={{ width: "100%", padding: "0.8rem", border: "1px solid var(--border-subtle)", borderRadius: "2px" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.76rem", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600, marginBottom: "0.35rem" }}>
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={collector.city}
                    onChange={(e) => setCollector({ ...collector, city: e.target.value })}
                    placeholder="Lagos / London / New York"
                    style={{ width: "100%", padding: "0.8rem", border: "1px solid var(--border-subtle)", borderRadius: "2px" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.76rem", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600, marginBottom: "0.35rem" }}>
                    State / Province
                  </label>
                  <input
                    type="text"
                    value={collector.state}
                    onChange={(e) => setCollector({ ...collector, state: e.target.value })}
                    placeholder="Lagos / Greater London"
                    style={{ width: "100%", padding: "0.8rem", border: "1px solid var(--border-subtle)", borderRadius: "2px" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.76rem", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600, marginBottom: "0.35rem" }}>
                    Country *
                  </label>
                  <input
                    type="text"
                    required
                    value={collector.country}
                    onChange={(e) => setCollector({ ...collector, country: e.target.value })}
                    placeholder="Nigeria"
                    style={{ width: "100%", padding: "0.8rem", border: "1px solid var(--border-subtle)", borderRadius: "2px" }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.76rem", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600, marginBottom: "0.35rem" }}>
                  Special Crating / Installation Notes
                </label>
                <textarea
                  rows={2}
                  value={collector.specialInstructions}
                  onChange={(e) => setCollector({ ...collector, specialInstructions: e.target.value })}
                  placeholder="e.g. Guarded gate access, freight elevator required, custom uncrating schedule..."
                  style={{ width: "100%", padding: "0.8rem", border: "1px solid var(--border-subtle)", borderRadius: "2px", resize: "vertical" }}
                />
              </div>
            </div>

            {/* 3. Payment Protocol */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid var(--border-subtle)",
                padding: "2rem",
                borderRadius: "2px",
                marginBottom: "2rem",
              }}
            >
              <h2 style={{ fontSize: "1.35rem", marginBottom: "1.5rem" }}>
                3. Payment Protocol
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <label
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.85rem",
                    padding: "1rem",
                    border: paymentMethod === "paystack" ? "1.5px solid var(--color-terracotta)" : "1px solid var(--border-subtle)",
                    backgroundColor: paymentMethod === "paystack" ? "rgba(147, 87, 66, 0.04)" : "#FFFFFF",
                    borderRadius: "2px",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === "paystack"}
                    onChange={() => setPaymentMethod("paystack")}
                    style={{ marginTop: "0.25rem" }}
                  />
                  <div>
                    <strong style={{ fontSize: "0.95rem" }}>Paystack Secure Payment (Card / Apple Pay / USSD / Bank Transfer)</strong>
                    <p style={{ fontSize: "0.82rem", color: "var(--color-ink-light)", margin: "0.25rem 0 0" }}>
                      Instant confirmation. Supports Naira cards, international Visa, Mastercard, and direct bank wire transfers.
                    </p>
                  </div>
                </label>

                <label
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.85rem",
                    padding: "1rem",
                    border: paymentMethod === "bank_transfer" ? "1.5px solid var(--color-terracotta)" : "1px solid var(--border-subtle)",
                    backgroundColor: paymentMethod === "bank_transfer" ? "rgba(147, 87, 66, 0.04)" : "#FFFFFF",
                    borderRadius: "2px",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === "bank_transfer"}
                    onChange={() => setPaymentMethod("bank_transfer")}
                    style={{ marginTop: "0.25rem" }}
                  />
                  <div>
                    <strong style={{ fontSize: "0.95rem" }}>Direct Bank Transfer — Access Bank</strong>
                    <p style={{ fontSize: "0.82rem", color: "var(--color-ink-light)", margin: "0.25rem 0 0" }}>
                      Recommended for original artwork acquisitions. Please use your order number as payment reference.
                    </p>
                    {paymentMethod === "bank_transfer" && (
                      <div
                        style={{
                          marginTop: "0.85rem",
                          padding: "1rem",
                          backgroundColor: "var(--color-gallery-ivory)",
                          border: "1px solid var(--border-subtle)",
                          borderRadius: "2px",
                          fontSize: "0.88rem",
                          lineHeight: 1.75,
                        }}
                      >
                        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", columnGap: "1.5rem", rowGap: "0.2rem" }}>
                          <span style={{ color: "var(--color-ink-light)", fontWeight: 500 }}>Bank:</span>
                          <span style={{ fontWeight: 600 }}>Access Bank</span>
                          <span style={{ color: "var(--color-ink-light)", fontWeight: 500 }}>Account Name:</span>
                          <span style={{ fontWeight: 600 }}>Agbo Nkem</span>
                          <span style={{ color: "var(--color-ink-light)", fontWeight: 500 }}>Account Number:</span>
                          <span style={{ fontWeight: 700, letterSpacing: "0.08em", color: "var(--color-terracotta)" }}>0044730376</span>
                          <span style={{ color: "var(--color-ink-light)", fontWeight: 500 }}>WhatsApp:</span>
                          <a href="tel:+2348133084124" style={{ color: "inherit", fontWeight: 600 }}>+234 813 308 4124</a>
                        </div>
                        <p style={{ margin: "0.75rem 0 0", fontSize: "0.78rem", color: "var(--color-ink-light)" }}>
                          After transfer, please send your payment confirmation to{" "}
                          <a href="mailto:nkempearl2@gmail.com" style={{ color: "var(--color-terracotta)" }}>nkempearl2@gmail.com</a>{" "}
                          or WhatsApp the above number.
                        </p>
                      </div>
                    )}
                  </div>
                </label>

                <label
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.85rem",
                    padding: "1rem",
                    border: paymentMethod === "concierge_invoice" ? "1.5px solid var(--color-terracotta)" : "1px solid var(--border-subtle)",
                    backgroundColor: paymentMethod === "concierge_invoice" ? "rgba(147, 87, 66, 0.04)" : "#FFFFFF",
                    borderRadius: "2px",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === "concierge_invoice"}
                    onChange={() => setPaymentMethod("concierge_invoice")}
                    style={{ marginTop: "0.25rem" }}
                  />
                  <div>
                    <strong style={{ fontSize: "0.95rem" }}>Curatorial Concierge Invoice (Corporate & Architectural Trade)</strong>
                    <p style={{ fontSize: "0.82rem", color: "var(--color-ink-light)", margin: "0.25rem 0 0" }}>
                      Includes proforma VAT invoice, crating schedule, and trade terms for verified studios.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Acquisition Summary */}
          <div
            style={{
              backgroundColor: "var(--color-gallery-ivory)",
              border: "1px solid var(--border-subtle)",
              padding: "2rem",
              borderRadius: "2px",
              position: "sticky",
              top: "90px",
            }}
          >
            <span className="kicker" style={{ color: "var(--color-terracotta)" }}>
              Order Overview
            </span>
            <h2 style={{ fontSize: "1.4rem", marginTop: "0.3rem", marginBottom: "1.5rem" }}>
              Acquisition Summary ({items.reduce((acc, item) => acc + item.quantity, 0)} items)
            </h2>

            {/* List of items */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.75rem", maxHeight: "320px", overflowY: "auto" }}>
              {items.map((item) => (
                <div key={item.id} style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                  <div style={{ width: "54px", height: "54px", position: "relative", flexShrink: 0, backgroundColor: "#EEEAE1", borderRadius: "2px", overflow: "hidden" }}>
                    <Image src={item.imageUrl} alt={item.title} fill style={{ objectFit: "cover" }} />
                  </div>
                  <div style={{ flexGrow: 1, minWidth: 0 }}>
                    <h4 style={{ fontSize: "0.9rem", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {item.title}
                    </h4>
                    <span style={{ fontSize: "0.78rem", color: "var(--color-ink-light)" }}>
                      Qty: {item.quantity} · {item.department}
                    </span>
                  </div>
                  <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>
                    {format(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Cost Breakdown */}
            <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "1.25rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.92rem" }}>
                <span style={{ color: "var(--color-ink-light)" }}>Artworks Subtotal:</span>
                <span style={{ fontWeight: 500 }}>{format(totals.subtotal)}</span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.92rem" }}>
                <span style={{ color: "var(--color-ink-light)" }}>Crated Transit & Insurance:</span>
                <span style={{ fontWeight: 500, color: shippingCost === 0 ? "var(--color-terracotta)" : "inherit" }}>
                  {shippingCost === 0 ? "Complimentary" : format(shippingCost)}
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  color: "var(--color-ink-charcoal)",
                  paddingTop: "0.75rem",
                  borderTop: "1px solid var(--border-subtle)",
                  marginTop: "0.25rem",
                }}
              >
                <span>Total:</span>
                <span style={{ color: "var(--color-terracotta)" }}>{format(grandTotal)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary"
              style={{ width: "100%", padding: "1.1rem", fontSize: "0.92rem", marginTop: "1.75rem" }}
            >
              {isSubmitting ? "Securing Acquisition..." : `Confirm Acquisition (${format(grandTotal)}) →`}
            </button>

            <div style={{ marginTop: "1.25rem", textAlign: "center" }}>
              <p style={{ fontSize: "0.75rem", color: "var(--color-ink-light)", margin: 0, lineHeight: 1.5 }}>
                🔒 256-Bit Encrypted Curatorial Checkout · Museum Provenance Guaranteed
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
