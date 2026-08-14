import type { Metadata } from "next";
import { JsonLd } from "@/components/site/JsonLd";
import { MenuView } from "@/components/site/MenuView";
import { PAGE_COPY } from "@/lib/constants";
import { getMenuByPage, getSettings } from "@/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: PAGE_COPY.BEVERAGES.seoTitle,
  description: PAGE_COPY.BEVERAGES.seoDescription,
  alternates: { canonical: "/beverages" },
  openGraph: {
    title: PAGE_COPY.BEVERAGES.title,
    description: PAGE_COPY.BEVERAGES.seoDescription,
  },
};

export default async function BeveragesPage() {
  const [settings, categories] = await Promise.all([
    getSettings(),
    getMenuByPage("BEVERAGES"),
  ]);

  return (
    <>
      <JsonLd settings={settings} categories={categories} />
      <MenuView
        title={PAGE_COPY.BEVERAGES.title}
        description={PAGE_COPY.BEVERAGES.description}
        heroImage={settings.heroImage}
        categories={categories}
        settings={settings}
        emptyMessage="سيتم إضافة المشروبات قريباً."
      />
    </>
  );
}
