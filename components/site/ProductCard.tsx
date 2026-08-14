"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import type { SerializedProduct } from "@/lib/types";

type ProductCardProps = {
  product: SerializedProduct;
  currency: string;
};

export function ProductCard({ product, currency }: ProductCardProps) {
  return (
    <article className="flex flex-col rounded-3xl bg-white p-3 shadow-sm ring-1 ring-pink-50">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-cream">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover"
        />
      </div>
      <h3 className="mt-3 text-base font-bold text-zinc-900">{product.name}</h3>
      <p className="mt-1 line-clamp-2 min-h-10 text-sm leading-6 text-zinc-500">
        {product.description}
      </p>
      <div className="mt-auto flex items-center justify-between pt-3">
        <p className="text-sm font-extrabold text-zinc-900">
          {product.price} {currency}
        </p>
        <button
          type="button"
          aria-label={`إضافة ${product.name}`}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-white transition hover:bg-brand-dark"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>
    </article>
  );
}
