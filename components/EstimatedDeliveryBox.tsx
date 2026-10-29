"use client";

import React, { useState, useEffect } from "react";

interface EstimatedDeliveryBoxProps {
  shippingClass?: string;
  isOriginal?: boolean;
}

export function EstimatedDeliveryBox({
  shippingClass = "FRAGILE",
  isOriginal = true,
}: EstimatedDeliveryBoxProps) {
  const [region, setRegion] = useState<"nigeria" | "uk_eu" | "us_ca" | "global">("nigeria");
  const [dates, setDates] = useState<{ start: string; end: string; days: string }>({
    start: "5 business days",
    end: "7 business days",
    days: "5–7 Business Days",
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Calculate realistic delivery date range based on selected region
    const now = new Date();

    const getRegionalOffset = () => {
      switch (region) {
        case "nigeria":
          return { minDays: 2, maxDays: 4, daysLabel: "2–4 Business Days" };
        case "uk_eu":
          return { minDays: 5, maxDays: 7, daysLabel: "5–7 Business Days" };
        case "us_ca":
          return { minDays: 5, maxDays: 8, daysLabel: "5–8 Business Days" };
        case "global":
        default:
          return { minDays: 6, maxDays: 9, daysLabel: "6–9 Business Days" };
      }
    };

    const { minDays, maxDays, daysLabel } = getRegionalOffset();

    // Add business days (skipping weekends)
    const addBusinessDays = (startDate: Date, numDays: number) => {
      let count = 0;
      const cur = new Date(startDate);
      while (count < numDays) {
        cur.setDate(cur.getDate() + 1);
        const dayOfWeek = cur.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
          count++;
        }
      }
      return cur;
    };

    const minDate = addBusinessDays(now, minDays);
    const maxDate = addBusinessDays(now, maxDays);

    const formatter = new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

    setDates({
      start: formatter.format(minDate),
      end: formatter.format(maxDate),
      days: daysLabel,
    });
  }, [region]);

  return (
    <div
      style={{
        backgroundColor: "var(--color-canvas-pure)",
        border: "1px solid var(--border-medium)",
        borderRadius: "3px",
        padding: "clamp(1rem, 3vw, 1.25rem) clamp(1rem, 3.5vw, 1.5rem)",
        marginBottom: "2rem",
        boxShadow: "0 4px 15px rgba(36, 34, 30, 0.03)",
      }}
    >
      {/* Top Header: Delivery Estimate & Days */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          borderBottom: "1px solid var(--border-subtle)",
          paddingBottom: "0.85rem",
          marginBottom: "1rem",
          flexWrap: "wrap",
          gap: "0.65rem",
        }}
      >
        <div>
          <span
            style={{
              fontSize: "0.7rem",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "#2E7D32",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "0.35rem",
            }}
          >
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#2E7D32", flexShrink: 0 }} />
            Ready for Dispatch • Tracked Express Delivery
          </span>

          <div
            style={{
              fontSize: "clamp(1rem, 2.8vw, 1.15rem)",
              fontWeight: 600,
              color: "var(--color-ink-charcoal)",
              marginTop: "0.3rem",
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "0.35rem 0.5rem",
            }}
          >
            <span>🚚 Estimated Arrival:</span>
            <span style={{ color: "var(--color-terracotta)" }}>
              {mounted ? `${dates.start} – ${dates.end}` : "5–7 Business Days"}
            </span>
          </div>

          <div style={{ fontSize: "0.82rem", color: "var(--color-ink-muted)", marginTop: "2px" }}>
            Transit duration: <strong>{mounted ? dates.days : "5–7 Business Days"}</strong> via DHL Express Art Freight
          </div>
        </div>

        {/* Region selector pills */}
        <div style={{ display: "flex", gap: "0.3rem", alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ fontSize: "0.72rem", color: "var(--color-ink-light)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Ship to:
          </span>
          <button
            type="button"
            onClick={() => setRegion("nigeria")}
            style={{
              padding: "0.25rem 0.55rem",
              fontSize: "0.72rem",
              borderRadius: "2px",
              border: region === "nigeria" ? "1px solid var(--color-ink-charcoal)" : "1px solid var(--border-subtle)",
              backgroundColor: region === "nigeria" ? "var(--color-ink-charcoal)" : "transparent",
              color: region === "nigeria" ? "#FFFFFF" : "var(--color-ink-muted)",
              fontWeight: region === "nigeria" ? 600 : 400,
            }}
          >
            Nigeria
          </button>
          <button
            type="button"
            onClick={() => setRegion("uk_eu")}
            style={{
              padding: "0.25rem 0.55rem",
              fontSize: "0.72rem",
              borderRadius: "2px",
              border: region === "uk_eu" ? "1px solid var(--color-ink-charcoal)" : "1px solid var(--border-subtle)",
              backgroundColor: region === "uk_eu" ? "var(--color-ink-charcoal)" : "transparent",
              color: region === "uk_eu" ? "#FFFFFF" : "var(--color-ink-muted)",
              fontWeight: region === "uk_eu" ? 600 : 400,
            }}
          >
            UK &amp; Europe
          </button>
          <button
            type="button"
            onClick={() => setRegion("us_ca")}
            style={{
              padding: "0.25rem 0.55rem",
              fontSize: "0.72rem",
              borderRadius: "2px",
              border: region === "us_ca" ? "1px solid var(--color-ink-charcoal)" : "1px solid var(--border-subtle)",
              backgroundColor: region === "us_ca" ? "var(--color-ink-charcoal)" : "transparent",
              color: region === "us_ca" ? "#FFFFFF" : "var(--color-ink-muted)",
              fontWeight: region === "us_ca" ? 600 : 400,
            }}
          >
            US &amp; Canada
          </button>
          <button
            type="button"
            onClick={() => setRegion("global")}
            style={{
              padding: "0.25rem 0.55rem",
              fontSize: "0.72rem",
              borderRadius: "2px",
              border: region === "global" ? "1px solid var(--color-ink-charcoal)" : "1px solid var(--border-subtle)",
              backgroundColor: region === "global" ? "var(--color-ink-charcoal)" : "transparent",
              color: region === "global" ? "#FFFFFF" : "var(--color-ink-muted)",
              fontWeight: region === "global" ? 600 : 400,
            }}
          >
            Global
          </button>
        </div>
      </div>

      {/* 3-Step Delivery & Crating Timeline */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "1rem",
          position: "relative",
          marginBottom: "1rem",
        }}
      >
        {/* Step 1 */}
        <div style={{ display: "flex", gap: "0.65rem", alignItems: "flex-start" }}>
          <div
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              backgroundColor: "rgba(166, 75, 50, 0.12)",
              color: "var(--color-terracotta)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.75rem",
              fontWeight: 700,
              flexShrink: 0,
              marginTop: "2px",
            }}
          >
            1
          </div>
          <div>
            <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--color-ink-charcoal)" }}>
              Order &amp; Authenticate
            </div>
            <div style={{ fontSize: "0.74rem", color: "var(--color-ink-muted)", lineHeight: 1.4 }}>
              Studio certificate signed &amp; embossed today
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div style={{ display: "flex", gap: "0.65rem", alignItems: "flex-start" }}>
          <div
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              backgroundColor: "rgba(166, 75, 50, 0.12)",
              color: "var(--color-terracotta)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.75rem",
              fontWeight: 700,
              flexShrink: 0,
              marginTop: "2px",
            }}
          >
            2
          </div>
          <div>
            <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--color-ink-charcoal)" }}>
              Timber Crating &amp; Dispatch
            </div>
            <div style={{ fontSize: "0.74rem", color: "var(--color-ink-muted)", lineHeight: 1.4 }}>
              Custom archival foam crate leaves within 24–48h
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div style={{ display: "flex", gap: "0.65rem", alignItems: "flex-start" }}>
          <div
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              backgroundColor: "rgba(46, 125, 50, 0.12)",
              color: "#2E7D32",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.75rem",
              fontWeight: 700,
              flexShrink: 0,
              marginTop: "2px",
            }}
          >
            3
          </div>
          <div>
            <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--color-ink-charcoal)" }}>
              White-Glove Handover
            </div>
            <div style={{ fontSize: "0.74rem", color: "#2E7D32", fontWeight: 500, lineHeight: 1.4 }}>
              Arrives {mounted ? `${dates.start} – ${dates.end}` : dates.days}
            </div>
          </div>
        </div>
      </div>

      {/* Trust & Dispatch guarantees strip */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "0.75rem",
          borderTop: "1px solid var(--border-subtle)",
          fontSize: "0.75rem",
          color: "var(--color-ink-muted)",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <span>🛡️ <strong>100% In-Transit Insurance:</strong> Fully covered against loss or damage</span>
        <span>📍 <strong>Tracking Code:</strong> Sent via email &amp; SMS upon dispatch</span>
        <span>🔄 <strong>14-Day View:</strong> Private in-situ evaluation</span>
      </div>
    </div>
  );
}
