import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { badRequest, requireAdmin } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { serializeProduct } from "@/lib/types";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: RouteContext) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { id } = await context.params;
  const body = await request.json().catch(() => null);
  const data: Prisma.ProductUpdateInput = {};

  if (body?.name != null) data.name = String(body.name).trim();
  if (body?.description != null) data.description = String(body.description).trim();
  if (body?.imageUrl != null) data.imageUrl = String(body.imageUrl).trim();
  if (body?.categoryId != null) {
    data.category = { connect: { id: String(body.categoryId) } };
  }
  if (body?.price != null) {
    const price = Number(body.price);
    if (!Number.isFinite(price) || price < 0) return badRequest("السعر غير صحيح");
    data.price = price;
  }
  if (body?.isAvailable != null) data.isAvailable = Boolean(body.isAvailable);
  if (body?.isSpecial != null) data.isSpecial = Boolean(body.isSpecial);
  if (body?.sortOrder != null) data.sortOrder = Number(body.sortOrder) || 0;

  const product = await prisma.product.update({
    where: { id },
    data,
    include: { category: true },
  });

  return NextResponse.json({
    ...serializeProduct(product),
    category: product.category,
  });
}

export async function DELETE(_request: Request, context: RouteContext) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { id } = await context.params;
  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
