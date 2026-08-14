"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

type MobileNavProps = {
  links: { href: string; label: string }[];
  activePath: string;
};

export function MobileNav({ links, activePath }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex h-10 w-10 items-center justify-center rounded-full text-brand"
        aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
        aria-expanded={open}
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
      {open ? (
        <div className="absolute inset-x-0 top-full z-50 border-b border-pink-100 bg-white px-3 py-3 shadow-lg sm:px-4">
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-3 py-3 text-base font-semibold ${
                  activePath === link.href
                    ? "bg-cream text-brand"
                    : "text-zinc-700"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </div>
  );
}
