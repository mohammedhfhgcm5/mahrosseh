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

export function resolveOrderPhone(
  location: { phone: string | null },
  settings: SerializedSettings,
) {
  return (
    location.phone?.trim() ||
    settings.orderoPhone?.trim() ||
    settings.whatsappNumbers.find((item) => item.phone.trim())?.phone.trim() ||
    settings.phone.trim() ||
    ""
  );
}

export function buildOrderMessage(opts: {
  customerName: string;
  branchName: string;
  items: CartItem[];
  currency: string;
}) {
  const lines = [
    "*اوردرو*",
    "",
    `الاسم: ${opts.customerName}`,
    `الفرع: ${opts.branchName}`,
    "",
    "الطلب:",
    ...opts.items.map((item) => {
      const lineTotal = item.product.price * item.quantity;
      return `• ${item.product.name} × ${item.quantity} — ${lineTotal} ${opts.currency}`;
    }),
    "",
    `المجموع: ${cartTotal(opts.items)} ${opts.currency}`,
  ];
  return lines.join("\n");
}

export function orderoPath(locationId: string) {
  return `/ordero/${locationId}`;
}

export function qrImageUrl(data: string, size = 400) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(data)}`;
}
