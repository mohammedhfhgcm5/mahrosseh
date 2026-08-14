import type { Metadata } from "next";
import { JsonLd } from "@/components/site/JsonLd";
import { MenuView } from "@/components/site/MenuView";
import { PAGE_COPY } from "@/lib/constants";
import { getMenuByPage, getSettings } from "@/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: {
    absolute: "Fragola Gelato",
  },
  description: PAGE_COPY.GELATO.seoDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: PAGE_COPY.GELATO.title,
    description: PAGE_COPY.GELATO.seoDescription,
  },
};

export default async function HomePage() {
  const [settings, categories] = await Promise.all([
    getSettings(),
    getMenuByPage("GELATO"),
  ]);

  return (
    <>
      <JsonLd settings={settings} categories={categories} />
      <MenuView
        title={settings.heroTitle || PAGE_COPY.GELATO.title}
        description={settings.heroText || PAGE_COPY.GELATO.description}
        heroImage={settings.heroImage}
        categories={categories}
        settings={settings}
        emptyMessage="سيتم إضافة نكهات الجيلاتو قريباً."
      />
    </>
  );
}
