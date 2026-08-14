import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { requireAdmin, serverError } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { serializeSettings } from "@/lib/types";
import { normalizeHttpUrl, parseWhatsappNumbers } from "@/lib/social";

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const settings = await prisma.settings.upsert({
      where: { id: "main" },
      update: {},
      create: {
        id: "main",
        storeName: "Fragola Gelato",
        phone: "",
        address: "",
        description: "",
        currency: "ل.س",
        heroTitle: "",
        heroText: "",
        heroImage: "",
      },
    });

    return NextResponse.json(serializeSettings(settings));
  } catch (error) {
    return serverError(error, "تعذر تحميل الإعدادات");
  }
}

export async function PUT(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json().catch(() => null);
    const whatsappNumbers = parseWhatsappNumbers(body?.whatsappNumbers);

    const data = {
      storeName: String(body?.storeName ?? "Fragola Gelato"),
      phone: String(body?.phone ?? ""),
      address: String(body?.address ?? ""),
      description: String(body?.description ?? ""),
      isOpen: Boolean(body?.isOpen ?? true),
      currency: String(body?.currency ?? "ل.س"),
      taxEnabled: Boolean(body?.taxEnabled ?? false),
      taxRate: Number(body?.taxRate ?? 0.15),
      heroTitle: String(body?.heroTitle ?? ""),
      heroText: String(body?.heroText ?? ""),
      heroImage: String(body?.heroImage ?? ""),
      showWhatsapp: Boolean(body?.showWhatsapp),
      showInstagram: Boolean(body?.showInstagram),
      showFacebook: Boolean(body?.showFacebook),
      instagramUrl: normalizeHttpUrl(String(body?.instagramUrl ?? "")),
      facebookUrl: normalizeHttpUrl(String(body?.facebookUrl ?? "")),
      whatsappNumbers: whatsappNumbers as Prisma.InputJsonValue,
    };

    const settings = await prisma.settings.upsert({
      where: { id: "main" },
      create: {
        id: "main",
        ...data,
      },
      update: data,
    });

    return NextResponse.json(serializeSettings(settings));
  } catch (error) {
    return serverError(error, "تعذر حفظ الإعدادات");
  }
}
