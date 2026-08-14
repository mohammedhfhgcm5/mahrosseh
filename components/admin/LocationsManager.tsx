"use client";

import { useState } from "react";
import type { Location } from "@prisma/client";
import { orderoPath, qrImageUrl } from "@/lib/ordero";

const empty = {
  name: "",
  address: "",
  phone: "",
  mapUrl: "",
  isOpen: true,
};

export function LocationsManager({
  initial,
  siteUrl,
}: {
  initial: Location[];
  siteUrl: string;
}) {
  const [locations, setLocations] = useState(initial);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [qrLocation, setQrLocation] = useState<Location | null>(null);

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

  function orderUrl(id: string) {
    return `${siteUrl}${orderoPath(id)}`;
  }

  function printQr(location: Location) {
    const url = orderUrl(location.id);
    const qr = qrImageUrl(url, 480);
    const popup = window.open("", "_blank", "width=480,height=640");
    if (!popup) return;
    popup.document.write(`<!doctype html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="utf-8" />
    <title>اوردر — ${location.name}</title>
    <style>
      body { font-family: Cairo, Tahoma, sans-serif; text-align: center; padding: 32px; }
      img { width: 320px; height: 320px; }
      h1 { margin: 16px 0 8px; }
      p { color: #555; }
    </style>
  </head>
  <body>
    <h1>اوردر</h1>
    <p>${location.name}</p>
    <img src="${qr}" alt="QR" />
    <p>${url}</p>
    <script>window.onload = () => window.print();</script>
  </body>
</html>`);
    popup.document.close();
  }

  return (
    <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="text-lg font-extrabold">الفروع</h2>
      <p className="mt-1 text-sm text-zinc-500">
        رقم الهاتف يظهر للزبائن. طلبات اوردر تنرسل من واتساب الزبون إلى رقم استلام الطلبات في الإعدادات.
      </p>
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
          placeholder="رقم واتساب اوردر — 9639xxxxxxxx"
          dir="ltr"
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
            className="flex flex-col gap-3 rounded-2xl bg-page px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-bold">{location.name}</p>
              <p className="text-sm text-zinc-500">{location.address}</p>
              {location.phone ? (
                <p className="mt-1 text-xs text-zinc-500" dir="ltr">
                  واتساب: {location.phone}
                </p>
              ) : (
                <p className="mt-1 text-xs text-amber-600">بدون رقم واتساب — سيُستخدم رقم الإعدادات</p>
              )}
            </div>
            <div className="flex flex-wrap gap-3 text-sm">
              <button type="button" className="font-bold text-brand" onClick={() => setQrLocation(location)}>
                QR اوردر
              </button>
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

      {qrLocation ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setQrLocation(null)}
        >
          <div
            className="w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <h3 className="text-lg font-extrabold text-brand">اوردر</h3>
            <p className="mt-1 text-sm text-zinc-500">{qrLocation.name}</p>
            <img
              src={qrImageUrl(orderUrl(qrLocation.id))}
              alt={`QR ${qrLocation.name}`}
              className="mx-auto mt-4 h-56 w-56 rounded-2xl bg-white"
            />
            <p className="mt-3 break-all text-xs text-zinc-400" dir="ltr">
              {orderUrl(qrLocation.id)}
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => printQr(qrLocation)}
                className="rounded-full bg-brand px-4 py-2 text-sm font-bold text-white"
              >
                طباعة QR
              </button>
              <a
                href={orderUrl(qrLocation.id)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border-2 border-pink-100 px-4 py-2 text-sm font-bold text-zinc-700"
              >
                فتح صفحة اوردر
              </a>
              <button
                type="button"
                onClick={() => setQrLocation(null)}
                className="text-sm text-zinc-500"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
