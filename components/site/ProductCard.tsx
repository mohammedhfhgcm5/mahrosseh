"use client";

import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import type { SerializedProduct } from "@/lib/types";

type ProductCardProps = {
  product: SerializedProduct;
  currency: string;
  quantity?: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
};

export function ProductCard({
  product,
  currency,
  quantity = 0,
  onIncrement,
  onDecrement,
}: ProductCardProps) {
  const canOrder = Boolean(onIncrement);

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
        {quantity > 0 ? (
          <span className="absolute top-2 right-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-brand px-1.5 text-xs font-extrabold text-white">
            {quantity}
          </span>
        ) : null}
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
        {canOrder && quantity > 0 ? (
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label={`إنقاص ${product.name}`}
              onClick={onDecrement}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cream text-brand transition hover:bg-pink-100 sm:h-9 sm:w-9"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="min-w-5 text-center text-sm font-extrabold text-zinc-900">
              {quantity}
            </span>
            <button
              type="button"
              aria-label={`إضافة ${product.name}`}
              onClick={onIncrement}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-white transition hover:bg-brand-dark sm:h-9 sm:w-9"
            >
              <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            aria-label={`إضافة ${product.name}`}
            onClick={onIncrement}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-white transition hover:bg-brand-dark sm:h-9 sm:w-9"
          >
            <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        )}
      </div>
    </article>
  );
}
