import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { requireAdmin, serverError } from "@/lib/api";
import { prisma } from "@/lib/prisma";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: RouteContext) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const { id } = await context.params;
    const body = await request.json().catch(() => null);
    const data: Prisma.LocationUpdateInput = {};

    if (body?.name != null) data.name = String(body.name).trim();
    if (body?.address != null) data.address = String(body.address).trim();
    if (body?.phone != null) data.phone = String(body.phone).trim() || null;
    if (body?.mapUrl != null) data.mapUrl = String(body.mapUrl).trim() || null;
    if (body?.isOpen != null) data.isOpen = Boolean(body.isOpen);
    if (body?.sortOrder != null) data.sortOrder = Number(body.sortOrder) || 0;

    const location = await prisma.location.update({ where: { id }, data });
    return NextResponse.json(location);
  } catch (error) {
    return serverError(error, "تعذر تحديث الفرع");
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const { id } = await context.params;
    await prisma.location.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return serverError(error, "تعذر حذف الفرع");
  }
}
