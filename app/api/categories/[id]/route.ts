import { NextResponse } from "next/server";
import { PageType } from "@prisma/client";
import { badRequest, requireAdmin } from "@/lib/api";
import { prisma } from "@/lib/prisma";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: RouteContext) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { id } = await context.params;
  const body = await request.json().catch(() => null);
  const data: {
    name?: string;
    slug?: string;
    icon?: string;
    page?: PageType;
    sortOrder?: number;
  } = {};

  if (body?.name != null) data.name = String(body.name).trim();
  if (body?.slug != null) {
    data.slug = String(body.slug).trim().toLowerCase().replace(/\s+/g, "-");
  }
  if (body?.icon != null) data.icon = String(body.icon).trim();
  if (body?.page != null) {
    if (!Object.values(PageType).includes(body.page)) {
      return badRequest("صفحة التصنيف غير صحيحة");
    }
    data.page = body.page;
  }
  if (body?.sortOrder != null) data.sortOrder = Number(body.sortOrder);

  const category = await prisma.category.update({ where: { id }, data });
  return NextResponse.json(category);
}

export async function DELETE(_request: Request, context: RouteContext) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { id } = await context.params;
  await prisma.category.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
