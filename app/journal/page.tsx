import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "The Warmthplace Journal — Stories, Essays & Interviews",
  description:
    "Thoughtful essays on West African art history, studio interviews with master ceramists, and insights into contemporary African interior living.",
};

export default async function JournalIndexPage() {
  let articles: any[] = [];
  try {
    articles = await prisma.article.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.warn("[JournalIndexPage] Database query notice:", err);
    articles = [];
  }

  return (
    <div className="container" style={{ paddingBottom: "7rem" }}>
      <header className="catalogue-header">
        <span className="kicker">Editorial & Cultural Dialogue</span>
        <h1 style={{ marginTop: "0.5rem", marginBottom: "1rem" }}>
          The Warmthplace Journal
        </h1>
        <p style={{ maxWidth: "680px", fontSize: "1.05rem", lineHeight: 1.6 }}>
          Writings on living indigo dye chemistry, matrilineal textile traditions,
          pit-firing techniques, and the cultural poetics of contemporary African living spaces.
        </p>
      </header>

      <div className="journal-grid">
        {articles.map((art) => (
          <Link key={art.id} href={`/journal/${art.slug}`} className="journal-card">
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
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <span className="journal-category">{art.category}</span>
              {art.authorName && (
                <span style={{ fontSize: "0.75rem", color: "var(--color-ink-light)" }}>
                  By {art.authorName}
                </span>
              )}
            </div>
            <h2 className="journal-title" style={{ fontSize: "1.6rem" }}>
              {art.title}
            </h2>
            <p className="journal-excerpt">{art.excerpt}</p>
            <span
              style={{
                fontSize: "0.78rem",
                color: "var(--color-ink-charcoal)",
                fontWeight: 600,
                marginTop: "1rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              Read Essay →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
