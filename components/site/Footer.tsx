import Image from "next/image";
import Link from "next/link";
import type { SerializedSettings } from "@/lib/types";

export function Footer({ settings }: { settings: SerializedSettings }) {
  return (
    <footer className="mt-12 border-t border-pink-100 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Fragola Gelato" width={120} height={48} className="h-12 w-auto" />
        </div>
        <div className="text-sm text-zinc-600">
          <p className="font-semibold text-zinc-800">{settings.storeName}</p>
          <p>{settings.address}</p>
          <p>{settings.phone}</p>
        </div>
        <nav className="flex flex-wrap gap-4 text-sm font-semibold text-brand">
          <Link href="/">جيلاتو</Link>
          <Link href="/beverages">المشروبات</Link>
          <Link href="/specials">العروض</Link>
          <Link href="/locations">الفروع</Link>
        </nav>
      </div>
    </footer>
  );
}
