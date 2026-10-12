"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "./CartContext";
import { useCurrency } from "./CurrencyContext";
import { BASE_CURRENCY } from "@/lib/constants";
import { formatPrice } from "@/lib/currency";

export interface ProductCardProps {
  product: {
    id: string;
    slug: string;
    title: string;
    department: string;
    category: string;
    productType: string;
    editionSize?: number | null;
    price: number;
    currency: string;
    stock: number;
    medium?: string | null;
    materials?: string | null;
    widthCm?: number | null;
    heightCm?: number | null;
    enquiryOnly?: boolean;
    shippingClass: string;
    artist?: {
      name: string;
      slug: string;
    } | null;
    images: {
      url: string;
      alt: string;
    }[];
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { currency, format } = useCurrency();

  const primaryImage = product.images[0] || {
    url: "/images/catalogue/harmattan-procession.jpg",
    alt: product.title,
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.enquiryOnly) {
      window.location.href = `/products/${product.slug}#enquire`;
      return;
    }
    addItem({
      id: product.id,
      slug: product.slug,
      title: product.title,
      artistName: product.artist?.name || null,
      department: product.department,
      category: product.category,
      productType: product.productType,
      price: product.price,
      currency: product.currency,
      imageUrl: primaryImage.url,
      imageAlt: primaryImage.alt,
      stock: product.stock,
      shippingClass: product.shippingClass,
    });
  };

  const dimensionsLabel =
    product.widthCm && product.heightCm
      ? `${product.widthCm} × ${product.heightCm} cm`
      : null;

  return (
    <article className="product-card">
      <Link
        href={`/products/${product.slug}`}
        className="product-image-container"
        tabIndex={0}
      >
        <Image
          src={primaryImage.url}
          alt={primaryImage.alt || product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
          className="product-image"
          loading="lazy"
        />

        {/* Overlay Badges */}
        <div className="product-badges-overlay">
          {product.productType === "ORIGINAL" && (
            <span className="badge badge-original">Original Work</span>
          )}
          {product.productType === "EDITION" && (
            <span className="badge badge-edition">
              Edition of {product.editionSize || 25}
            </span>
          )}
          {product.department === "DECOR" && (
            <span className="badge badge-decor">Living Object</span>
          )}
          {product.stock <= 2 && product.stock > 0 && !product.enquiryOnly && (
            <span className="badge badge-low-stock">
              Only {product.stock} Available
            </span>
          )}
        </div>

        {/* Quick Add Button */}
        <button
          type="button"
          onClick={handleQuickAdd}
          className="product-quick-add-btn"
          aria-label={
            product.enquiryOnly
              ? `Inquire about ${product.title}`
              : `Add ${product.title} to bag`
          }
        >
          {product.enquiryOnly ? "Inquire with Studio" : "Add to Bag"}
        </button>
      </Link>

      <div className="product-info">
        {product.artist ? (
          <Link
            href={`/artists/${product.artist.slug}`}
            className="product-artist"
            style={{ textDecoration: "none" }}
          >
            {product.artist.name}
          </Link>
        ) : (
          <span className="product-artist">Warmthplace Studio</span>
        )}

        <h3 className="product-title">
          <Link href={`/products/${product.slug}`}>{product.title}</Link>
        </h3>

        <div className="product-meta-specs">
          {product.medium || product.materials || dimensionsLabel}
        </div>

        <div className="product-price-row">
          <span className="product-price-primary">
            {format(product.price)}
          </span>

          {currency !== BASE_CURRENCY && (
            <span
              className="product-price-indicative"
              title="Official base checkout currency is Nigerian Naira (NGN)"
            >
              Base: {formatPrice(product.price, BASE_CURRENCY)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
