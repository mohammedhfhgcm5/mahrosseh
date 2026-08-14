import type { ReactNode } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { OrderoCheckout } from "@/components/ordero/OrderoCheckout";
import { OrderoProvider } from "@/components/ordero/OrderoProvider";
import { getLocations, getSettings } from "@/lib/queries";

export default async function SiteLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [settings, locations] = await Promise.all([getSettings(), getLocations()]);
  const branches = locations.map((location) => ({
    id: location.id,
    name: location.name,
    phone: location.phone,
    isOpen: location.isOpen,
  }));

  return (
    <OrderoProvider settings={settings} locations={branches}>
      <Navbar isOpen={settings.isOpen} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} locations={locations} />
      <OrderoCheckout />
    </OrderoProvider>
  );
}
