import type { ReactNode } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { getSettings } from "@/lib/queries";

export default async function SiteLayout({
  children,
}: {
  children: ReactNode;
}) {
  const settings = await getSettings();

  return (
    <>
      <Navbar isOpen={settings.isOpen} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
    </>
  );
}
