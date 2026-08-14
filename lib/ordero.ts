import type { SerializedProduct, SerializedSettings } from "@/lib/types";

export type CartItem = {
  product: SerializedProduct;
  quantity: number;
};

export function cartCount(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function cartTotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}

export type OrderoBranch = {
  id: string;
  name: string;
  phone: string | null;
  isOpen: boolean;
};

export const ORDERO_CART_KEY = "fragola-ordero-cart";

export function resolveOrderPhone(
  settings: SerializedSettings,
  location?: { phone: string | null } | null,
) {
  return (
    settings.orderoPhone?.trim() ||
    location?.phone?.trim() ||
    settings.whatsappNumbers.find((item) => item.phone.trim())?.phone.trim() ||
    settings.phone.trim() ||
    ""
  );
}

export function buildOrderMessage(opts: {
  customerName: string;
  branchName?: string;
  items: CartItem[];
  currency: string;
}) {
  const lines = [
    "*اوردرو*",
    "",
    `الاسم: ${opts.customerName}`,
  ];
  if (opts.branchName) {
    lines.push(`الفرع: ${opts.branchName}`);
  }
  lines.push(
    "",
    "الطلب:",
    ...opts.items.map((item) => {
      const lineTotal = item.product.price * item.quantity;
      return `• ${item.product.name} × ${item.quantity} — ${lineTotal} ${opts.currency}`;
    }),
    "",
    `المجموع: ${cartTotal(opts.items)} ${opts.currency}`,
  );
  return lines.join("\n");
}

export function orderoPath(locationId: string) {
  return `/ordero/${locationId}`;
}

export function qrImageUrl(data: string, size = 400) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(data)}`;
}
