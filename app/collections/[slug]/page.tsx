import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/db";

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
          orderBy: { featured: "desc" },
        },
      },
    });
  } catch (err) {
    console.warn("[CollectionDetailPage] Database query notice:", err);
    return null;
  }
}

function formatNGN(kobo: number): string {
  const naira = kobo / 100;
  if (naira >= 1_000_000) {
    return `\u20a6${(naira / 1_000_000).toFixed(2)}M`;
  }
  return `\u20a6${naira.toLocaleString("en-NG")}`;
}

function formatUSD(kobo: number): string {
  const usd = kobo / 100 / 1500;
  return `~$${usd.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

function getCategoryLabel(category: string): string {
  const map: Record<string, string> = {
    ORIGINAL_PAINTING: "Original Painting",
    PRINT_EDITION: "Limited Edition Print",
    PHOTOGRAPHY: "Fine-Art Photography",
    SCULPTURE: "Sculpture",
    WORK_ON_PAPER: "Work on Paper",
    CERAMICS: "Ceramics",
    TEXTILES: "Textile",
    TABLETOP: "Tabletop Object",
    DECORATIVE_OBJECTS: "Decorative Object",
    CUSHIONS: "Cushion",
  };
  return map[category] || category;
}

function getDepartmentAccent(dept: string): string {
  return dept === "DECOR" ? "#b85c38" : "#2c4a7c";
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
          \u2190 Back to All Collections
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
            height: "clamp(280px, 40vw, 480px)",
            borderRadius: "4px",
            overflow: "hidden",
            marginBottom: "3.5rem",
            boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
          }}
        >
          <Image
            src={collection.coverImage}
            alt={collection.coverAlt || collection.title}
            fill
            style={{ objectFit: "cover", objectPosition: "center 30%" }}
            priority
            sizes="100vw"
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "2rem",
              left: "2.5rem",
              color: "#fff",
            }}
          >
            <p
              style={{
                fontSize: "0.78rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                opacity: 0.8,
                marginBottom: "0.25rem",
              }}
            >
              {collection.products.length} work
              {collection.products.length !== 1 ? "s" : ""} in this collection
            </p>
            <h2
              style={{
                fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                fontWeight: 700,
                margin: 0,
              }}
            >
              {collection.title}
            </h2>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            marginBottom: "2.5rem",
            borderBottom: "1px solid var(--border-subtle)",
            paddingBottom: "1rem",
          }}
        >
          <h2 style={{ fontSize: "1.75rem", margin: 0 }}>
            Works in This Collection
          </h2>
          <span
            style={{
              fontSize: "0.9rem",
              color: "var(--color-ink-muted)",
              letterSpacing: "0.05em",
            }}
          >
            {collection.products.length} piece
            {collection.products.length !== 1 ? "s" : ""}
          </span>
        </div>

        {collection.products.length === 0 ? (
          <p style={{ color: "var(--color-ink-muted)" }}>
            New works are currently being accessioned into this collection.
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(min(100%, 360px), 1fr))",
              gap: "2.5rem",
            }}
          >
            {collection.products.map((product) => {
              const primaryImage = product.images[0] || {
                url: "/images/catalogue/harmattan-procession.jpg",
                alt: product.title,
              };
              const dimensionsLabel =
                product.widthCm && product.heightCm
                  ? `${product.widthCm} \u00d7 ${product.heightCm} cm`
                  : null;

              return (
                <article
                  key={product.id}
                  className="collection-detail-card"
                  style={{
                    background: "var(--color-surface, #fff)",
                    borderRadius: "6px",
                    overflow: "hidden",
                    boxShadow: "0 2px 18px rgba(0,0,0,0.08)",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Artwork Image */}
                  <Link
                    href={`/products/${product.slug}`}
                    style={{
                      display: "block",
                      position: "relative",
                      aspectRatio: "4/5",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={primaryImage.url}
                      alt={primaryImage.alt || product.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                      style={{
                        objectFit: "cover",
                        transition: "transform 0.4s ease",
                      }}
                      className="collection-card-img"
                      loading="lazy"
                    />
                    {/* Badges */}
                    <div
                      style={{
                        position: "absolute",
                        top: "0.85rem",
                        left: "0.85rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.4rem",
                      }}
                    >
                      {product.productType === "ORIGINAL" && (
                        <span
                          style={{
                            background: "rgba(0,0,0,0.72)",
                            color: "#fff",
                            fontSize: "0.68rem",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            padding: "0.28rem 0.7rem",
                            borderRadius: "2px",
                            backdropFilter: "blur(4px)",
                          }}
                        >
                          Original Work
                        </span>
                      )}
                      {product.productType === "EDITION" && (
                        <span
                          style={{
                            background: "rgba(0,0,0,0.72)",
                            color: "#fff",
                            fontSize: "0.68rem",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            padding: "0.28rem 0.7rem",
                            borderRadius: "2px",
                          }}
                        >
                          Edition of {product.editionSize || 25}
                        </span>
                      )}
                      {product.stock <= 2 &&
                        product.stock > 0 &&
                        !product.enquiryOnly && (
                          <span
                            style={{
                              background: "rgba(180,50,30,0.88)",
                              color: "#fff",
                              fontSize: "0.68rem",
                              letterSpacing: "0.07em",
                              textTransform: "uppercase",
                              padding: "0.28rem 0.7rem",
                              borderRadius: "2px",
                            }}
                          >
                            Only {product.stock} left
                          </span>
                        )}
                    </div>
                  </Link>

                  {/* Info Panel */}
                  <div
                    style={{
                      padding: "1.5rem 1.6rem 1.8rem",
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {/* Category tag */}
                    <span
                      style={{
                        fontSize: "0.7rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: getDepartmentAccent(product.department),
                        fontWeight: 600,
                        marginBottom: "0.45rem",
                        display: "block",
                      }}
                    >
                      {getCategoryLabel(product.category)}
                    </span>

                    {/* Artist */}
                    {product.artist ? (
                      <Link
                        href={`/artists/${product.artist.slug}`}
                        style={{
                          fontSize: "0.82rem",
                          color: "var(--color-ink-muted)",
                          textDecoration: "none",
                          marginBottom: "0.3rem",
                          display: "block",
                        }}
                      >
                        {product.artist.name}
                      </Link>
                    ) : (
                      <span
                        style={{
                          fontSize: "0.82rem",
                          color: "var(--color-ink-muted)",
                          marginBottom: "0.3rem",
                          display: "block",
                        }}
                      >
                        Warmthplace Studio
                      </span>
                    )}

                    {/* Title */}
                    <h3
                      style={{
                        fontSize: "1.15rem",
                        fontWeight: 700,
                        lineHeight: 1.3,
                        margin: "0 0 1rem",
                      }}
                    >
                      <Link
                        href={`/products/${product.slug}`}
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                        }}
                      >
                        {product.title}
                      </Link>
                    </h3>

                    {/* Details grid */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "0.6rem 1rem",
                        marginBottom: "1.1rem",
                        fontSize: "0.8rem",
                        color: "var(--color-ink-muted)",
                      }}
                    >
                      {product.year && (
                        <div>
                          <span
                            style={{
                              display: "block",
                              fontSize: "0.63rem",
                              letterSpacing: "0.09em",
                              textTransform: "uppercase",
                              color: "var(--color-ink-light)",
                              marginBottom: "0.15rem",
                            }}
                          >
                            Year
                          </span>
                          <span>{product.year}</span>
                        </div>
                      )}
                      {dimensionsLabel && (
                        <div>
                          <span
                            style={{
                              display: "block",
                              fontSize: "0.63rem",
                              letterSpacing: "0.09em",
                              textTransform: "uppercase",
                              color: "var(--color-ink-light)",
                              marginBottom: "0.15rem",
                            }}
                          >
                            Dimensions
                          </span>
                          <span>{dimensionsLabel}</span>
                        </div>
                      )}
                      {product.medium && (
                        <div style={{ gridColumn: "1 / -1" }}>
                          <span
                            style={{
                              display: "block",
                              fontSize: "0.63rem",
                              letterSpacing: "0.09em",
                              textTransform: "uppercase",
                              color: "var(--color-ink-light)",
                              marginBottom: "0.15rem",
                            }}
                          >
                            Medium
                          </span>
                          <span
                            style={{
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {product.medium}
                          </span>
                        </div>
                      )}
                      {!product.medium && product.materials && (
                        <div style={{ gridColumn: "1 / -1" }}>
                          <span
                            style={{
                              display: "block",
                              fontSize: "0.63rem",
                              letterSpacing: "0.09em",
                              textTransform: "uppercase",
                              color: "var(--color-ink-light)",
                              marginBottom: "0.15rem",
                            }}
                          >
                            Materials
                          </span>
                          <span>{product.materials}</span>
                        </div>
                      )}
                    </div>

                    {/* Price + CTA */}
                    <div
                      style={{
                        marginTop: "auto",
                        paddingTop: "1rem",
                        borderTop: "1px solid var(--border-subtle)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "0.5rem",
                        flexWrap: "wrap",
                      }}
                    >
                      <div>
                        <span
                          style={{
                            fontSize: "1.3rem",
                            fontWeight: 700,
                            letterSpacing: "-0.01em",
                            color: "var(--color-ink)",
                          }}
                        >
                          {formatNGN(product.price)}
                        </span>
                        <span
                          style={{
                            fontSize: "0.78rem",
                            color: "var(--color-ink-muted)",
                            marginLeft: "0.5rem",
                          }}
                        >
                          {formatUSD(product.price)}
                        </span>
                      </div>

                      <Link
                        href={`/products/${product.slug}`}
                        style={{
                          fontSize: "0.76rem",
                          letterSpacing: "0.07em",
                          textTransform: "uppercase",
                          fontWeight: 600,
                          textDecoration: "none",
                          color: "var(--color-ink)",
                          borderBottom: "1.5px solid currentColor",
                          paddingBottom: "1px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {product.enquiryOnly ? "Enquire \u2192" : "View Details \u2192"}
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        .collection-detail-card {
          transition: transform 0.22s ease, box-shadow 0.22s ease;
        }
        .collection-detail-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 14px 48px rgba(0,0,0,0.14) !important;
        }
        .collection-detail-card:hover .collection-card-img {
          transform: scale(1.04);
        }
      `}</style>
    </div>
  );
}
