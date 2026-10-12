import React from "react";
import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { ART_CATEGORIES, SITE_NAME } from "@/lib/constants";
import { CatalogueView } from "@/components/CatalogueView";

export const metadata: Metadata = {
  title: "African Contemporary Art Collection",
  description:
    "Explore original paintings on Belgian linen, mixed-media works on paper, limited editions, and lost-wax cast bronzes from West Africa's leading contemporary artists.",
};

export default async function ArtShopPage() {
  const products = await prisma.product.findMany({
    where: {
      department: "ART",
      status: "PUBLISHED",
    },
    include: {
      artist: { select: { name: true, slug: true } },
      images: { orderBy: { position: "asc" } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <CatalogueView
      title="The Fine Art Collection"
      kicker="Original Canvases & Editions"
      description="Museum-calibre original paintings, masterworks on paper, archival photographs, and sculptural castings. Every original piece includes an authenticated certificate of provenance and custom art-crating."
      products={products}
      categories={ART_CATEGORIES.map((c) => ({ id: c.id, label: c.label }))}
      department="ART"
    />
  );
}
