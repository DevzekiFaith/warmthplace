import React, { Suspense } from "react";
import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { ProductCard } from "@/components/ProductCard";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Search the Collection",
  description: "Search contemporary African paintings, works on paper, bronzes, ceramics, and textiles at Warmthplace Art Studio.",
};

interface SearchPageProps {
  searchParams: Promise<{ q?: string; dept?: string }>;
}

export default async function SearchPage(props: SearchPageProps) {
  const { q = "", dept = "ALL" } = await props.searchParams;
  const cleanQ = q.trim();

  const whereClause: Record<string, unknown> = {
    status: "PUBLISHED",
  };

  if (dept === "ART" || dept === "DECOR") {
    whereClause.department = dept;
  }

  if (cleanQ) {
    whereClause.OR = [
      { title: { contains: cleanQ } },
      { description: { contains: cleanQ } },
      { medium: { contains: cleanQ } },
      { materials: { contains: cleanQ } },
      { artist: { name: { contains: cleanQ } } },
    ];
  }

  let results: any[] = [];
  try {
    results = await prisma.product.findMany({
      where: whereClause,
      include: {
        artist: { select: { name: true, slug: true } },
        images: { orderBy: { position: "asc" } },
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.warn("[SearchPage] Database query notice:", err);
    results = [];
  }

  return (
    <div className="container" style={{ paddingTop: "3rem", paddingBottom: "7rem" }}>
      <header className="catalogue-header">
        <span className="kicker">Catalogue Query</span>
        <h1 style={{ marginTop: "0.5rem", marginBottom: "1.5rem" }}>
          Search Collection
        </h1>

        {/* Search Input Form */}
        <form
          action="/search"
          method="GET"
          style={{
            display: "flex",
            gap: "0.75rem",
            maxWidth: "640px",
            marginBottom: "1.5rem",
          }}
        >
          <input
            type="text"
            name="q"
            defaultValue={cleanQ}
            placeholder="Search by artwork title, artist, medium, or material..."
            className="form-control"
            style={{ flexGrow: 1 }}
            autoFocus
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>

        {/* Department Filters */}
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <Link
            href={`/search?q=${encodeURIComponent(cleanQ)}&dept=ALL`}
            className={`filter-pill ${dept === "ALL" ? "active" : ""}`}
          >
            All Departments
          </Link>
          <Link
            href={`/search?q=${encodeURIComponent(cleanQ)}&dept=ART`}
            className={`filter-pill ${dept === "ART" ? "active" : ""}`}
          >
            Fine Art
          </Link>
          <Link
            href={`/search?q=${encodeURIComponent(cleanQ)}&dept=DECOR`}
            className={`filter-pill ${dept === "DECOR" ? "active" : ""}`}
          >
            Home Décor
          </Link>
        </div>
      </header>

      {/* Results Section */}
      <div>
        <div style={{ marginBottom: "2rem", color: "var(--color-ink-light)", fontSize: "0.9rem" }}>
          {cleanQ ? (
            <span>
              Found <strong>{results.length}</strong> results for &ldquo;{cleanQ}&rdquo;
            </span>
          ) : (
            <span>Browsing full studio catalogue ({results.length} items)</span>
          )}
        </div>

        {results.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "5rem 1rem",
              backgroundColor: "var(--color-canvas-light)",
              border: "1px dashed var(--border-medium)",
              borderRadius: "3px",
            }}
          >
            <h3 style={{ marginBottom: "0.75rem" }}>No results found</h3>
            <p style={{ maxWidth: "420px", margin: "0 auto 1.5rem" }}>
              We could not find any pieces matching &ldquo;{cleanQ}&rdquo;. Try searching for &ldquo;indigo&rdquo;, &ldquo;terracotta&rdquo;, &ldquo;Amina&rdquo;, or &ldquo;sculpture&rdquo;.
            </p>
            <Link href="/shop/art" className="btn btn-primary">
              View All Fine Art
            </Link>
          </div>
        ) : (
          <div className="product-grid">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
