"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, User } from "lucide-react";
import { MobileNav } from "@/components/site/MobileNav";

const links = [
  { href: "/", label: "جيلاتو" },
  { href: "/beverages", label: "المشروبات" },
  { href: "/specials", label: "العروض" },
  { href: "/locations", label: "الفروع" },
];

export function Navbar({ isOpen }: { isOpen: boolean }) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-pink-100 bg-white/95 backdrop-blur">
      {!isOpen ? (
        <p className="bg-brand px-4 py-1.5 text-center text-sm text-white">
          المتجر مغلق حالياً — يمكنك تصفّح المنيو والعودة لاحقاً
        </p>
      ) : null}
      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="shrink-0">
          <Image
            src="/logo.png"
            alt="Fragola Gelato"
            width={150}
            height={58}
            className="h-12 w-auto sm:h-14"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative pb-1 text-sm font-semibold transition ${
                  active ? "text-brand" : "text-zinc-700 hover:text-brand"
                }`}
              >
                {link.label}
                {active ? (
                  <span className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-brand" />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden h-10 w-10 items-center justify-center rounded-full text-zinc-600 sm:flex">
            <User className="h-5 w-5" />
          </span>
          <span className="hidden h-10 w-10 items-center justify-center rounded-full text-zinc-600 sm:flex">
            <ShoppingBag className="h-5 w-5" />
          </span>
          <MobileNav links={links} activePath={pathname} />
        </div>
      </div>
    </header>
  );
}
