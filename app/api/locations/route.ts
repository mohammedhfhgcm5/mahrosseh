import { NextResponse } from "next/server";
import { badRequest, requireAdmin, serverError } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const locations = await prisma.location.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json(locations);
  } catch (error) {
    return serverError(error, "تعذر تحميل الفروع");
  }
}

export async function POST(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json().catch(() => null);
    const name = String(body?.name ?? "").trim();
    const address = String(body?.address ?? "").trim();

    if (!name) return badRequest("اسم الفرع مطلوب");
    if (!address) return badRequest("عنوان الفرع مطلوب");

    const location = await prisma.location.create({
      data: {
        name,
        address,
        phone: String(body?.phone ?? "").trim() || null,
        mapUrl: String(body?.mapUrl ?? "").trim() || null,
        isOpen: Boolean(body?.isOpen ?? true),
        sortOrder: Number(body?.sortOrder ?? 0) || 0,
      },
    });

    return NextResponse.json(location, { status: 201 });
  } catch (error) {
    return serverError(error, "تعذر حفظ الفرع");
  }
}
