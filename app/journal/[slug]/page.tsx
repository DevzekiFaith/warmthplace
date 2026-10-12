import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await prisma.article.findUnique({
    where: { slug },
  });

  if (!article) return { title: "Article Not Found" };

  return {
    title: `${article.title} — Warmthplace Journal`,
    description: article.excerpt,
  };
}

export default async function JournalArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await prisma.article.findUnique({
    where: { slug },
  });

  if (!article || !article.published) {
    notFound();
  }

  // Parse paragraphs and simple markdown headings/quotes
  const renderedContent = article.body.split("\n\n").map((para, i) => {
    const trimmed = para.trim();
    if (trimmed.startsWith("# ")) {
      return (
        <h2 key={i} style={{ fontSize: "2rem", marginTop: "2.5rem", marginBottom: "1rem" }}>
          {trimmed.replace("# ", "")}
        </h2>
      );
    }
    if (trimmed.startsWith("### ")) {
      return (
        <h3 key={i} style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "0.75rem" }}>
          {trimmed.replace("### ", "")}
        </h3>
      );
    }
    if (trimmed.startsWith("> ")) {
      return (
        <blockquote
          key={i}
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1.45rem",
            fontStyle: "italic",
            lineHeight: 1.5,
            color: "var(--color-terracotta)",
            borderLeft: "3px solid var(--color-muted-brass)",
            paddingLeft: "1.5rem",
            margin: "2.5rem 0",
          }}
        >
          {trimmed.replace("> ", "")}
        </blockquote>
      );
    }
    return (
      <p
        key={i}
        style={{
          fontSize: "1.08rem",
          lineHeight: 1.85,
          color: "var(--color-ink-charcoal)",
          marginBottom: "1.5rem",
        }}
      >
        {trimmed}
      </p>
    );
  });

  return (
    <article className="container" style={{ paddingTop: "3rem", paddingBottom: "7rem" }}>
      <div style={{ maxWidth: "780px", margin: "0 auto" }}>
        <Link
          href="/journal"
          style={{
            fontSize: "0.82rem",
            color: "var(--color-ink-light)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: "1.5rem",
            display: "inline-block",
          }}
        >
          ← Back to All Stories
        </Link>

        <span className="kicker">{article.category}</span>
        <h1
          style={{
            fontSize: "clamp(2.5rem, 4.5vw, 3.8rem)",
            lineHeight: 1.15,
            marginTop: "0.5rem",
            marginBottom: "1.25rem",
          }}
        >
          {article.title}
        </h1>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
            fontSize: "0.85rem",
            color: "var(--color-ink-light)",
            paddingBottom: "2rem",
            borderBottom: "1px solid var(--border-subtle)",
            marginBottom: "3rem",
          }}
        >
          {article.authorName && <span>By {article.authorName}</span>}
          <span>•</span>
          <span>Warmthplace Curatorial Editorial</span>
        </div>

        {/* Hero Cover Image */}
        {article.coverImage && (
          <div
            style={{
              position: "relative",
              height: "440px",
              borderRadius: "3px",
              overflow: "hidden",
              marginBottom: "3rem",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <Image
              src={article.coverImage}
              alt={article.coverAlt || article.title}
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        )}

        {/* Lead Excerpt */}
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1.35rem",
            lineHeight: 1.6,
            color: "var(--color-ink-muted)",
            marginBottom: "2.5rem",
            fontStyle: "italic",
          }}
        >
          {article.excerpt}
        </p>

        {/* Body content */}
        <div>{renderedContent}</div>

        {/* Share & Next */}
        <div
          style={{
            marginTop: "4rem",
            paddingTop: "2.5rem",
            borderTop: "1px solid var(--border-subtle)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <span style={{ fontSize: "0.88rem", color: "var(--color-ink-light)" }}>
            Published by Warmthplace Art Studio, Lagos
          </span>
          <Link href="/journal" className="btn btn-secondary">
            Read More Journal Essays
          </Link>
        </div>
      </div>
    </article>
  );
}
