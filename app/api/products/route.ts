import { NextResponse } from "next/server";
import { badRequest, requireAdmin } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { serializeProduct } from "@/lib/types";

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return NextResponse.json(
    products.map((product) => ({
      ...serializeProduct(product),
      category: product.category,
    })),
  );
}

export async function POST(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const body = await request.json().catch(() => null);
  const name = String(body?.name ?? "").trim();
  const description = String(body?.description ?? "").trim();
  const imageUrl = String(body?.imageUrl ?? "").trim();
  const categoryId = String(body?.categoryId ?? "").trim();
  const price = Number(body?.price);

  if (!name) return badRequest("اسم الصنف مطلوب");
  if (!description) return badRequest("وصف الصنف مطلوب");
  if (!imageUrl) return badRequest("صورة الصنف مطلوبة");
  if (!categoryId) return badRequest("التصنيف مطلوب");
  if (!Number.isFinite(price) || price < 0) return badRequest("السعر غير صحيح");

  const product = await prisma.product.create({
    data: {
      name,
      description,
      imageUrl,
      categoryId,
      price,
      isAvailable: Boolean(body?.isAvailable ?? true),
      isSpecial: Boolean(body?.isSpecial ?? false),
      sortOrder: Number(body?.sortOrder ?? 0) || 0,
    },
    include: { category: true },
  });

  return NextResponse.json(
    { ...serializeProduct(product), category: product.category },
    { status: 201 },
  );
}
