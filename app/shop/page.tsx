import React from "react";
import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { ART_CATEGORIES, DECOR_CATEGORIES, SITE_NAME } from "@/lib/constants";
import { CatalogueView } from "@/components/CatalogueView";

export const metadata: Metadata = {
  title: `The Full Art House Catalogue | ${SITE_NAME}`,
  description:
    "Explore the complete Warmthplace collection: museum-grade contemporary African paintings, bronze sculptures, burnished pottery, handwoven textiles, and architectural accents.",
};

export default async function FullShopPage() {
  const products = await prisma.product.findMany({
    where: {
      status: "PUBLISHED",
    },
    include: {
      artist: { select: { name: true, slug: true } },
      images: { orderBy: { position: "asc" } },
    },
    orderBy: { createdAt: "desc" },
  });

  const combinedCategories = [
    ...ART_CATEGORIES.map((c) => ({ id: c.id, label: c.label })),
    ...DECOR_CATEGORIES.map((c) => ({ id: c.id, label: c.label })),
  ];

  return (
    <CatalogueView
      title="The Complete Studio Catalogue"
      kicker="All Works & Living Objects"
      description="The definitive Warmthplace collection bridging monumental contemporary African canvases with tactile living homeware. Filter by medium, collection, or search term below."
      products={products}
      categories={combinedCategories}
    />
  );
}
