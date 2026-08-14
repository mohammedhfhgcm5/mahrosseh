"use client";

import { useState } from "react";
import { ImageUpload } from "@/components/admin/ImageUpload";
import type { SerializedSettings } from "@/lib/types";
import { whatsappLink } from "@/lib/social";

export function SettingsForm({ initial }: { initial: SerializedSettings }) {
  const [form, setForm] = useState({
    ...initial,
    orderoPhone: initial.orderoPhone ?? "",
    whatsappNumbers: initial.whatsappNumbers ?? [],
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function save(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    const response = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    setLoading(false);
    if (!response.ok) {
      setMessage(data.error || "تعذر الحفظ");
      return;
    }
    setForm(data);
    setMessage("تم حفظ التغييرات");
  }

  async function saveFinance() {
    setLoading(true);
    const response = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    setLoading(false);
    if (response.ok) {
      setForm(data);
      setMessage("تم تحديث الإعدادات المالية");
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
      <form onSubmit={save} className="rounded-3xl bg-white p-6 shadow-sm">
        <h2 className="text-lg font-extrabold">ملف المتجر</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <label className="text-sm font-semibold">
            اسم المتجر
            <input
              value={form.storeName}
              onChange={(event) => setForm({ ...form, storeName: event.target.value })}
              className="mt-2 w-full rounded-xl border border-pink-100 px-3 py-2"
            />
          </label>
          <label className="text-sm font-semibold">
            رقم الهاتف
            <input
              value={form.phone}
              onChange={(event) => setForm({ ...form, phone: event.target.value })}
              className="mt-2 w-full rounded-xl border border-pink-100 px-3 py-2"
            />
          </label>
          <label className="md:col-span-2 text-sm font-semibold">
            العنوان
            <input
              value={form.address}
              onChange={(event) => setForm({ ...form, address: event.target.value })}
              className="mt-2 w-full rounded-xl border border-pink-100 px-3 py-2"
            />
          </label>
          <label className="md:col-span-2 text-sm font-semibold">
            وصف المتجر
            <textarea
              value={form.description}
              onChange={(event) => setForm({ ...form, description: event.target.value })}
              rows={4}
              className="mt-2 w-full rounded-xl border border-pink-100 px-3 py-2"
            />
          </label>
          <label className="md:col-span-2 text-sm font-semibold">
            رقم واتساب استلام الطلبات
            <input
              value={form.orderoPhone}
              onChange={(event) => setForm({ ...form, orderoPhone: event.target.value })}
              placeholder="9639xxxxxxxx"
              dir="ltr"
              className="mt-2 w-full rounded-xl border border-pink-100 px-3 py-2"
            />
            <span className="mt-1 block text-xs font-normal text-zinc-500">
              الزبون يرسل الطلب من واتسابه إلى هذا الرقم.
            </span>
          </label>
          <label className="md:col-span-2 text-sm font-semibold">
            عنوان الهيرو
            <input
              value={form.heroTitle}
              onChange={(event) => setForm({ ...form, heroTitle: event.target.value })}
              className="mt-2 w-full rounded-xl border border-pink-100 px-3 py-2"
            />
          </label>
          <label className="md:col-span-2 text-sm font-semibold">
            نص الهيرو
            <textarea
              value={form.heroText}
              onChange={(event) => setForm({ ...form, heroText: event.target.value })}
              rows={3}
              className="mt-2 w-full rounded-xl border border-pink-100 px-3 py-2"
            />
          </label>
          <div className="md:col-span-2">
            <ImageUpload
              label="صورة الهيرو"
              value={form.heroImage}
              onChange={(url) => setForm({ ...form, heroImage: url })}
            />
          </div>
        </div>

        <div className="mt-8 border-t border-pink-100 pt-6">
          <h3 className="text-lg font-extrabold">روابط التواصل في الفوتر</h3>
          <p className="mt-1 text-sm text-zinc-500">
            فعّل الأيقونة وأضف الرابط. أرقام واتساب تُفتح مباشرة في التطبيق.
          </p>

          <div className="mt-5 space-y-4">
            <label className="flex items-center justify-between rounded-2xl bg-page px-4 py-3 text-sm font-semibold">
              إظهار إنستغرام
              <input
                type="checkbox"
                checked={form.showInstagram}
                onChange={(event) => setForm({ ...form, showInstagram: event.target.checked })}
                className="accent-brand"
              />
            </label>
            <label className="block text-sm font-semibold">
              رابط إنستغرام
              <input
                value={form.instagramUrl}
                onChange={(event) => setForm({ ...form, instagramUrl: event.target.value })}
                placeholder="https://instagram.com/fragola"
                className="mt-2 w-full rounded-xl border border-pink-100 px-3 py-2"
                disabled={!form.showInstagram}
              />
            </label>

            <label className="flex items-center justify-between rounded-2xl bg-page px-4 py-3 text-sm font-semibold">
              إظهار فيسبوك
              <input
                type="checkbox"
                checked={form.showFacebook}
                onChange={(event) => setForm({ ...form, showFacebook: event.target.checked })}
                className="accent-brand"
              />
            </label>
            <label className="block text-sm font-semibold">
              رابط فيسبوك
              <input
                value={form.facebookUrl}
                onChange={(event) => setForm({ ...form, facebookUrl: event.target.value })}
                placeholder="https://facebook.com/fragola"
                className="mt-2 w-full rounded-xl border border-pink-100 px-3 py-2"
                disabled={!form.showFacebook}
              />
            </label>

            <label className="flex items-center justify-between rounded-2xl bg-page px-4 py-3 text-sm font-semibold">
              إظهار واتساب
              <input
                type="checkbox"
                checked={form.showWhatsapp}
                onChange={(event) => setForm({ ...form, showWhatsapp: event.target.checked })}
                className="accent-brand"
              />
            </label>

            <div className="space-y-3">
              {form.whatsappNumbers.map((item, index) => (
                <div key={item.id} className="rounded-2xl border border-pink-100 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-bold">واتساب {index + 1}</p>
                    <button
                      type="button"
                      onClick={() =>
                        setForm({
                          ...form,
                          whatsappNumbers: form.whatsappNumbers.filter((row) => row.id !== item.id),
                        })
                      }
                      className="text-sm text-red-500"
                    >
                      حذف
                    </button>
                  </div>
                  <label className="block text-sm font-semibold">
                    الاسم (اختياري)
                    <input
                      value={item.label}
                      onChange={(event) => {
                        const whatsappNumbers = form.whatsappNumbers.map((row) =>
                          row.id === item.id ? { ...row, label: event.target.value } : row,
                        );
                        setForm({ ...form, whatsappNumbers });
                      }}
                      placeholder="الفرع الرئيسي"
                      className="mt-2 w-full rounded-xl border border-pink-100 px-3 py-2"
                    />
                  </label>
                  <label className="mt-3 block text-sm font-semibold">
                    رقم واتساب مع رمز الدولة
                    <input
                      value={item.phone}
                      onChange={(event) => {
                        const whatsappNumbers = form.whatsappNumbers.map((row) =>
                          row.id === item.id ? { ...row, phone: event.target.value } : row,
                        );
                        setForm({ ...form, whatsappNumbers });
                      }}
                      placeholder="9639xxxxxxxx"
                      className="mt-2 w-full rounded-xl border border-pink-100 px-3 py-2"
                      dir="ltr"
                    />
                  </label>
                  {whatsappLink(item.phone) ? (
                    <p className="mt-2 text-xs text-zinc-500" dir="ltr">
                      {whatsappLink(item.phone)}
                    </p>
                  ) : (
                    <p className="mt-2 text-xs text-zinc-400">سيُولَّد رابط واتساب تلقائياً بعد إدخال الرقم</p>
                  )}
                </div>
              ))}
              {form.whatsappNumbers.length < 3 ? (
                <button
                  type="button"
                  onClick={() =>
                    setForm({
                      ...form,
                      showWhatsapp: true,
                      whatsappNumbers: [
                        ...form.whatsappNumbers,
                        { id: crypto.randomUUID(), phone: "", label: "" },
                      ],
                    })
                  }
                  className="rounded-full border-2 border-brand px-4 py-2 text-sm font-bold text-brand"
                >
                  إضافة رقم واتساب
                </button>
              ) : (
                <p className="text-xs text-zinc-400">الحد الأقصى 3 أرقام واتساب</p>
              )}
            </div>
          </div>
        </div>
        {message ? <p className="mt-4 text-sm font-semibold text-brand">{message}</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 rounded-full bg-brand px-6 py-3 text-sm font-bold text-white disabled:opacity-60"
        >
          حفظ التغييرات
        </button>
      </form>

      <div className="space-y-6">
        <section className="rounded-3xl bg-lime-soft p-6">
          <h2 className="font-extrabold">حالة المتجر</h2>
          <p className="mt-2 text-sm text-zinc-600">
            {form.isOpen ? "مفتوح حالياً لاستقبال الزوار" : "مغلق حالياً"}
          </p>
          <button
            type="button"
            onClick={() => setForm({ ...form, isOpen: !form.isOpen })}
            className={`mt-4 h-8 w-14 rounded-full p-1 transition ${form.isOpen ? "bg-brand" : "bg-zinc-300"}`}
            aria-label="تبديل حالة المتجر"
            dir="ltr"
          >
            <span
              className={`block h-6 w-6 rounded-full bg-white transition ${form.isOpen ? "ms-auto" : "ms-0"}`}
            />
          </button>
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="font-extrabold">العملة والضرائب</h2>
          <label className="mt-4 block text-sm font-semibold">
            العملة الافتراضية
            <select
              value={form.currency}
              onChange={(event) => setForm({ ...form, currency: event.target.value })}
              className="mt-2 w-full rounded-xl border border-pink-100 px-3 py-2"
            >
              <option value="ل.س">ليرة سورية (ل.س)</option>
              <option value="ر.س">ريال سعودي (ر.س)</option>
              <option value="د.إ">درهم إماراتي (د.إ)</option>
            </select>
          </label>
          <label className="mt-4 flex items-center justify-between text-sm font-semibold">
            تطبيق الضريبة ({Math.round(form.taxRate * 100)}%)
            <input
              type="checkbox"
              checked={form.taxEnabled}
              onChange={(event) => setForm({ ...form, taxEnabled: event.target.checked })}
              className="accent-brand"
            />
          </label>
          <button
            type="button"
            onClick={() => void saveFinance()}
            className="mt-5 w-full rounded-full border-2 border-lime px-4 py-2 text-sm font-bold text-zinc-800"
          >
            تحديث الإعدادات المالية
          </button>
        </section>
      </div>
    </div>
  );
}
