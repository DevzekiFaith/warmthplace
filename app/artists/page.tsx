import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/db";

export const metadata: Metadata = {
  title: "Artists & Master Makers",
  description:
    "Discover the visionaries shaping contemporary African figurative painting, bronze casting, and heirloom textile weaving at Warmthplace Art Studio.",
};

export default async function ArtistsIndexPage() {
  let artists: any[] = [];
  try {
    artists = await prisma.artist.findMany({
      where: { published: true },
      include: {
        products: {
          where: { status: "PUBLISHED" },
          select: { id: true },
        },
      },
      orderBy: { position: "asc" },
    });
  } catch (err) {
    console.warn("[ArtistsIndexPage] Database query notice during build:", err);
    artists = [];
  }

  return (
    <div className="container" style={{ paddingBottom: "7rem" }}>
      <header className="catalogue-header">
        <span className="kicker">Creative Authority</span>
        <h1 style={{ marginTop: "0.5rem", marginBottom: "1rem" }}>
          Artists & Master Makers
        </h1>
        <p style={{ maxWidth: "680px", fontSize: "1.05rem", lineHeight: 1.6 }}>
          We collaborate directly with contemporary painters, sculptors, and
          textile masters living and working across West Africa. We honour authentic
          cultural lineages, transparent provenance, and generational craft.
        </p>
      </header>

      <div className="artists-grid">
        {artists.map((artist) => (
          <article
            key={artist.id}
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid var(--border-subtle)",
              borderRadius: "3px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ position: "relative", height: "380px", background: "#EEEAE1" }}>
              <Image
                src={artist.portraitImage || "/images/catalogue/harmattan-procession.jpg"}
                alt={artist.name}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>

            <div style={{ padding: "2.25rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "var(--color-terracotta)",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  fontWeight: 600,
                  marginBottom: "0.4rem",
                }}
              >
                {artist.location}
              </span>
              <h2
                style={{
                  fontSize: "2rem",
                  marginBottom: "0.5rem",
                }}
              >
                <Link href={`/artists/${artist.slug}`}>{artist.name}</Link>
              </h2>
              <span
                style={{
                  fontSize: "0.88rem",
                  color: "var(--color-ink-light)",
                  marginBottom: "1rem",
                  fontWeight: 500,
                }}
              >
                {artist.discipline}
              </span>
              <p
                style={{
                  fontSize: "0.95rem",
                  lineHeight: 1.65,
                  color: "var(--color-ink-muted)",
                  marginBottom: "2rem",
                }}
              >
                {artist.shortBio}
              </p>

              <div style={{ marginTop: "auto" }}>
                <Link href={`/artists/${artist.slug}`} className="btn btn-secondary">
                  View Profile & Works ({artist.products.length}) →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
