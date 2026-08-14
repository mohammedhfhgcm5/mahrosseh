"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Pencil, Trash2, X } from "lucide-react";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { readApiJson } from "@/lib/client";
import type { Category } from "@prisma/client";
import type { ProductWithCategory } from "@/lib/types";

const PAGE_LABEL: Record<string, string> = {
  GELATO: "جيلاتو",
  BEVERAGES: "المشروبات",
  SPECIALS: "العروض",
};

const emptyProduct = {
  name: "",
  description: "",
  price: "",
  imageUrl: "",
  categoryId: "",
  isAvailable: true,
  isSpecial: false,
  sortOrder: "0",
};

export function MenuManager({
  initialCategories,
  initialProducts,
}: {
  initialCategories: Category[];
  initialProducts: ProductWithCategory[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState(initialCategories);
  const [products, setProducts] = useState(initialProducts);
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [manualOpen, setManualOpen] = useState(false);
  const [form, setForm] = useState(emptyProduct);
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    slug: "",
    icon: "cone",
    page: "GELATO",
    sortOrder: "0",
  });
  const [prevQuery, setPrevQuery] = useState(searchParams.toString());

  if (searchParams.toString() !== prevQuery) {
    setPrevQuery(searchParams.toString());
    if (searchParams.get("new") === "1") {
      setEditingId(null);
      setForm(emptyProduct);
      setManualOpen(true);
    }
  }

  const showForm = searchParams.get("new") === "1" || manualOpen || Boolean(editingId);

  async function load() {
    const [cats, items] = await Promise.all([
      fetch("/api/categories").then((res) => res.json()),
      fetch("/api/products").then((res) => res.json()),
    ]);
    if (Array.isArray(cats)) setCategories(cats);
    if (Array.isArray(items)) setProducts(items);
  }

  const grouped = useMemo(() => {
    return categories.map((category) => ({
      category,
      products: products.filter((product) => product.categoryId === category.id),
    }));
  }, [categories, products]);

  async function saveProduct(event: React.FormEvent) {
    event.preventDefault();
    setMessage("");
    const payload = {
      ...form,
      price: Number(form.price),
      sortOrder: Number(form.sortOrder),
    };
    const url = editingId ? `/api/products/${editingId}` : "/api/products";
    const response = await fetch(url, {
      method: editingId ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await readApiJson(response);
    if (!response.ok) {
      setMessage(data.error || "تعذر حفظ الصنف");
      return;
    }
    setManualOpen(false);
    setEditingId(null);
    setForm(emptyProduct);
    setMessage("تم حفظ الصنف");
    router.replace("/admin/menu");
    await load();
  }

  async function saveCategory(event: React.FormEvent) {
    event.preventDefault();
    setMessage("");
    const response = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...categoryForm,
        sortOrder: Number(categoryForm.sortOrder),
      }),
    });
    const data = await readApiJson(response);
    if (!response.ok) {
      setMessage(data.error || "تعذر حفظ التصنيف");
      return;
    }
    setCategoryForm({ name: "", slug: "", icon: "cone", page: "GELATO", sortOrder: "0" });
    setMessage("تم إضافة التصنيف");
    await load();
  }

  function editProduct(product: ProductWithCategory) {
    setEditingId(product.id);
    setManualOpen(true);
    setForm({
      name: product.name,
      description: product.description,
      price: String(product.price),
      imageUrl: product.imageUrl,
      categoryId: product.categoryId,
      isAvailable: product.isAvailable,
      isSpecial: product.isSpecial,
      sortOrder: String(product.sortOrder),
    });
  }

  async function deleteProduct(id: string) {
    if (!confirm("حذف هذا الصنف؟")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    await load();
  }

  async function deleteCategory(id: string) {
    if (!confirm("حذف التصنيف وكل أصنافه؟")) return;
    await fetch(`/api/categories/${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <div className="space-y-6">
      {message ? (
        <p className="rounded-2xl bg-lime-soft px-4 py-3 text-sm font-semibold text-zinc-800">
          {message}
        </p>
      ) : null}

      <section className="rounded-3xl bg-white p-6 shadow-sm">
        <h2 className="text-lg font-extrabold text-zinc-900">التصنيفات</h2>
        <form onSubmit={saveCategory} className="mt-4 grid gap-3 md:grid-cols-5">
          <input
            value={categoryForm.name}
            onChange={(event) => setCategoryForm({ ...categoryForm, name: event.target.value })}
            placeholder="اسم التصنيف"
            className="rounded-xl border border-pink-100 px-3 py-2 text-sm"
            required
          />
          <input
            value={categoryForm.slug}
            onChange={(event) => setCategoryForm({ ...categoryForm, slug: event.target.value })}
            placeholder="slug (اختياري)"
            className="rounded-xl border border-pink-100 px-3 py-2 text-sm"
          />
          <select
            value={categoryForm.page}
            onChange={(event) => setCategoryForm({ ...categoryForm, page: event.target.value })}
            className="rounded-xl border border-pink-100 px-3 py-2 text-sm"
          >
            <option value="GELATO">جيلاتو</option>
            <option value="BEVERAGES">المشروبات</option>
            <option value="SPECIALS">العروض</option>
          </select>
          <select
            value={categoryForm.icon}
            onChange={(event) => setCategoryForm({ ...categoryForm, icon: event.target.value })}
            className="rounded-xl border border-pink-100 px-3 py-2 text-sm"
          >
            <option value="cone">آيس كريم</option>
            <option value="snowflake">ثلج</option>
            <option value="cup">كوب</option>
            <option value="offer">عرض</option>
          </select>
          <button type="submit" className="rounded-full bg-brand px-4 py-2 text-sm font-bold text-white">
            إضافة تصنيف
          </button>
        </form>
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((category) => (
            <span
              key={category.id}
              className="inline-flex items-center gap-2 rounded-full bg-cream px-3 py-1 text-sm"
            >
              {category.name}
              <span className="text-xs text-zinc-400">{PAGE_LABEL[category.page]}</span>
              <button type="button" onClick={() => deleteCategory(category.id)} aria-label="حذف">
                <X className="h-3.5 w-3.5 text-zinc-400" />
              </button>
            </span>
          ))}
        </div>
      </section>

      {showForm ? (
        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-zinc-900">
              {editingId ? "تعديل صنف" : "إضافة صنف جديد"}
            </h2>
            <button
              type="button"
              onClick={() => {
                setManualOpen(false);
                setEditingId(null);
                router.replace("/admin/menu");
              }}
              className="text-sm text-zinc-500"
            >
              إلغاء
            </button>
          </div>
          <form onSubmit={saveProduct} className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="text-sm font-semibold">
              الاسم
              <input
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                className="mt-2 w-full rounded-xl border border-pink-100 px-3 py-2"
                required
              />
            </label>
            <label className="text-sm font-semibold">
              السعر
              <input
                type="number"
                step="0.01"
                value={form.price}
                onChange={(event) => setForm({ ...form, price: event.target.value })}
                className="mt-2 w-full rounded-xl border border-pink-100 px-3 py-2"
                required
              />
            </label>
            <label className="md:col-span-2 text-sm font-semibold">
              الوصف
              <textarea
                value={form.description}
                onChange={(event) => setForm({ ...form, description: event.target.value })}
                className="mt-2 w-full rounded-xl border border-pink-100 px-3 py-2"
                rows={3}
                required
              />
            </label>
            <label className="text-sm font-semibold">
              التصنيف
              <select
                value={form.categoryId}
                onChange={(event) => setForm({ ...form, categoryId: event.target.value })}
                className="mt-2 w-full rounded-xl border border-pink-100 px-3 py-2"
                required
              >
                <option value="">اختر تصنيفاً</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm font-semibold">
              الترتيب
              <input
                type="number"
                value={form.sortOrder}
                onChange={(event) => setForm({ ...form, sortOrder: event.target.value })}
                className="mt-2 w-full rounded-xl border border-pink-100 px-3 py-2"
              />
            </label>
            <label className="flex items-center gap-2 text-sm font-semibold">
              <input
                type="checkbox"
                checked={form.isAvailable}
                onChange={(event) => setForm({ ...form, isAvailable: event.target.checked })}
                className="accent-brand"
              />
              متوفر
            </label>
            <label className="flex items-center gap-2 text-sm font-semibold">
              <input
                type="checkbox"
                checked={form.isSpecial}
                onChange={(event) => setForm({ ...form, isSpecial: event.target.checked })}
                className="accent-brand"
              />
              عرض خاص
            </label>
            <div className="md:col-span-2">
              <ImageUpload
                value={form.imageUrl}
                onChange={(url) => setForm({ ...form, imageUrl: url })}
              />
            </div>
            <div className="md:col-span-2 flex gap-3">
              <button type="submit" className="rounded-full bg-brand px-6 py-2 text-sm font-bold text-white">
                حفظ الصنف
              </button>
            </div>
          </form>
        </section>
      ) : (
        <button
          type="button"
          onClick={() => {
            setForm(emptyProduct);
            setEditingId(null);
            setManualOpen(true);
          }}
          className="rounded-full bg-brand px-6 py-3 text-sm font-bold text-white"
        >
          إضافة صنف جديد
        </button>
      )}

      {grouped.map(({ category, products: items }) => (
        <section key={category.id} className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-extrabold text-brand">{category.name}</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[640px] text-right text-sm">
              <thead className="text-zinc-500">
                <tr>
                  <th className="pb-3 font-semibold">الصنف</th>
                  <th className="pb-3 font-semibold">السعر</th>
                  <th className="pb-3 font-semibold">الحالة</th>
                  <th className="pb-3 font-semibold">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {items.map((product) => (
                  <tr key={product.id} className="border-t border-pink-50">
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <span className="relative h-12 w-12 overflow-hidden rounded-xl bg-cream">
                          <Image src={product.imageUrl} alt={product.name} fill className="object-cover" unoptimized />
                        </span>
                        <div>
                          <p className="font-bold">{product.name}</p>
                          <p className="line-clamp-1 text-xs text-zinc-500">{product.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 font-bold">{product.price}</td>
                    <td className="py-3">
                      {product.isSpecial ? (
                        <span className="ml-2 rounded-full bg-cream px-2 py-0.5 text-xs text-brand">عرض</span>
                      ) : null}
                      {product.isAvailable ? "متوفر" : "غير متوفر"}
                    </td>
                    <td className="py-3">
                      <div className="flex gap-2">
                        <button type="button" onClick={() => editProduct(product)} className="text-brand">
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button type="button" onClick={() => deleteProduct(product.id)} className="text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {items.length === 0 ? (
              <p className="py-6 text-sm text-zinc-400">لا توجد أصناف في هذا التصنيف.</p>
            ) : null}
          </div>
        </section>
      ))}
    </div>
  );
}
