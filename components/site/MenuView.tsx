import { Hero } from "@/components/site/Hero";
import { CategorySection } from "@/components/site/CategorySection";
import { DEFAULT_SETTINGS } from "@/lib/constants";
import type { CategoryWithProducts, SerializedSettings } from "@/lib/types";

type MenuViewProps = {
  title: string;
  description: string;
  heroImage: string;
  categories: CategoryWithProducts[];
  settings: SerializedSettings;
  emptyMessage: string;
};

export function MenuView({
  title,
  description,
  heroImage,
  categories,
  settings,
  emptyMessage,
}: MenuViewProps) {
  const hasItems = categories.some((category) => category.products.length > 0);

  return (
    <>
      <Hero
        title={title}
        description={description}
        imageUrl={heroImage || DEFAULT_SETTINGS.heroImage}
      />
      <div id="menu" className="mx-auto max-w-7xl px-4 pb-16">
        {hasItems ? (
          categories.map((category) => (
            <CategorySection
              key={category.id}
              category={category}
              currency={settings.currency}
            />
          ))
        ) : (
          <p className="mt-10 rounded-3xl bg-white p-10 text-center text-zinc-500">
            {emptyMessage}
          </p>
        )}
      </div>
    </>
  );
}
