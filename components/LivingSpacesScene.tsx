"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "./CartContext";
import { useCurrency } from "./CurrencyContext";

interface FeaturedRoomItem {
  id: string;
  slug: string;
  title: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
  shippingClass: string;
  department: string;
  productType: string;
}

export function LivingSpacesScene({
  items,
}: {
  items: FeaturedRoomItem[];
}) {
  const [selectedItem, setSelectedItem] = useState<FeaturedRoomItem>(
    items[0] || null
  );
  const { addItem } = useCart();
  const { format } = useCurrency();

  return (
    <section className="section" style={{ backgroundColor: "var(--color-canvas-light)" }}>
      <div className="container">
        <div style={{ marginBottom: "3rem", maxWidth: "600px" }}>
          <span className="kicker">Interior Harmony</span>
          <h2 style={{ marginTop: "0.5rem", marginBottom: "1rem" }}>
            Art in Living Spaces
          </h2>
          <p>
            Curated domestic inspiration where contemporary canvases converse
            effortlessly with raw timber, burnished clay, and tactile textiles.
            All works displayed are authentic pieces from our studio collection.
          </p>
        </div>

        <div className="living-spaces-container">
          {/* Main Visual Display */}
          <div className="living-spaces-visual">
            <Image
              src={selectedItem ? selectedItem.imageUrl : "/images/catalogue/indigo-tide.jpg"}
              alt={selectedItem ? selectedItem.title : "Living spaces showcase"}
              fill
              sizes="(max-width: 1024px) 100vw, 800px"
              style={{ objectFit: "cover" }}
            />

            {/* Subdued overlay with room styling notes */}
            <div
              style={{
                position: "absolute",
                bottom: "1.5rem",
                left: "1.5rem",
                background: "rgba(36, 34, 30, 0.85)",
                backdropFilter: "blur(8px)",
                color: "#FFFFFF",
                padding: "0.85rem 1.25rem",
                borderRadius: "2px",
                maxWidth: "320px",
              }}
            >
              <span
                style={{
                  fontSize: "0.68rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--color-muted-brass)",
                  display: "block",
                  marginBottom: "2px",
                }}
              >
                Featured Living Composition
              </span>
              <p style={{ fontSize: "0.85rem", color: "rgba(255, 255, 255, 0.9)", margin: 0 }}>
                {selectedItem ? selectedItem.title : "Contemporary Salon Setting"}
              </p>
            </div>
          </div>

          {/* Shoppable Products List for this Scene */}
          <div className="living-spaces-info">
            <span className="kicker" style={{ marginBottom: "0.75rem" }}>
              Shoppable In This Scene
            </span>
            <h3 style={{ marginBottom: "1.5rem" }}>Living Objects & Artworks</h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {items.map((item) => {
                const isSelected = selectedItem?.id === item.id;
                return (
                  <div
                    key={item.id}
                    className="shoppable-item-row"
                    onClick={() => setSelectedItem(item)}
                    style={{
                      cursor: "pointer",
                      backgroundColor: isSelected ? "#FFFFFF" : "transparent",
                      padding: "0.85rem 1rem",
                      borderRadius: "2px",
                      border: isSelected
                        ? "1px solid var(--border-medium)"
                        : "1px solid transparent",
                      transition: "all var(--transition-fast)",
                    }}
                  >
                    <div className="shoppable-thumb">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        width={64}
                        height={64}
                        style={{ objectFit: "cover", width: "100%", height: "100%" }}
                      />
                    </div>

                    <div style={{ flexGrow: 1 }}>
                      <span
                        style={{
                          fontSize: "0.72rem",
                          color: "var(--color-ink-light)",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                        }}
                      >
                        {item.category.replace(/_/g, " ")}
                      </span>
                      <h4
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "1.15rem",
                          lineHeight: 1.2,
                          marginTop: "2px",
                          marginBottom: "4px",
                        }}
                      >
                        <Link href={`/products/${item.slug}`}>{item.title}</Link>
                      </h4>
                      <div
                        style={{
                          fontSize: "0.92rem",
                          fontWeight: 600,
                          color: "var(--color-ink-charcoal)",
                        }}
                      >
                        {format(item.price)}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        addItem({
                          id: item.id,
                          slug: item.slug,
                          title: item.title,
                          department: item.department,
                          category: item.category,
                          productType: item.productType,
                          price: item.price,
                          currency: "NGN",
                          imageUrl: item.imageUrl,
                          imageAlt: item.title,
                          stock: item.stock,
                          shippingClass: item.shippingClass,
                        });
                      }}
                      className="btn btn-primary"
                      style={{
                        padding: "0.6rem 0.95rem",
                        fontSize: "0.72rem",
                      }}
                      aria-label={`Add ${item.title} to bag`}
                    >
                      Add
                    </button>
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: "2rem" }}>
              <Link href="/shop/decor" className="btn btn-secondary" style={{ width: "100%" }}>
                Explore All Homeware & Décor
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
