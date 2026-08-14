import type { Metadata } from "next";
import { MapPin, Phone } from "lucide-react";
import { getLocations, getSettings } from "@/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "الفروع",
  description: "اعثر على أقرب فرع لفراجولا جيلاتو وتواصل معنا.",
  alternates: { canonical: "/locations" },
};

export default async function LocationsPage() {
  const [settings, locations] = await Promise.all([getSettings(), getLocations()]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-extrabold text-brand">فروعنا</h1>
      <p className="mt-2 max-w-2xl text-zinc-600">
        زورونا في أحد فروع {settings.storeName} واستمتعوا بالجيلاتو الطازج.
      </p>
      {locations.length === 0 ? (
        <p className="mt-10 rounded-3xl bg-white p-10 text-center text-zinc-500">
          سيتم إضافة الفروع قريباً.
        </p>
      ) : (
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {locations.map((location) => (
            <article
              key={location.id}
              className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-pink-50"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-lg font-bold text-zinc-900">{location.name}</h2>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    location.isOpen
                      ? "bg-lime-soft text-green-800"
                      : "bg-zinc-100 text-zinc-500"
                  }`}
                >
                  {location.isOpen ? "مفتوح" : "مغلق"}
                </span>
              </div>
              <p className="mt-3 flex items-start gap-2 text-sm text-zinc-600">
                <MapPin className="mt-0.5 h-4 w-4 text-brand" />
                {location.address}
              </p>
              {location.phone ? (
                <p className="mt-2 flex items-center gap-2 text-sm text-zinc-600">
                  <Phone className="h-4 w-4 text-brand" />
                  {location.phone}
                </p>
              ) : null}
              {location.mapUrl ? (
                <a
                  href={location.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex text-sm font-bold text-brand hover:underline"
                >
                  عرض على الخريطة
                </a>
              ) : null}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
