import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/db";

export const metadata: Metadata = {
  title: "Curated Art & Living Collections",
  description:
    "Explore thematic suites that weave original contemporary African canvases with sculptural homeware objects.",
};

export default async function CollectionsIndexPage() {
  const collections = await prisma.collection.findMany({
    where: { published: true },
    include: {
      products: {
        where: { status: "PUBLISHED" },
        select: { id: true },
      },
    },
    orderBy: { position: "asc" },
  });

  return (
    <div className="container" style={{ paddingBottom: "7rem" }}>
      <header className="catalogue-header">
        <span className="kicker">Thematic Narratives</span>
        <h1 style={{ marginTop: "0.5rem", marginBottom: "1rem" }}>
          Curated Collections
        </h1>
        <p style={{ maxWidth: "680px", fontSize: "1.05rem", lineHeight: 1.6 }}>
          Rather than grouping pieces merely by category, our curatorial suites unite
          paintings, sculptures, textiles, and ceramics around shared atmospheric and
          material conversations.
        </p>
      </header>

      <div style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}>
        {collections.map((col, idx) => {
          const isEven = idx % 2 === 1;
          return (
            <div
              key={col.id}
              style={{
                display: "grid",
                gridTemplateColumns: "1.1fr 1fr",
                gap: "clamp(2rem, 4vw, 4rem)",
                alignItems: "center",
                backgroundColor: "var(--color-canvas-light)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "3px",
                overflow: "hidden",
                direction: isEven ? "rtl" : "ltr",
              }}
            >
              <div
                style={{
                  position: "relative",
                  height: "440px",
                  background: "#EEEAE1",
                  direction: "ltr",
                }}
              >
                <Image
                  src={col.coverImage || "/images/catalogue/indigo-tide.jpg"}
                  alt={col.coverAlt || col.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div
                style={{
                  padding: "clamp(2rem, 4vw, 3.5rem)",
                  direction: "ltr",
                }}
              >
                <span className="kicker">{col.subtitle || "Curatorial Suite"}</span>
                <h2
                  style={{
                    fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
                    marginTop: "0.5rem",
                    marginBottom: "1rem",
                  }}
                >
                  {col.title}
                </h2>
                <p
                  style={{
                    fontSize: "0.98rem",
                    lineHeight: 1.7,
                    marginBottom: "2rem",
                    color: "var(--color-ink-muted)",
                  }}
                >
                  {col.description}
                </p>

                <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                  <Link href={`/collections/${col.slug}`} className="btn btn-primary">
                    Explore Collection ({col.products.length} works) →
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
