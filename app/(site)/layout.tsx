import type { ReactNode } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { getLocations, getSettings } from "@/lib/queries";

export default async function SiteLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [settings, locations] = await Promise.all([getSettings(), getLocations()]);

  return (
    <>
      <Navbar isOpen={settings.isOpen} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} locations={locations} />
    </>
  );
}
