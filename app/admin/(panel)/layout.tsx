import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { getAdminSession } from "@/lib/auth";

export default async function AdminPanelLayout({
  children,
}: {
  children: ReactNode;
}) {
  if (!(await getAdminSession())) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#F6F4F5] lg:flex-row">
      <AdminSidebar />
      <div className="min-w-0 flex-1 p-6 md:p-8">{children}</div>
    </div>
  );
}
