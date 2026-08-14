import { NextResponse } from "next/server";
import { PageType } from "@prisma/client";
import { badRequest, requireAdmin } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const categories = await prisma.category.findMany({
    orderBy: [{ page: "asc" }, { sortOrder: "asc" }],
    include: { _count: { select: { products: true } } },
  });

  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const body = await request.json().catch(() => null);
  const name = String(body?.name ?? "").trim();
  const icon = String(body?.icon ?? "cone").trim() || "cone";
  const page = body?.page as PageType;
  const sortOrder = Number(body?.sortOrder ?? 0);
  const slug =
    String(body?.slug ?? "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-") || `cat-${Date.now()}`;

  if (!name) return badRequest("اسم التصنيف مطلوب");
  if (!Object.values(PageType).includes(page)) {
    return badRequest("اختر صفحة التصنيف");
  }

  const category = await prisma.category.create({
    data: { name, slug, icon, page, sortOrder: Number.isFinite(sortOrder) ? sortOrder : 0 },
  });

  return NextResponse.json(category, { status: 201 });
}
