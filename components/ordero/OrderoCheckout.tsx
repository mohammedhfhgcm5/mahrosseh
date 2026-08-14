"use client";

import { useState } from "react";
import { useOrdero } from "@/components/ordero/OrderoProvider";
import {
  buildOrderMessage,
  cartCount,
  cartTotal,
  resolveOrderPhone,
} from "@/lib/ordero";
import { whatsappLink } from "@/lib/social";

export function OrderoCheckout() {
  const { settings, locations, presetLocation, cart, askName, setAskName, confirmSelection } =
    useOrdero();
  const [customerName, setCustomerName] = useState("");
  const [branchId, setBranchId] = useState(presetLocation?.id ?? locations[0]?.id ?? "");
  const [error, setError] = useState("");

  const count = cartCount(cart);
  const total = cartTotal(cart);
  const selectedBranch =
    presetLocation ?? locations.find((location) => location.id === branchId) ?? null;
  const orderPhone = resolveOrderPhone(settings, selectedBranch);
  const showBranchPicker = !presetLocation && locations.length > 1;

  function sendOrder(event: React.FormEvent) {
    event.preventDefault();
    const name = customerName.trim();
    if (!name) {
      setError("اكتب اسمك حتى نعرف الطلب");
      return;
    }
    if (showBranchPicker && !selectedBranch) {
      setError("اختر الفرع");
      return;
    }
    if (!orderPhone) {
      setError("ما في رقم لاستلام الطلبات. تواصل مع المحل.");
      return;
    }

    const message = buildOrderMessage({
      customerName: name,
      branchName: selectedBranch?.name,
      items: cart,
      currency: settings.currency,
    });
    const url = whatsappLink(orderPhone, message);
    window.location.href = url;
  }

  return (
    <>
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
              اكتب اسمك، وبعدين رح ينفتح واتساب من رقمك لإرسال الطلب للمحل.
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

            {showBranchPicker ? (
              <label className="mt-4 block text-sm font-bold">
                الفرع
                <select
                  value={branchId}
                  onChange={(event) => setBranchId(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-pink-100 px-3 py-3 text-base outline-none focus:border-brand"
                >
                  {locations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.name}
                    </option>
                  ))}
                </select>
              </label>
            ) : selectedBranch ? (
              <p className="mt-3 text-sm text-zinc-500">الفرع: {selectedBranch.name}</p>
            ) : null}

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
    </>
  );
}
