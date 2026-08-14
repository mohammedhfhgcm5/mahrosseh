import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OrderoApp } from "@/components/ordero/OrderoApp";
import { getFullMenu, getLocationById, getSettings } from "@/lib/queries";

export const revalidate = 60;

type PageProps = {
  params: Promise<{ locationId: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locationId } = await params;
  const location = await getLocationById(locationId);
  return {
    title: location ? `اوردر — ${location.name}` : "اوردر",
    robots: { index: false, follow: false },
  };
}

export default async function OrderoPage({ params }: PageProps) {
  const { locationId } = await params;
  const [location, settings, categories] = await Promise.all([
    getLocationById(locationId),
    getSettings(),
    getFullMenu(),
  ]);

  if (!location) notFound();

  return (
    <OrderoApp
      location={{
        id: location.id,
        name: location.name,
        phone: location.phone,
        isOpen: location.isOpen,
      }}
      settings={settings}
      categories={categories}
    />
  );
}
