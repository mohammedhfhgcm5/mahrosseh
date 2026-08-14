import {
  Coffee,
  IceCream2,
  Snowflake,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { ProductCard } from "@/components/site/ProductCard";
import type { CategoryWithProducts } from "@/lib/types";

const icons: Record<string, LucideIcon> = {
  snowflake: Snowflake,
  cup: Coffee,
  cone: IceCream2,
  offer: Sparkles,
};

type CategorySectionProps = {
  category: CategoryWithProducts;
  currency: string;
};

export function CategorySection({ category, currency }: CategorySectionProps) {
  const Icon = icons[category.icon] ?? IceCream2;

  return (
    <section className="mt-10">
      <div className="mb-5 flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cream text-brand">
          <Icon className="h-5 w-5" />
        </span>
        <h2 className="text-xl font-extrabold text-brand">{category.name}</h2>
      </div>
      {category.products.length === 0 ? (
        <p className="rounded-2xl bg-white p-6 text-sm text-zinc-500">
          لا توجد أصناف في هذا التصنيف حالياً.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {category.products.map((product) => (
            <ProductCard key={product.id} product={product} currency={currency} />
          ))}
        </div>
      )}
    </section>
  );
}
