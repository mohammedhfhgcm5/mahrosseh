import { Suspense } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { MenuManager } from "@/components/admin/MenuManager";
import { getAdminMenuData } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "إدارة المنيو",
  robots: { index: false, follow: false },
};

export default async function AdminMenuPage() {
  const { categories, products } = await getAdminMenuData();

  return (
    <>
      <AdminHeader
        title="إدارة المنيو"
        subtitle="أضف وعدّل التصنيفات والأصناف والأسعار والصور"
      />
      <Suspense fallback={<p className="text-sm text-zinc-500">جاري التحميل...</p>}>
        <MenuManager initialCategories={categories} initialProducts={products} />
      </Suspense>
    </>
  );
}
