import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { ProductCard } from "@/components/ProductCard";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const col = await prisma.collection.findUnique({
      where: { slug },
    });

    if (!col) return { title: "Collection Not Found" };

    return {
      title: `${col.title} — Curated Collection`,
      description: col.description,
    };
  } catch (err) {
    console.warn("[CollectionMetadata] Database query notice:", err);
    return { title: "Curated Collection — Warmthplace" };
  }
}

async function getCollection(slug: string) {
  try {
    return await prisma.collection.findUnique({
      where: { slug },
      include: {
        products: {
          where: { status: "PUBLISHED" },
          include: {
            artist: { select: { name: true, slug: true } },
            images: { orderBy: { position: "asc" } },
          },
        },
      },
    });
  } catch (err) {
    console.warn("[CollectionDetailPage] Database query notice:", err);
    return null;
  }
}

export default async function CollectionDetailPage({ params }: Props) {
  const { slug } = await params;
  const collection = await getCollection(slug);

  if (!collection) {
    notFound();
  }

  return (
    <div className="container" style={{ paddingBottom: "7rem" }}>
      {/* Editorial Collection Header */}
      <div
        style={{
          padding: "clamp(3rem, 6vw, 4.5rem) 0 2.5rem",
          borderBottom: "1px solid var(--border-subtle)",
          marginBottom: "3rem",
        }}
      >
        <Link
          href="/collections"
          style={{
            fontSize: "0.82rem",
            color: "var(--color-ink-light)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: "1rem",
            display: "inline-block",
          }}
        >
          ← Back to All Collections
        </Link>

        <span className="kicker" style={{ display: "block" }}>
          {collection.subtitle || "Curated Suite"}
        </span>
        <h1 style={{ marginTop: "0.4rem", marginBottom: "1rem" }}>
          {collection.title}
        </h1>
        <p style={{ maxWidth: "720px", fontSize: "1.05rem", lineHeight: 1.7 }}>
          {collection.description}
        </p>
      </div>

      {/* Featured Banner Image */}
      {collection.coverImage && (
        <div
          style={{
            position: "relative",
            height: "360px",
            borderRadius: "3px",
            overflow: "hidden",
            marginBottom: "3.5rem",
            boxShadow: "var(--shadow-subtle)",
          }}
        >
          <Image
            src={collection.coverImage}
            alt={collection.coverAlt || collection.title}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      )}

      {/* Products in Collection */}
      <div>
        <h2 style={{ fontSize: "1.75rem", marginBottom: "2rem" }}>
          Works in This Collection ({collection.products.length})
        </h2>

        {collection.products.length === 0 ? (
          <p style={{ color: "var(--color-ink-muted)" }}>
            New works are currently being accessioned into this collection.
          </p>
        ) : (
          <div className="product-grid">
            {collection.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
