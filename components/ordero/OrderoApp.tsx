"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { CategorySection } from "@/components/site/CategorySection";
import {
  buildOrderMessage,
  cartCount,
  cartTotal,
  resolveOrderPhone,
  type CartItem,
} from "@/lib/ordero";
import { whatsappLink } from "@/lib/social";
import type { Location } from "@prisma/client";
import type { CategoryWithProducts, SerializedProduct, SerializedSettings } from "@/lib/types";

const PAGE_LABELS: Record<string, string> = {
  GELATO: "جيلاتو",
  BEVERAGES: "المشروبات",
  SPECIALS: "العروض",
};

type OrderoAppProps = {
  location: Pick<Location, "id" | "name" | "phone" | "isOpen">;
  settings: SerializedSettings;
  categories: CategoryWithProducts[];
};

export function OrderoApp({ location, settings, categories }: OrderoAppProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [askName, setAskName] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [error, setError] = useState("");

  const quantities = useMemo(() => {
    const map: Record<string, number> = {};
    for (const item of cart) map[item.product.id] = item.quantity;
    return map;
  }, [cart]);

  const count = cartCount(cart);
  const total = cartTotal(cart);
  const orderPhone = resolveOrderPhone(location, settings);

  const grouped = useMemo(() => {
    const pages: { page: string; categories: CategoryWithProducts[] }[] = [];
    for (const category of categories) {
      const last = pages[pages.length - 1];
      if (last && last.page === category.page) {
        last.categories.push(category);
      } else {
        pages.push({ page: category.page, categories: [category] });
      }
    }
    return pages;
  }, [categories]);

  function increment(product: SerializedProduct) {
    setCart((current) => {
      const existing = current.find((item) => item.product.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...current, { product, quantity: 1 }];
    });
  }

  function decrement(productId: string) {
    setCart((current) =>
      current
        .map((item) =>
          item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function confirmSelection() {
    if (count === 0) return;
    setError("");
    setAskName(true);
  }

  function sendOrder(event: React.FormEvent) {
    event.preventDefault();
    const name = customerName.trim();
    if (!name) {
      setError("اكتب اسمك حتى نعرف الطلب");
      return;
    }
    if (!orderPhone) {
      setError("هذا الفرع بدون رقم واتساب. تواصل مع المحل.");
      return;
    }

    const message = buildOrderMessage({
      customerName: name,
      branchName: location.name,
      items: cart,
      currency: settings.currency,
    });
    const url = whatsappLink(orderPhone, message);
    window.location.href = url;
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

      <main className={`mx-auto w-full max-w-7xl flex-1 px-3 sm:px-4 ${count > 0 ? "pb-28" : "pb-16"}`}>
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
                  getQuantity={(id) => quantities[id] ?? 0}
                  onIncrement={increment}
                  onDecrement={decrement}
                />
              ))}
            </div>
          ))
        )}
      </main>

      {count > 0 ? (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-pink-100 bg-white/95 px-3 py-3 shadow-[0_-8px_30px_rgba(230,0,126,0.12)] backdrop-blur sm:px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <div className="mx-auto flex max-w-7xl items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-extrabold text-zinc-900">
                {count} {count === 1 ? "صنف" : "أصناف"}
              </p>
              <p className="text-xs font-bold text-brand">
                {total} {settings.currency}
              </p>
            </div>
            <button
              type="button"
              onClick={confirmSelection}
              className="rounded-full bg-brand px-8 py-3 text-sm font-extrabold text-white hover:bg-brand-dark"
            >
              موافق
            </button>
          </div>
        </div>
      ) : null}

      {askName ? (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/40 p-4 sm:items-center">
          <form
            onSubmit={sendOrder}
            className="w-full max-w-md rounded-3xl bg-white p-5 shadow-xl sm:p-6"
          >
            <h2 className="text-xl font-extrabold text-brand">اوردرو</h2>
            <p className="mt-1 text-sm text-zinc-500">
              اكتب اسمك لنرسل الطلب إلى فرع {location.name}
            </p>

            <ul className="mt-4 max-h-40 space-y-2 overflow-y-auto rounded-2xl bg-page p-3 text-sm">
              {cart.map((item) => (
                <li key={item.product.id} className="flex justify-between gap-3">
                  <span className="font-semibold text-zinc-800">
                    {item.product.name} × {item.quantity}
                  </span>
                  <span className="shrink-0 font-bold text-zinc-600">
                    {item.product.price * item.quantity} {settings.currency}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-sm font-extrabold text-zinc-900">
              المجموع: {total} {settings.currency}
            </p>

            <label className="mt-4 block text-sm font-bold">
              اسمك
              <input
                value={customerName}
                onChange={(event) => setCustomerName(event.target.value)}
                placeholder="مثال: أحمد"
                autoFocus
                className="mt-2 w-full rounded-xl border border-pink-100 px-3 py-3 text-base outline-none focus:border-brand"
              />
            </label>
            {error ? <p className="mt-2 text-sm font-semibold text-red-500">{error}</p> : null}

            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setAskName(false);
                  setError("");
                }}
                className="flex-1 rounded-full border-2 border-pink-100 py-3 text-sm font-bold text-zinc-600"
              >
                رجوع
              </button>
              <button
                type="submit"
                className="flex-1 rounded-full bg-brand py-3 text-sm font-extrabold text-white hover:bg-brand-dark"
              >
                تم
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
}
