import React from "react";
import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { DECOR_CATEGORIES } from "@/lib/constants";
import { CatalogueView } from "@/components/CatalogueView";

export const metadata: Metadata = {
  title: "Artisan Home Décor & Living Objects",
  description:
    "Discover burnished terracotta vessels, handwoven narrow-loom throws, fluted iroko wood bowls, sand-cast brass candle holders, and botanical indigo cushions.",
};

export default async function DecorShopPage() {
  const products = await prisma.product.findMany({
    where: {
      department: "DECOR",
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
      title="The Home Décor & Living Collection"
      kicker="Sculptural Domestic Objects"
      description="Hand-coiled terracotta vessels, heirloom strip-woven throws, carved aged iroko bowls, and natural adire cushions. Tactile homeware conceived to infuse modern living spaces with organic texture and cultural depth."
      products={products}
      categories={DECOR_CATEGORIES.map((c) => ({ id: c.id, label: c.label }))}
      department="DECOR"
    />
  );
}
