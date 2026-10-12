import React from "react";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { HomeReferenceMockup } from "@/components/HomeReferenceMockup";
import { ProductCard } from "@/components/ProductCard";
import { LivingSpacesScene } from "@/components/LivingSpacesScene";

export default async function HomePage() {
  let featuredArt: any[] = [];
  let featuredDecor: any[] = [];
  let collections: any[] = [];
  let artists: any[] = [];
  let articles: any[] = [];
  let livingRoomProducts: any[] = [];

  try {
    const res = await Promise.all([
      prisma.product.findMany({
        where: { department: "ART", status: "PUBLISHED" },
        include: {
          artist: { select: { name: true, slug: true } },
          images: { orderBy: { position: "asc" } },
        },
        take: 4,
        orderBy: { createdAt: "desc" },
      }),
      prisma.product.findMany({
        where: { department: "DECOR", status: "PUBLISHED" },
        include: {
          artist: { select: { name: true, slug: true } },
          images: { orderBy: { position: "asc" } },
        },
        take: 4,
        orderBy: { createdAt: "desc" },
      }),
      prisma.collection.findMany({
        where: { published: true },
        take: 3,
        orderBy: { position: "asc" },
      }),
      prisma.artist.findMany({
        where: { published: true },
        take: 3,
        orderBy: { position: "asc" },
      }),
      prisma.article.findMany({
        where: { published: true },
        take: 3,
        orderBy: { createdAt: "desc" },
      }),
    ]);
    featuredArt = res[0];
    featuredDecor = res[1];
    collections = res[2];
    artists = res[3];
    articles = res[4];

    livingRoomProducts = await prisma.product.findMany({
      where: {
        slug: {
          in: [
            "indigo-tide-evening-lantern",
            "incised-terracotta-vessel",
            "strip-woven-throw",
            "fluted-iroko-pedestal-bowl",
          ],
        },
      },
      include: { images: true },
    });
  } catch (err) {
    console.warn("[HomePage] Database query notice during build:", err);
  }

  const defaultSceneItems = [
    {
      id: "scene-item-1",
      slug: "indigo-tide-evening-lantern",
      title: "Indigo Tide (Evening Lantern)",
      price: 450000,
      imageUrl: "/images/catalogue/indigo-tide.jpg",
      category: "ORIGINAL_CANVAS",
      stock: 1,
      shippingClass: "CRATED_ART",
      department: "ART",
      productType: "ORIGINAL",
    },
    {
      id: "scene-item-2",
      slug: "incised-terracotta-vessel",
      title: "Incised Terracotta Vessel",
      price: 65000,
      imageUrl: "/images/catalogue/incised-terracotta-vessel.jpg",
      category: "CERAMIC_VESSEL",
      stock: 4,
      shippingClass: "STANDARD_PARCEL",
      department: "DECOR",
      productType: "DECOR",
    },
    {
      id: "scene-item-3",
      slug: "strip-woven-throw",
      title: "Narrow-Loom Strip Throw",
      price: 48000,
      imageUrl: "/images/catalogue/strip-woven-throw.jpg",
      category: "HEIRLOOM_TEXTILE",
      stock: 6,
      shippingClass: "STANDARD_PARCEL",
      department: "DECOR",
      productType: "DECOR",
    },
    {
      id: "scene-item-4",
      slug: "fluted-iroko-pedestal-bowl",
      title: "Fluted Iroko Pedestal Bowl",
      price: 85000,
      imageUrl: "/images/catalogue/fluted-iroko-pedestal-bowl.jpg",
      category: "WOODWORK",
      stock: 2,
      shippingClass: "STANDARD_PARCEL",
      department: "DECOR",
      productType: "DECOR",
    },
  ];

  const shoppableSceneItems =
    livingRoomProducts.length > 0
      ? livingRoomProducts.map((p) => ({
          id: p.id,
          slug: p.slug,
          title: p.title,
          price: p.price,
          imageUrl: p.images[0]?.url || "/images/catalogue/indigo-tide.jpg",
          category: p.category,
          stock: p.stock,
          shippingClass: p.shippingClass,
          department: p.department,
          productType: p.productType,
        }))
      : defaultSceneItems;

  return (
    <>
      {/* 1. HERO 1/1 REFERENCE SHOWCASE — Exact recreation of the user's uploaded mockup image */}
      <HomeReferenceMockup />

      {/* 2. PRINCIPAL SHOPPING PATHWAYS */}
      <section
        id="shop-catalogue"
        className="section"
        style={{ backgroundColor: "var(--color-gallery-ivory)" }}
      >
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 3.5rem" }}>
            <span className="kicker">Curatorial Curiosities</span>
            <h2 style={{ marginTop: "0.5rem", marginBottom: "1rem" }}>
              Distinct Shopping Pathways
            </h2>
            <p>
              Whether collecting an original monumental painting for a private collection
              or selecting sculptural vessels for the hearth, Warmthplace bridges
              visual authority with domestic warmth.
            </p>
          </div>

          <div className="pathways-grid">
            {/* Pathway 1: Discover Art */}
            <div className="pathway-card">
              <div className="pathway-content">
                <span className="kicker">Gallery Fine Art</span>
                <h3 className="pathway-title">Discover Art</h3>
                <p className="pathway-desc">
                  Monumental canvases, works on paper, limited editions, and lost-wax cast bronzes.
                </p>
                <Link href="/shop/art" className="btn btn-secondary">
                  Explore Artworks →
                </Link>
              </div>
              <div className="pathway-img-wrap">
                <Image
                  src="/images/catalogue/harmattan-procession.jpg"
                  alt="African fine art showcase"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>

            {/* Pathway 2: Explore Home Décor */}
            <div className="pathway-card">
              <div className="pathway-content">
                <span className="kicker">Living Objects</span>
                <h3 className="pathway-title">Home Décor</h3>
                <p className="pathway-desc">
                  Pit-fired terracotta vessels, narrow-loom strip throws, carved iroko bowls, and adire cushions.
                </p>
                <Link href="/shop/decor" className="btn btn-secondary">
                  Explore Décor →
                </Link>
              </div>
              <div className="pathway-img-wrap">
                <Image
                  src="/images/catalogue/incised-terracotta-vessel.jpg"
                  alt="Handcrafted African home decor"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>

            {/* Pathway 3: Curated Collections */}
            <div className="pathway-card">
              <div className="pathway-content">
                <span className="kicker">Curated Suites</span>
                <h3 className="pathway-title">Collections</h3>
                <p className="pathway-desc">
                  Thematic narratives uniting art and homeware around coastal mythology and ancient geometries.
                </p>
                <Link href="/collections" className="btn btn-secondary">
                  View Collections →
                </Link>
              </div>
              <div className="pathway-img-wrap">
                <Image
                  src="/images/catalogue/indigo-tide.jpg"
                  alt="Curated contemporary African collections"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SELECTED WORKS: CONTEMPORARY AFRICAN ART */}
      <section className="section" style={{ backgroundColor: "var(--color-canvas-pure)" }}>
        <div className="container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: "3rem",
              flexWrap: "wrap",
              gap: "1.5rem",
            }}
          >
            <div>
              <span className="kicker">Curation & Authority</span>
              <h2 style={{ marginTop: "0.5rem" }}>Selected Works: Art</h2>
            </div>
            <Link href="/shop/art" className="btn-text">
              View All 7 Artworks In Gallery →
            </Link>
          </div>

          <div className="product-grid">
            {featuredArt.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED CURATED COLLECTIONS */}
      <section className="section" style={{ backgroundColor: "var(--color-gallery-ivory)" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 3rem" }}>
            <span className="kicker">Thematic Curation</span>
            <h2 style={{ marginTop: "0.5rem", marginBottom: "0.75rem" }}>
              Curated Collections
            </h2>
            <p>
              Each suite is conceived as an architectural dialogue, bringing together
              works on canvas with tactile domestic objects.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "2rem",
            }}
          >
            {collections.map((col) => (
              <Link
                key={col.id}
                href={`/collections/${col.slug}`}
                className="collection-card"
              >
                <Image
                  src={col.coverImage || "/images/catalogue/indigo-tide.jpg"}
                  alt={col.coverAlt || col.title}
                  fill
                  className="collection-card-bg"
                />
                <div className="collection-card-overlay" />
                <div className="collection-card-content">
                  <span className="kicker" style={{ color: "var(--color-muted-brass)" }}>
                    {col.subtitle || "Curated Suite"}
                  </span>
                  <h3 className="collection-card-title">{col.title}</h3>
                  <p className="collection-card-desc">{col.description}</p>
                  <span className="btn btn-secondary" style={{ color: "#FFFFFF", borderColor: "#FFFFFF" }}>
                    Explore Collection →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SELECTED HOMESTYLE OBJECTS: DÉCOR */}
      <section className="section" style={{ backgroundColor: "var(--color-canvas-pure)" }}>
        <div className="container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: "3rem",
              flexWrap: "wrap",
              gap: "1.5rem",
            }}
          >
            <div>
              <span className="kicker">Tactile Domesticity</span>
              <h2 style={{ marginTop: "0.5rem" }}>Artisan Living Décor</h2>
            </div>
            <Link href="/shop/decor" className="btn-text">
              View All Décor Objects →
            </Link>
          </div>

          <div className="product-grid">
            {featuredDecor.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. ART IN LIVING SPACES — Shoppable Room Inspiration */}
      <LivingSpacesScene items={shoppableSceneItems} />

      {/* 7. ARTISTS & MAKERS STORIES */}
      <section className="section" style={{ backgroundColor: "var(--color-gallery-ivory)" }}>
        <div className="container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: "3.5rem",
              flexWrap: "wrap",
              gap: "1.5rem",
            }}
          >
            <div style={{ maxWidth: "600px" }}>
              <span className="kicker">Creative Lineage</span>
              <h2 style={{ marginTop: "0.5rem", marginBottom: "0.75rem" }}>
                Artists & Master Makers
              </h2>
              <p>
                We collaborate directly with visionary painters, sculptors, and weavers
                across West Africa, ensuring fair remuneration, authentic cultural attribution,
                and direct relationships with collectors.
              </p>
            </div>
            <Link href="/artists" className="btn-text">
              All Artist Profiles →
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2.5rem",
            }}
          >
            {artists.map((artist) => (
              <div
                key={artist.id}
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "2px",
                  overflow: "hidden",
                }}
              >
                <div style={{ position: "relative", height: "320px", background: "#EEEAE1" }}>
                  <Image
                    src={artist.portraitImage || "/images/catalogue/harmattan-procession.jpg"}
                    alt={artist.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div style={{ padding: "2rem" }}>
                  <span
                    style={{
                      fontSize: "0.72rem",
                      color: "var(--color-terracotta)",
                      textTransform: "uppercase",
                      letterSpacing: "0.15em",
                      fontWeight: 600,
                    }}
                  >
                    {artist.location}
                  </span>
                  <h3
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.7rem",
                      marginTop: "0.35rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <Link href={`/artists/${artist.slug}`}>{artist.name}</Link>
                  </h3>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--color-ink-light)",
                      marginBottom: "1rem",
                      fontWeight: 500,
                    }}
                  >
                    {artist.discipline}
                  </p>
                  <p style={{ fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                    {artist.shortBio}
                  </p>
                  <Link
                    href={`/artists/${artist.slug}`}
                    className="btn btn-secondary"
                    style={{ fontSize: "0.75rem", padding: "0.65rem 1.25rem" }}
                  >
                    View Studio & Works →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. EDITORIAL JOURNAL */}
      <section className="section" style={{ backgroundColor: "var(--color-canvas-pure)" }}>
        <div className="container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: "3.5rem",
              flexWrap: "wrap",
              gap: "1.5rem",
            }}
          >
            <div>
              <span className="kicker">Essays & Inquiries</span>
              <h2 style={{ marginTop: "0.5rem" }}>The Warmthplace Journal</h2>
            </div>
            <Link href="/journal" className="btn-text">
              Read All Journal Stories →
            </Link>
          </div>

          <div className="journal-grid">
            {articles.map((art) => (
              <Link
                key={art.id}
                href={`/journal/${art.slug}`}
                className="journal-card"
              >
                <div className="journal-cover-wrap">
                  <Image
                    src={art.coverImage || "/images/catalogue/indigo-tide.jpg"}
                    alt={art.coverAlt || art.title}
                    width={480}
                    height={300}
                    className="journal-cover-img"
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
                <span className="journal-category">{art.category}</span>
                <h3 className="journal-title">{art.title}</h3>
                <p className="journal-excerpt">{art.excerpt}</p>
                <span
                  style={{
                    fontSize: "0.78rem",
                    color: "var(--color-ink-charcoal)",
                    fontWeight: 600,
                    marginTop: "0.85rem",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  Read Story →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 9. TRUST & VERIFIED INTERNATIONAL COMMERCE */}
      <section
        style={{
          backgroundColor: "var(--color-gallery-ivory)",
          borderTop: "1px solid var(--border-subtle)",
        }}
      >
        <div className="container">
          <div className="trust-banner-grid">
            <div className="trust-item">
              <span className="trust-item-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                Insured Art Logistics
              </span>
              <p className="trust-item-desc">
                Custom timber crating, moisture barriers, and global air freight via specialized art partners.
              </p>
            </div>

            <div className="trust-item">
              <span className="trust-item-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Authenticity Guaranteed
              </span>
              <p className="trust-item-desc">
                Every original canvas and limited edition includes an archival studio certificate signed by the artist.
              </p>
            </div>

            <div className="trust-item">
              <span className="trust-item-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
                Secure Payment
              </span>
              <p className="trust-item-desc">
                Encrypted bank-grade checkout supporting Nigerian cards, bank transfer, and international payment methods.
              </p>
            </div>

            <div className="trust-item">
              <span className="trust-item-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                Private Advisory
              </span>
              <p className="trust-item-desc">
                Direct concierge access for interior designers, custom architectural commissions, and diaspora shipping.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
