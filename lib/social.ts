export type WhatsAppContact = {
  id: string;
  phone: string;
  label: string;
};

export function digitsOnly(phone: string) {
  let digits = phone.replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  return digits;
}

export function whatsappLink(phone: string) {
  const digits = digitsOnly(phone);
  return digits ? `https://wa.me/${digits}` : "";
}

export function parseWhatsappNumbers(value: unknown): WhatsAppContact[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === "object")
    .map((item) => ({
      id: String(item.id ?? crypto.randomUUID()),
      phone: String(item.phone ?? "").trim(),
      label: String(item.label ?? "").trim(),
    }))
    .slice(0, 3);
}

export function normalizeHttpUrl(url: string) {
  const trimmed = url.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}
