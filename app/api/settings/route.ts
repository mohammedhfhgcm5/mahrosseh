import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { serializeSettings } from "@/lib/types";

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const settings = await prisma.settings.upsert({
    where: { id: "main" },
    update: {},
    create: {
      id: "main",
      storeName: "Fragola Gelato",
      phone: "",
      address: "",
      description: "",
      heroTitle: "",
      heroText: "",
      heroImage: "",
    },
  });

  return NextResponse.json(serializeSettings(settings));
}

export async function PUT(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const body = await request.json().catch(() => null);

  const settings = await prisma.settings.upsert({
    where: { id: "main" },
    create: {
      id: "main",
      storeName: String(body?.storeName ?? "Fragola Gelato"),
      phone: String(body?.phone ?? ""),
      address: String(body?.address ?? ""),
      description: String(body?.description ?? ""),
      isOpen: Boolean(body?.isOpen ?? true),
      currency: String(body?.currency ?? "ر.س"),
      taxEnabled: Boolean(body?.taxEnabled ?? false),
      taxRate: Number(body?.taxRate ?? 0.15),
      heroTitle: String(body?.heroTitle ?? ""),
      heroText: String(body?.heroText ?? ""),
      heroImage: String(body?.heroImage ?? ""),
    },
    update: {
      storeName: String(body?.storeName ?? ""),
      phone: String(body?.phone ?? ""),
      address: String(body?.address ?? ""),
      description: String(body?.description ?? ""),
      isOpen: Boolean(body?.isOpen),
      currency: String(body?.currency ?? "ر.س"),
      taxEnabled: Boolean(body?.taxEnabled),
      taxRate: Number(body?.taxRate ?? 0.15),
      heroTitle: String(body?.heroTitle ?? ""),
      heroText: String(body?.heroText ?? ""),
      heroImage: String(body?.heroImage ?? ""),
    },
  });

  return NextResponse.json(serializeSettings(settings));
}
