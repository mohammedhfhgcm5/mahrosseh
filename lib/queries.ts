import type { PageType } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { DEFAULT_SETTINGS } from "@/lib/constants";
import {
  serializeProduct,
  serializeSettings,
  type CategoryWithProducts,
  type ProductWithCategory,
  type SerializedSettings,
} from "@/lib/types";

export async function getSettings(): Promise<SerializedSettings> {
  try {
    const row = await prisma.settings.findUnique({ where: { id: "main" } });
    if (!row) {
      return { ...DEFAULT_SETTINGS, updatedAt: new Date() };
    }
    return serializeSettings(row);
  } catch {
    return { ...DEFAULT_SETTINGS, updatedAt: new Date() };
  }
}

export async function getMenuByPage(page: PageType): Promise<CategoryWithProducts[]> {
  try {
    const categories = await prisma.category.findMany({
      where: { page },
      orderBy: { sortOrder: "asc" },
      include: {
        products: {
          where: { isAvailable: true },
          orderBy: { sortOrder: "asc" },
        },
      },
    });

    return categories.map((category) => ({
      ...category,
      products: category.products.map(serializeProduct),
    }));
  } catch {
    return [];
  }
}

export async function getSpecialsGrouped(): Promise<CategoryWithProducts[]> {
  try {
    const products = await prisma.product.findMany({
      where: { isSpecial: true, isAvailable: true },
      include: { category: true },
      orderBy: { sortOrder: "asc" },
    });

    const map = new Map<string, CategoryWithProducts>();
    for (const product of products) {
      const existing = map.get(product.categoryId);
      const serialized = serializeProduct(product);
      if (existing) {
        existing.products.push(serialized);
      } else {
        map.set(product.categoryId, {
          ...product.category,
          products: [serialized],
        });
      }
    }
    return Array.from(map.values());
  } catch {
    return [];
  }
}

export async function getLocations() {
  try {
    return await prisma.location.findMany({ orderBy: { sortOrder: "asc" } });
  } catch {
    return [];
  }
}

export async function getLocationById(id: string) {
  try {
    return await prisma.location.findUnique({ where: { id } });
  } catch {
    return null;
  }
}

export async function getFullMenu(): Promise<CategoryWithProducts[]> {
  try {
    const categories = await prisma.category.findMany({
      orderBy: [{ page: "asc" }, { sortOrder: "asc" }],
      include: {
        products: {
          where: { isAvailable: true },
          orderBy: { sortOrder: "asc" },
        },
      },
    });

    return categories
      .filter((category) => category.products.length > 0)
      .map((category) => ({
        ...category,
        products: category.products.map(serializeProduct),
      }));
  } catch {
    return [];
  }
}

export async function getDashboardStats() {
  try {
    const [products, categories, locations, settings] = await Promise.all([
      prisma.product.count(),
      prisma.category.count(),
      prisma.location.count(),
      getSettings(),
    ]);

    return { products, categories, locations, settings };
  } catch {
    return {
      products: 0,
      categories: 0,
      locations: 0,
      settings: await getSettings(),
    };
  }
}

export async function getAllProducts(): Promise<ProductWithCategory[]> {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });
  return products.map((product) => ({
    ...serializeProduct(product),
    category: product.category,
  }));
}

export async function getAdminMenuData() {
  try {
    const [categories, products] = await Promise.all([
      prisma.category.findMany({
        orderBy: [{ page: "asc" }, { sortOrder: "asc" }],
      }),
      getAllProducts(),
    ]);
    return { categories, products };
  } catch {
    return { categories: [], products: [] as ProductWithCategory[] };
  }
}
