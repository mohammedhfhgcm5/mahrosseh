"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  IceCream2,
  LayoutDashboard,
  LogOut,
  Plus,
  Settings,
} from "lucide-react";

const items = [
  { href: "/admin", label: "لوحة القيادة", icon: LayoutDashboard },
  { href: "/admin/menu", label: "إدارة المنيو", icon: IceCream2 },
  { href: "/admin/settings", label: "الإعدادات", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="flex w-full shrink-0 flex-col bg-white px-5 py-6 shadow-sm lg:w-72">
      <div className="flex flex-col items-center text-center">
        <Image
          src="/logo.png"
          alt="Fragola Admin"
          width={88}
          height={88}
          className="h-20 w-20 rounded-full object-contain ring-4 ring-cream"
        />
        <p className="mt-3 text-lg font-extrabold text-zinc-900">Fragola Admin</p>
        <p className="text-xs text-zinc-500">Premium Gelateria</p>
      </div>

      <nav className="mt-8 flex flex-1 flex-col gap-1">
        {items.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                active
                  ? "bg-lime-soft text-zinc-900"
                  : "text-zinc-600 hover:bg-cream"
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <Link
        href="/admin/menu?new=1"
        className="mt-4 flex items-center justify-center gap-2 rounded-full bg-brand px-4 py-3 text-sm font-bold text-white hover:bg-brand-dark"
      >
        <Plus className="h-4 w-4" />
        إضافة صنف جديد
      </Link>

      <button
        type="button"
        onClick={logout}
        className="mt-4 flex items-center gap-2 px-2 py-2 text-sm text-zinc-500 hover:text-brand"
      >
        <LogOut className="h-4 w-4" />
        تسجيل الخروج
      </button>
    </aside>
  );
}
