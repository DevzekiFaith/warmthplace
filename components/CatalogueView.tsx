"use client";

import React, { useState, useMemo } from "react";
import { ProductCard } from "./ProductCard";

interface CatalogueProduct {
  id: string;
  slug: string;
  title: string;
  department: string;
  category: string;
  productType: string;
  editionSize?: number | null;
  price: number;
  currency: string;
  stock: number;
  medium?: string | null;
  materials?: string | null;
  widthCm?: number | null;
  heightCm?: number | null;
  enquiryOnly?: boolean;
  shippingClass: string;
  artist?: {
    name: string;
    slug: string;
  } | null;
  images: {
    url: string;
    alt: string;
  }[];
}

interface CatalogueCategory {
  id: string;
  label: string;
}

interface CatalogueViewProps {
  title: string;
  kicker: string;
  description: string;
  products: CatalogueProduct[];
  categories: CatalogueCategory[];
  department?: "ART" | "DECOR" | "ALL";
  initialCategory?: string;
}

export function CatalogueView({
  title,
  kicker,
  description,
  products,
  categories,
  department = "ALL",
  initialCategory,
}: CatalogueViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategory || "ALL"
  );
  const [selectedSort, setSelectedSort] = useState<string>("featured");
  const [selectedAvailability, setSelectedAvailability] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    const result = products.filter((p) => {
      // Category filter
      if (selectedCategory !== "ALL" && p.category !== selectedCategory) {
        return false;
      }
      // Availability filter
      if (selectedAvailability === "in-stock" && p.stock <= 0) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(query);
        const matchesArtist = p.artist?.name.toLowerCase().includes(query);
        const matchesMedium = (p.medium || p.materials || "").toLowerCase().includes(query);
        if (!matchesTitle && !matchesArtist && !matchesMedium) return false;
      }
      return true;
    });

    // Sort
    return [...result].sort((a, b) => {
      if (selectedSort === "price-asc") return a.price - b.price;
      if (selectedSort === "price-desc") return b.price - a.price;
      if (selectedSort === "title-asc") return a.title.localeCompare(b.title);
      return 0; // featured default
    });
  }, [products, selectedCategory, selectedSort, selectedAvailability, searchQuery]);

  return (
    <div className="container" style={{ paddingBottom: "6rem" }}>
      {/* Header Banner */}
      <header className="catalogue-header">
        <span className="kicker">{kicker}</span>
        <h1 style={{ marginTop: "0.5rem", marginBottom: "1rem" }}>{title}</h1>
        <p style={{ maxWidth: "680px", fontSize: "1.05rem", lineHeight: 1.6 }}>
          {description}
        </p>
      </header>

      {/* Filter and Control Bar */}
      <div className="catalogue-filters-bar">
        {/* Category Pills */}
        <div className="filter-pills-group" role="tablist" aria-label="Category filter">
          <button
            type="button"
            className={`filter-pill ${selectedCategory === "ALL" ? "active" : ""}`}
            onClick={() => setSelectedCategory("ALL")}
          >
            All {department === "ART" ? "Works" : department === "DECOR" ? "Pieces" : "Works & Objects"} ({products.length})
          </button>
          {categories.map((cat) => {
            const count = products.filter((p) => p.category === cat.id).length;
            return (
              <button
                key={cat.id}
                type="button"
                className={`filter-pill ${selectedCategory === cat.id ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Right Controls: Availability, Sort, Search */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
          {/* Quick Search Input */}
          <div style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Filter by keyword or artist..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: "0.45rem 0.85rem 0.45rem 2rem",
                borderRadius: "30px",
                border: "1px solid var(--border-medium)",
                backgroundColor: "#FFFFFF",
                fontSize: "0.8rem",
                color: "var(--color-ink-charcoal)",
                width: "220px",
              }}
            />
            <svg
              style={{
                position: "absolute",
                left: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "14px",
                height: "14px",
                color: "var(--color-ink-light)",
              }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>

          {/* Availability Filter */}
          <select
            value={selectedAvailability}
            onChange={(e) => setSelectedAvailability(e.target.value)}
            style={{
              padding: "0.45rem 0.85rem",
              borderRadius: "2px",
              border: "1px solid var(--border-medium)",
              backgroundColor: "transparent",
              fontSize: "0.8rem",
              color: "var(--color-ink-charcoal)",
              cursor: "pointer",
            }}
            aria-label="Filter availability"
          >
            <option value="all">All Availability</option>
            <option value="in-stock">Available Now</option>
          </select>

          {/* Sort Selector */}
          <select
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
            style={{
              padding: "0.45rem 0.85rem",
              borderRadius: "2px",
              border: "1px solid var(--border-medium)",
              backgroundColor: "transparent",
              fontSize: "0.8rem",
              color: "var(--color-ink-charcoal)",
              cursor: "pointer",
            }}
            aria-label="Sort products"
          >
            <option value="featured">Curator&apos;s Selection</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="title-asc">Alphabetical (A–Z)</option>
          </select>
        </div>
      </div>

      {/* Results Count and Active Filters Notice */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
          fontSize: "0.82rem",
          color: "var(--color-ink-light)",
        }}
      >
        <span>
          Showing <strong>{filteredProducts.length}</strong> of {products.length}{" "}
          {department === "ART" ? "artworks" : "objects"}
        </span>

        {selectedCategory !== "ALL" || searchQuery || selectedSort !== "featured" ? (
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("ALL");
              setSearchQuery("");
              setSelectedSort("featured");
            }}
            style={{
              color: "var(--color-terracotta)",
              fontWeight: 600,
              fontSize: "0.78rem",
              textDecoration: "underline",
            }}
          >
            Reset Filters
          </button>
        ) : null}
      </div>

      {/* Product Grid or Empty State */}
      {filteredProducts.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "5rem 1rem",
            backgroundColor: "var(--color-canvas-light)",
            border: "1px dashed var(--border-medium)",
            borderRadius: "3px",
          }}
        >
          <h3 style={{ marginBottom: "0.75rem" }}>No matching works found</h3>
          <p style={{ maxWidth: "420px", margin: "0 auto 1.5rem" }}>
            We could not find any items matching your selected criteria. Try adjusting your
            filters or clearing your search term.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("ALL");
              setSearchQuery("");
              setSelectedSort("featured");
            }}
            className="btn btn-primary"
          >
            View All Pieces
          </button>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
