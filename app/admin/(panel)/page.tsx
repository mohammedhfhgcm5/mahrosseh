import { IceCream2, MapPin, Store, Tags } from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { getDashboardStats } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  const cards = [
    { label: "الأصناف", value: stats.products, icon: IceCream2 },
    { label: "التصنيفات", value: stats.categories, icon: Tags },
    { label: "الفروع", value: stats.locations, icon: MapPin },
    {
      label: "حالة المتجر",
      value: stats.settings.isOpen ? "مفتوح" : "مغلق",
      icon: Store,
    },
  ];

  return (
    <>
      <AdminHeader
        title="لوحة القيادة"
        subtitle="نظرة سريعة على المنيو وحالة المتجر"
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <article key={card.label} className="rounded-3xl bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm text-zinc-500">{card.label}</p>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cream text-brand">
                  <Icon className="h-5 w-5" />
                </span>
              </div>
              <p className="mt-4 text-3xl font-extrabold text-zinc-900">{card.value}</p>
            </article>
          );
        })}
      </div>
    </>
  );
}
