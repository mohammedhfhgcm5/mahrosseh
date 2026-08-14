import { AdminHeader } from "@/components/admin/AdminHeader";
import { LocationsManager } from "@/components/admin/LocationsManager";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { getLocations, getSettings } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Settings",
  robots: { index: false, follow: false },
};

export default async function AdminSettingsPage() {
  const [settings, locations] = await Promise.all([getSettings(), getLocations()]);

  return (
    <>
      <AdminHeader
        title="الإعدادات"
        subtitle="إدارة معلومات المتجر وساعات العمل وتفضيلات النظام"
      />
      <SettingsForm initial={settings} />
      <LocationsManager initial={locations} />
    </>
  );
}
