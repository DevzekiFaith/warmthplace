import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Curator Portal & Studio Access | ${SITE_NAME}`,
  description: "Curatorial management dashboard, inventory overview, and studio operations.",
};

export default async function AdminPortalPage() {
  const [totalProducts, totalArtists, totalCollections, totalArticles, recentProducts] =
    await Promise.all([
      prisma.product.count(),
      prisma.artist.count(),
      prisma.collection.count(),
      prisma.article.count(),
      prisma.product.findMany({
        take: 6,
        orderBy: { createdAt: "desc" },
        include: {
          artist: { select: { name: true } },
        },
      }),
    ]);

  return (
    <div className="container" style={{ paddingTop: "3rem", paddingBottom: "7rem" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <span className="kicker" style={{ color: "var(--color-terracotta)" }}>
            Studio Internal Operations
          </span>
          <h1 style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.2rem)", marginTop: "0.4rem" }}>
            Curator & Archive Portal
          </h1>
          <p style={{ color: "var(--color-ink-light)", marginTop: "0.4rem", margin: 0 }}>
            Real-time inventory overview, primary market consignments, and studio dispatch queue.
          </p>
        </div>

        <div>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "0.5rem 1rem",
              backgroundColor: "rgba(34, 197, 94, 0.1)",
              color: "#166534",
              fontSize: "0.82rem",
              fontWeight: 600,
              borderRadius: "999px",
            }}
          >
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#166534" }} />
            Studio Database Online
          </span>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1.5rem",
          marginBottom: "3.5rem",
        }}
      >
        <div style={{ backgroundColor: "#FFFFFF", border: "1px solid var(--border-subtle)", padding: "1.75rem", borderRadius: "2px" }}>
          <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-ink-light)", display: "block" }}>
            Active Artworks & Décor
          </span>
          <span style={{ fontSize: "2.4rem", fontFamily: "var(--font-serif)", fontWeight: 600, display: "block", marginTop: "0.35rem" }}>
            {totalProducts}
          </span>
          <span style={{ fontSize: "0.8rem", color: "var(--color-terracotta)", fontWeight: 500 }}>
            Live in gallery catalogue
          </span>
        </div>

        <div style={{ backgroundColor: "#FFFFFF", border: "1px solid var(--border-subtle)", padding: "1.75rem", borderRadius: "2px" }}>
          <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-ink-light)", display: "block" }}>
            Represented Masters
          </span>
          <span style={{ fontSize: "2.4rem", fontFamily: "var(--font-serif)", fontWeight: 600, display: "block", marginTop: "0.35rem" }}>
            {totalArtists}
          </span>
          <span style={{ fontSize: "0.8rem", color: "var(--color-ink-light)" }}>
            West African studio masters
          </span>
        </div>

        <div style={{ backgroundColor: "#FFFFFF", border: "1px solid var(--border-subtle)", padding: "1.75rem", borderRadius: "2px" }}>
          <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-ink-light)", display: "block" }}>
            Curated Collections
          </span>
          <span style={{ fontSize: "2.4rem", fontFamily: "var(--font-serif)", fontWeight: 600, display: "block", marginTop: "0.35rem" }}>
            {totalCollections}
          </span>
          <span style={{ fontSize: "0.8rem", color: "var(--color-ink-light)" }}>
            Thematic architectural suites
          </span>
        </div>

        <div style={{ backgroundColor: "#FFFFFF", border: "1px solid var(--border-subtle)", padding: "1.75rem", borderRadius: "2px" }}>
          <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-ink-light)", display: "block" }}>
            Editorial Essays
          </span>
          <span style={{ fontSize: "2.4rem", fontFamily: "var(--font-serif)", fontWeight: 600, display: "block", marginTop: "0.35rem" }}>
            {totalArticles}
          </span>
          <span style={{ fontSize: "0.8rem", color: "var(--color-ink-light)" }}>
            Published in Journal
          </span>
        </div>
      </div>

      {/* Catalogue Inventory Table */}
      <div style={{ backgroundColor: "#FFFFFF", border: "1px solid var(--border-subtle)", padding: "2rem", borderRadius: "2px", marginBottom: "3rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h2 style={{ fontSize: "1.4rem", margin: 0 }}>Recent Primary Market Inventory</h2>
            <p style={{ fontSize: "0.85rem", color: "var(--color-ink-light)", margin: "0.25rem 0 0" }}>
              Active stock ready for immediate museum crating and dispatch.
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <Link href="/shop/art" className="btn btn-secondary" style={{ fontSize: "0.78rem", padding: "0.6rem 1rem" }}>
              View Artworks →
            </Link>
            <Link href="/shop/decor" className="btn btn-secondary" style={{ fontSize: "0.78rem", padding: "0.6rem 1rem" }}>
              View Décor →
            </Link>
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" }}>
            <thead>
              <tr style={{ backgroundColor: "var(--color-gallery-ivory)", borderBottom: "1px solid var(--border-subtle)", textAlign: "left" }}>
                <th style={{ padding: "0.85rem 1rem", fontWeight: 600 }}>Artwork Title</th>
                <th style={{ padding: "0.85rem 1rem", fontWeight: 600 }}>Artist / Maker</th>
                <th style={{ padding: "0.85rem 1rem", fontWeight: 600 }}>Department</th>
                <th style={{ padding: "0.85rem 1rem", fontWeight: 600 }}>Type</th>
                <th style={{ padding: "0.85rem 1rem", fontWeight: 600 }}>Stock</th>
                <th style={{ padding: "0.85rem 1rem", fontWeight: 600 }}>Status</th>
                <th style={{ padding: "0.85rem 1rem", fontWeight: 600, textAlign: "right" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentProducts.map((p) => (
                <tr key={p.id} style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                  <td style={{ padding: "0.95rem 1rem", fontWeight: 500 }}>
                    <Link href={`/products/${p.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                      {p.title}
                    </Link>
                  </td>
                  <td style={{ padding: "0.95rem 1rem", color: "var(--color-ink-light)" }}>
                    {p.artist?.name || "Warmthplace Studio"}
                  </td>
                  <td style={{ padding: "0.95rem 1rem" }}>
                    <span style={{ fontSize: "0.75rem", padding: "0.2rem 0.5rem", borderRadius: "2px", backgroundColor: "var(--color-gallery-ivory)" }}>
                      {p.department}
                    </span>
                  </td>
                  <td style={{ padding: "0.95rem 1rem", color: "var(--color-ink-light)" }}>
                    {p.productType}
                  </td>
                  <td style={{ padding: "0.95rem 1rem", fontWeight: 600 }}>
                    {p.stock}
                  </td>
                  <td style={{ padding: "0.95rem 1rem" }}>
                    <span style={{ color: "#166534", fontSize: "0.8rem", fontWeight: 500 }}>
                      ● {p.status}
                    </span>
                  </td>
                  <td style={{ padding: "0.95rem 1rem", textAlign: "right" }}>
                    <Link
                      href={`/products/${p.slug}`}
                      style={{ fontSize: "0.78rem", color: "var(--color-terracotta)", fontWeight: 600, textDecoration: "underline" }}
                    >
                      Inspect Dossier →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Action Navigation */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
        <div style={{ padding: "1.5rem", border: "1px solid var(--border-subtle)", backgroundColor: "var(--color-gallery-ivory)", borderRadius: "2px" }}>
          <h3 style={{ fontSize: "1.05rem", marginBottom: "0.5rem" }}>Collector Enquiries Inbox</h3>
          <p style={{ fontSize: "0.85rem", color: "var(--color-ink-light)", margin: "0 0 1rem" }}>
            Review pending private viewing requests and bespoke architectural commissions.
          </p>
          <Link href="/contact" className="btn-text" style={{ fontSize: "0.82rem" }}>
            Open Concierge Channel →
          </Link>
        </div>

        <div style={{ padding: "1.5rem", border: "1px solid var(--border-subtle)", backgroundColor: "var(--color-gallery-ivory)", borderRadius: "2px" }}>
          <h3 style={{ fontSize: "1.05rem", marginBottom: "0.5rem" }}>Logistics & Crating Queue</h3>
          <p style={{ fontSize: "0.85rem", color: "var(--color-ink-light)", margin: "0 0 1rem" }}>
            View transit dispatches, DHL Express tracking, and museum crating schedules.
          </p>
          <Link href="/shipping-returns" className="btn-text" style={{ fontSize: "0.82rem" }}>
            View Shipping Matrix →
          </Link>
        </div>

        <div style={{ padding: "1.5rem", border: "1px solid var(--border-subtle)", backgroundColor: "var(--color-gallery-ivory)", borderRadius: "2px" }}>
          <h3 style={{ fontSize: "1.05rem", marginBottom: "0.5rem" }}>Editorial & Journal</h3>
          <p style={{ fontSize: "0.85rem", color: "var(--color-ink-light)", margin: "0 0 1rem" }}>
            Publish new curatorial essays, master interviews, and architectural inquiries.
          </p>
          <Link href="/journal" className="btn-text" style={{ fontSize: "0.82rem" }}>
            View Journal Publications →
          </Link>
        </div>
      </div>
    </div>
  );
}
