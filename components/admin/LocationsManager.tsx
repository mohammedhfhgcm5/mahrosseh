"use client";

import { useState } from "react";
import type { Location } from "@prisma/client";

const empty = {
  name: "",
  address: "",
  phone: "",
  mapUrl: "",
  isOpen: true,
};

export function LocationsManager({ initial }: { initial: Location[] }) {
  const [locations, setLocations] = useState(initial);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  async function load() {
    const data = await fetch("/api/locations").then((res) => res.json());
    setLocations(data);
  }

  async function save(event: React.FormEvent) {
    event.preventDefault();
    const url = editingId ? `/api/locations/${editingId}` : "/api/locations";
    const response = await fetch(url, {
      method: editingId ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    if (!response.ok) {
      setMessage(data.error || "تعذر حفظ الفرع");
      return;
    }
    setForm(empty);
    setEditingId(null);
    setMessage("تم حفظ الفرع");
    await load();
  }

  async function remove(id: string) {
    if (!confirm("حذف هذا الفرع؟")) return;
    await fetch(`/api/locations/${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="text-lg font-extrabold">الفروع</h2>
      <form onSubmit={save} className="mt-4 grid gap-3 md:grid-cols-2">
        <input
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
          placeholder="اسم الفرع"
          className="rounded-xl border border-pink-100 px-3 py-2 text-sm"
          required
        />
        <input
          value={form.phone}
          onChange={(event) => setForm({ ...form, phone: event.target.value })}
          placeholder="الهاتف"
          className="rounded-xl border border-pink-100 px-3 py-2 text-sm"
        />
        <input
          value={form.address}
          onChange={(event) => setForm({ ...form, address: event.target.value })}
          placeholder="العنوان"
          className="md:col-span-2 rounded-xl border border-pink-100 px-3 py-2 text-sm"
          required
        />
        <input
          value={form.mapUrl}
          onChange={(event) => setForm({ ...form, mapUrl: event.target.value })}
          placeholder="رابط الخريطة"
          className="md:col-span-2 rounded-xl border border-pink-100 px-3 py-2 text-sm"
        />
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.isOpen}
            onChange={(event) => setForm({ ...form, isOpen: event.target.checked })}
            className="accent-brand"
          />
          مفتوح
        </label>
        <button type="submit" className="rounded-full bg-brand px-4 py-2 text-sm font-bold text-white">
          {editingId ? "تحديث الفرع" : "إضافة فرع"}
        </button>
      </form>
      {message ? <p className="mt-3 text-sm text-brand">{message}</p> : null}
      <div className="mt-5 space-y-3">
        {locations.map((location) => (
          <div
            key={location.id}
            className="flex items-center justify-between rounded-2xl bg-page px-4 py-3"
          >
            <div>
              <p className="font-bold">{location.name}</p>
              <p className="text-sm text-zinc-500">{location.address}</p>
            </div>
            <div className="flex gap-3 text-sm">
              <button
                type="button"
                className="text-brand"
                onClick={() => {
                  setEditingId(location.id);
                  setForm({
                    name: location.name,
                    address: location.address,
                    phone: location.phone ?? "",
                    mapUrl: location.mapUrl ?? "",
                    isOpen: location.isOpen,
                  });
                }}
              >
                تعديل
              </button>
              <button type="button" className="text-red-500" onClick={() => remove(location.id)}>
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
