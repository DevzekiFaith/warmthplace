import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { ProductDetailsClient } from "@/components/ProductDetailsClient";
import { ProductCard } from "@/components/ProductCard";
import { SITE_NAME } from "@/lib/constants";
import { getHeroProduct } from "@/lib/heroProducts";

interface Props {
  params: Promise<{ slug: string }>;
}

function resolveProductSlug(slug: string): string {
  if (
    slug === "sovereign-grace" ||
    slug === "sovereign-grace-indigo-queen" ||
    slug === "the-indigo-queen"
  ) {
    return "emerald-solitude";
  }
  return slug;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const targetSlug = resolveProductSlug(slug);
  const hero = getHeroProduct(targetSlug) || getHeroProduct(slug);
  try {
    const product = await prisma.product.findUnique({
      where: { slug: targetSlug },
      include: {
        artist: { select: { name: true } },
        images: { take: 1 },
      },
    });

    if (!product) {
      if (hero) {
        return {
          title: `${hero.title} by ${hero.artist.name}`,
          description: hero.description.slice(0, 160),
          openGraph: {
            title: `${hero.title} | ${SITE_NAME}`,
            description: hero.description.slice(0, 160),
            images: [{ url: hero.images[0].url, alt: hero.title }],
          },
        };
      }
      return { title: "Artwork Not Found" };
    }

    const artistText = product.artist ? `by ${product.artist.name}` : "";
    const imageUrl = product.images[0]?.url || "/images/catalogue/indigo-tide.jpg";

    return {
      title: `${product.title} ${artistText}`,
      description: product.description.slice(0, 160),
      openGraph: {
        title: `${product.title} | ${SITE_NAME}`,
        description: product.description.slice(0, 160),
        images: [{ url: imageUrl, alt: product.title }],
      },
    };
  } catch (err) {
    console.warn("[ProductMetadata] Database query notice:", err);
    if (hero) return { title: `${hero.title} by ${hero.artist.name}`, description: hero.description.slice(0, 160) };
    return { title: "Artwork Details — Warmthplace" };
  }
}

async function getProduct(slug: string) {
  const targetSlug = resolveProductSlug(slug);
  try {
    const dbProduct = await prisma.product.findUnique({
      where: { slug: targetSlug },
      include: {
        artist: {
          select: {
            name: true,
            slug: true,
            discipline: true,
            location: true,
          },
        },
        images: { orderBy: { position: "asc" } },
      },
    });
    return dbProduct ?? getHeroProduct(targetSlug) ?? getHeroProduct(slug) ?? null;
  } catch (err) {
    console.warn("[ProductDetailPage] Database query notice:", err);
    return getHeroProduct(targetSlug) ?? getHeroProduct(slug) ?? null;
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product || product.status !== "PUBLISHED") {
    notFound();
  }

  // Recommended products (other pieces in the same department or by same artist)
  let recommendations: any[] = [];
  try {
    recommendations = await prisma.product.findMany({
      where: {
        department: product.department,
        id: { not: product.id },
        status: "PUBLISHED",
      },
      include: {
        artist: { select: { name: true, slug: true } },
        images: { orderBy: { position: "asc" } },
      },
      take: 3,
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.warn("[ProductDetailPage] Recommendations query notice:", err);
    recommendations = [];
  }

  // Schema.org Product structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.title,
    image: product.images.map((img) => img.url),
    description: product.description,
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: product.currency,
      price: (product.price / 100).toFixed(2),
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      url: `https://warmthplace.com/products/${product.slug}`,
    },
  };

  return (
    <div className="container" style={{ paddingTop: "2.5rem", paddingBottom: "7rem" }}>
      {/* Structured data injection */}
      <script
        type="application/ldJson"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Main PDP Client View */}
      <ProductDetailsClient product={product} />

      {/* Recommendations Section */}
      {recommendations.length > 0 && (
        <section style={{ marginTop: "6rem", paddingTop: "4rem", borderTop: "1px solid var(--border-subtle)" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: "2.5rem",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <div>
              <span className="kicker">Complementary Selections</span>
              <h2 style={{ fontSize: "2rem", marginTop: "0.4rem" }}>
                Curator&apos;s Recommendations
              </h2>
            </div>
            <Link
              href={product.department === "ART" ? "/shop/art" : "/shop/decor"}
              className="btn-text"
            >
              Browse Complete {product.department === "ART" ? "Art" : "Décor"} Collection →
            </Link>
          </div>

          <div className="product-grid">
            {recommendations.map((rec) => (
              <ProductCard key={rec.id} product={rec} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
