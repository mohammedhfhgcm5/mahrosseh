"use client";

import Image from "next/image";
import { CategorySection } from "@/components/site/CategorySection";
import { OrderoCheckout } from "@/components/ordero/OrderoCheckout";
import { OrderoProvider, useOrdero } from "@/components/ordero/OrderoProvider";
import { cartCount, type OrderoBranch } from "@/lib/ordero";
import type { CategoryWithProducts, SerializedSettings } from "@/lib/types";

const PAGE_LABELS: Record<string, string> = {
  GELATO: "جيلاتو",
  BEVERAGES: "المشروبات",
  SPECIALS: "العروض",
};

type OrderoAppProps = {
  location: OrderoBranch;
  settings: SerializedSettings;
  categories: CategoryWithProducts[];
};

export function OrderoApp({ location, settings, categories }: OrderoAppProps) {
  return (
    <OrderoProvider settings={settings} locations={[location]} presetLocation={location}>
      <OrderoQrMenu location={location} settings={settings} categories={categories} />
      <OrderoCheckout />
    </OrderoProvider>
  );
}

function OrderoQrMenu({
  location,
  settings,
  categories,
}: OrderoAppProps) {
  const { cart, getQuantity, increment, decrement } = useOrdero();
  const hasCart = cartCount(cart) > 0;

  const grouped: { page: string; categories: CategoryWithProducts[] }[] = [];
  for (const category of categories) {
    const last = grouped[grouped.length - 1];
    if (last && last.page === category.page) {
      last.categories.push(category);
    } else {
      grouped.push({ page: category.page, categories: [category] });
    }
  }

  return (
    <div className="flex min-h-full flex-col">
      <header className="sticky top-0 z-40 border-b border-pink-100 bg-white/95 backdrop-blur">
        {!location.isOpen ? (
          <p className="bg-brand px-3 py-1.5 text-center text-xs text-white sm:text-sm">
            هذا الفرع مغلق حالياً — يمكنك تصفّح المنيو
          </p>
        ) : null}
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 py-2.5 sm:px-4">
          <div className="flex min-w-0 items-center gap-3">
            <Image
              src="/logo.png"
              alt={settings.storeName}
              width={120}
              height={48}
              className="h-10 w-auto object-contain sm:h-12"
              priority
            />
            <div className="min-w-0">
              <p className="text-sm font-extrabold text-brand sm:text-base">اوردرو</p>
              <p className="truncate text-xs text-zinc-500 sm:text-sm">{location.name}</p>
            </div>
          </div>
        </div>
      </header>

      <main
        className={`mx-auto w-full max-w-7xl flex-1 px-3 sm:px-4 ${hasCart ? "pb-28" : "pb-16"}`}
      >
        {grouped.length === 0 ? (
          <p className="mt-10 rounded-3xl bg-white p-10 text-center text-zinc-500">
            المنيو فارغ حالياً.
          </p>
        ) : (
          grouped.map((group) => (
            <div key={group.page}>
              <h2 className="mt-8 text-xl font-extrabold text-zinc-900 sm:mt-10 sm:text-2xl">
                {PAGE_LABELS[group.page] ?? group.page}
              </h2>
              {group.categories.map((category) => (
                <CategorySection
                  key={category.id}
                  category={category}
                  currency={settings.currency}
                  getQuantity={getQuantity}
                  onIncrement={increment}
                  onDecrement={decrement}
                />
              ))}
            </div>
          ))
        )}
      </main>
    </div>
  );
}
