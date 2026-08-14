"use client";

import { Bell } from "lucide-react";

export function AdminHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-6 flex items-start justify-between gap-4">
      <div>
        <h1 className="text-3xl font-extrabold text-zinc-900">{title}</h1>
        <p className="mt-1 text-sm text-zinc-500">{subtitle}</p>
      </div>
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-zinc-500 shadow-sm">
          <Bell className="h-4 w-4" />
        </span>
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
          أد
        </span>
      </div>
    </div>
  );
}
