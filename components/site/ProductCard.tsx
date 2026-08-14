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
    <article className="flex min-w-0 flex-col rounded-2xl bg-white p-2 shadow-sm ring-1 ring-pink-50 sm:rounded-3xl sm:p-3">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-cream sm:rounded-2xl">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 380px) 100vw, (max-width: 768px) 50vw, 25vw"
          className="object-cover"
        />
      </div>
      <h3 className="mt-2 break-words text-sm font-bold leading-6 text-zinc-900 sm:mt-3 sm:text-base">
        {product.name}
      </h3>
      <p className="mt-1 line-clamp-2 min-h-0 text-xs leading-5 text-zinc-500 sm:min-h-10 sm:text-sm sm:leading-6">
        {product.description}
      </p>
      <div className="mt-auto flex items-center justify-between gap-2 pt-2 sm:pt-3">
        <p className="min-w-0 text-xs font-extrabold text-zinc-900 sm:text-sm">
          {product.price} {currency}
        </p>
        <button
          type="button"
          aria-label={`إضافة ${product.name}`}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-white transition hover:bg-brand-dark sm:h-9 sm:w-9"
        >
          <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      </div>
    </article>
  );
}
