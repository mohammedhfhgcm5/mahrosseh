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
    <section className="mt-8 sm:mt-10">
      <div className="mb-4 flex items-center gap-2 sm:mb-5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cream text-brand sm:h-9 sm:w-9">
          <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
        </span>
        <h2 className="text-lg font-extrabold text-brand sm:text-xl">{category.name}</h2>
      </div>
      {category.products.length === 0 ? (
        <p className="rounded-2xl bg-white p-6 text-sm text-zinc-500">
          لا توجد أصناف في هذا التصنيف حالياً.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-3 min-[380px]:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {category.products.map((product) => (
            <ProductCard key={product.id} product={product} currency={currency} />
          ))}
        </div>
      )}
    </section>
  );
}
