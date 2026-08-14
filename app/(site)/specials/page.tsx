import type { Metadata } from "next";
import { JsonLd } from "@/components/site/JsonLd";
import { MenuView } from "@/components/site/MenuView";
import { PAGE_COPY } from "@/lib/constants";
import { getSettings, getSpecialsGrouped } from "@/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: PAGE_COPY.SPECIALS.seoTitle,
  description: PAGE_COPY.SPECIALS.seoDescription,
  alternates: { canonical: "/specials" },
  openGraph: {
    title: PAGE_COPY.SPECIALS.title,
    description: PAGE_COPY.SPECIALS.seoDescription,
  },
};

export default async function SpecialsPage() {
  const [settings, categories] = await Promise.all([
    getSettings(),
    getSpecialsGrouped(),
  ]);

  return (
    <>
      <JsonLd settings={settings} categories={categories} />
      <MenuView
        title={PAGE_COPY.SPECIALS.title}
        description={PAGE_COPY.SPECIALS.description}
        heroImage={settings.heroImage}
        categories={categories}
        settings={settings}
        emptyMessage="لا توجد عروض حالياً. تابعونا قريباً."
      />
    </>
  );
}
