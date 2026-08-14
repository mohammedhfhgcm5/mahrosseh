import type { Category, Location, Product, Settings } from "@prisma/client";

export type SerializedProduct = Omit<Product, "price"> & { price: number };
export type SerializedSettings = Omit<Settings, "taxRate"> & { taxRate: number };

export type CategoryWithProducts = Category & {
  products: SerializedProduct[];
};

export type ProductWithCategory = SerializedProduct & {
  category: Category;
};

export function serializeProduct(product: Product): SerializedProduct {
  return { ...product, price: Number(product.price) };
}

export function serializeSettings(settings: Settings): SerializedSettings {
  return { ...settings, taxRate: Number(settings.taxRate) };
}

export type { Category, Location };
