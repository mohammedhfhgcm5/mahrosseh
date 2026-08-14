import Image from "next/image";
import Link from "next/link";
import type { Location } from "@prisma/client";
import type { SerializedSettings } from "@/lib/types";
import { whatsappLink } from "@/lib/social";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
      <path d="M20.5 3.5A11.9 11.9 0 0 0 12.05 0C5.45 0 .1 5.35.1 11.94c0 2.1.55 4.16 1.6 5.97L0 24l6.25-1.64a12 12 0 0 0 5.8 1.47h.01c6.6 0 11.95-5.35 11.95-11.94 0-3.19-1.24-6.19-3.5-8.39ZM12.06 21.8h-.01a9.86 9.86 0 0 1-5.02-1.37l-.36-.21-3.71.97.99-3.61-.23-.37a9.8 9.8 0 0 1-1.5-5.24c0-5.42 4.42-9.83 9.86-9.83 2.63 0 5.1 1.03 6.96 2.89a9.76 9.76 0 0 1 2.88 6.95c0 5.42-4.42 9.82-9.86 9.82Zm5.4-7.36c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47a8.9 8.9 0 0 1-1.65-2.05c-.17-.3-.02-.46.13-.6.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm11.25 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
      <path d="M14 9h4V5h-4c-2.76 0-5 2.24-5 5v2H6v4h3v8h4v-8h3.2L17 12h-4V10c0-.55.45-1 1-1Z" />
    </svg>
  );
}

const iconClass =
  "flex h-11 w-11 items-center justify-center rounded-full text-white transition hover:opacity-90";

type FooterProps = {
  settings: SerializedSettings;
  locations: Location[];
};

export function Footer({ settings, locations }: FooterProps) {
  const whatsappItems = settings.showWhatsapp
    ? settings.whatsappNumbers.filter((item) => whatsappLink(item.phone))
    : [];
  const branches = locations.length > 0 ? locations : [];

  return (
    <footer className="mt-10 border-t border-pink-100 bg-white sm:mt-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 sm:py-10">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:justify-between">
          <Link href="/" className="shrink-0">
            <Image
              src="/logo.png"
              alt="Fragola Gelato"
              width={140}
              height={56}
              className="h-12 w-auto sm:h-14"
            />
          </Link>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {whatsappItems.map((item) => (
              <a
                key={item.id}
                href={whatsappLink(item.phone)}
                target="_blank"
                rel="noopener noreferrer"
                className={`${iconClass} bg-[#25D366]`}
                aria-label={item.label || "واتساب"}
                title={item.label || item.phone}
              >
                <WhatsAppIcon />
              </a>
            ))}
            {settings.showInstagram && settings.instagramUrl ? (
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${iconClass} bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af]`}
                aria-label="إنستغرام"
              >
                <InstagramIcon />
              </a>
            ) : null}
            {settings.showFacebook && settings.facebookUrl ? (
              <a
                href={settings.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${iconClass} bg-[#1877F2]`}
                aria-label="فيسبوك"
              >
                <FacebookIcon />
              </a>
            ) : null}
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-sm font-extrabold text-zinc-900">فروعنا</h2>
            <Link href="/locations" className="text-sm font-bold text-brand hover:underline">
              كل الفروع
            </Link>
          </div>
          {branches.length === 0 ? (
            <p className="text-sm text-zinc-500">سيتم إضافة الفروع قريباً.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {branches.map((branch) => (
                <article key={branch.id} className="rounded-2xl bg-page px-4 py-3 text-sm text-zinc-600">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-bold text-zinc-800">{branch.name}</p>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-bold ${
                        branch.isOpen ? "bg-lime-soft text-green-800" : "bg-zinc-100 text-zinc-500"
                      }`}
                    >
                      {branch.isOpen ? "مفتوح" : "مغلق"}
                    </span>
                  </div>
                  <p className="mt-1">{branch.address}</p>
                  {branch.phone ? (
                    <a href={`tel:${branch.phone}`} className="mt-1 inline-block dir-ltr" dir="ltr">
                      {branch.phone}
                    </a>
                  ) : null}
                  {branch.mapUrl ? (
                    <a
                      href={branch.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block text-xs font-bold text-brand"
                    >
                      عرض على الخريطة
                    </a>
                  ) : null}
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
