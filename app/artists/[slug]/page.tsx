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
    const artist = await prisma.artist.findUnique({
      where: { slug },
    });

    if (!artist) return { title: "Artist Not Found" };

    return {
      title: `${artist.name} — Artist Profile`,
      description: artist.shortBio,
    };
  } catch (err) {
    console.warn("[ArtistProfileMetadata] Database query notice:", err);
    return { title: "Artist Profile — Warmthplace" };
  }
}

async function getArtist(slug: string) {
  try {
    return await prisma.artist.findUnique({
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
    console.warn("[ArtistProfilePage] Database query notice:", err);
    return null;
  }
}

export default async function ArtistProfilePage({ params }: Props) {
  const { slug } = await params;
  const artist = await getArtist(slug);

  if (!artist) {
    notFound();
  }

  return (
    <div className="container" style={{ paddingBottom: "7rem" }}>
      {/* Back button */}
      <div style={{ paddingTop: "2.5rem", marginBottom: "2rem" }}>
        <Link
          href="/artists"
          style={{
            fontSize: "0.82rem",
            color: "var(--color-ink-light)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          ← Back to All Artists
        </Link>
      </div>

      {/* Artist Profile Header Section */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.35fr",
          gap: "clamp(2.5rem, 5vw, 5rem)",
          alignItems: "center",
          paddingBottom: "4rem",
          borderBottom: "1px solid var(--border-subtle)",
          marginBottom: "4.5rem",
        }}
      >
        <div
          style={{
            position: "relative",
            height: "520px",
            borderRadius: "3px",
            overflow: "hidden",
            boxShadow: "var(--shadow-card)",
            background: "#EEEAE1",
          }}
        >
          <Image
            src={artist.portraitImage || "/images/catalogue/harmattan-procession.jpg"}
            alt={artist.name}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>

        <div>
          <span className="kicker">{artist.location}</span>
          <h1
            style={{
              fontSize: "clamp(2.5rem, 4.5vw, 3.8rem)",
              marginTop: "0.4rem",
              marginBottom: "0.5rem",
            }}
          >
            {artist.name}
          </h1>
          <p
            style={{
              fontSize: "1.05rem",
              color: "var(--color-terracotta)",
              fontWeight: 500,
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              marginBottom: "1.75rem",
            }}
          >
            {artist.discipline}
          </p>

          <div
            style={{
              fontSize: "1rem",
              lineHeight: 1.8,
              color: "var(--color-ink-muted)",
              marginBottom: "2rem",
            }}
          >
            <p>{artist.bio}</p>
          </div>

          <div style={{ display: "flex", gap: "1rem" }}>
            <a href="#works" className="btn btn-primary">
              View Available Works ({artist.products.length})
            </a>
            <Link
              href={`/contact?subject=Commission inquiry for ${encodeURIComponent(artist.name)}`}
              className="btn btn-secondary"
            >
              Commission Inquiries
            </Link>
          </div>
        </div>
      </div>

      {/* Works in Studio / Gallery */}
      <section id="works">
        <div style={{ marginBottom: "2.5rem" }}>
          <span className="kicker">Available Catalogue</span>
          <h2 style={{ fontSize: "2.2rem", marginTop: "0.4rem" }}>
            Works by {artist.name}
          </h2>
        </div>

        {artist.products.length === 0 ? (
          <p style={{ color: "var(--color-ink-muted)" }}>
            All current pieces by {artist.name} have been placed in private collections.
            Contact us for upcoming studio acquisitions.
          </p>
        ) : (
          <div className="product-grid">
            {artist.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
