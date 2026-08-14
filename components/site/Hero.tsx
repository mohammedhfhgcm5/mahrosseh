import Image from "next/image";
import Link from "next/link";

type HeroProps = {
  title: string;
  description: string;
  imageUrl: string;
  ctaHref?: string;
};

export function Hero({ title, description, imageUrl, ctaHref = "#menu" }: HeroProps) {
  return (
    <section className="mx-auto w-full max-w-7xl px-3 pt-4 sm:px-4 sm:pt-6">
      <div className="flex flex-col-reverse items-center gap-5 rounded-3xl bg-hero p-4 sm:gap-8 sm:p-6 md:grid md:grid-cols-2 md:rounded-[2rem] md:p-10">
        <div className="w-full min-w-0 text-center md:text-start">
          <h1 className="text-2xl font-extrabold leading-snug break-words text-brand sm:text-3xl md:text-5xl md:leading-tight">
            {title}
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-zinc-600 sm:mt-4 sm:text-base md:mx-0 md:text-lg">
            {description}
          </p>
          <Link
            href={ctaHref}
            className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-brand px-8 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-brand-dark sm:mt-6 sm:w-auto"
          >
            اطلب الآن
          </Link>
        </div>
        <div className="relative mx-auto w-full max-w-[220px] sm:max-w-xs md:max-w-md">
          <div className="overflow-hidden rounded-3xl border-4 border-white shadow-xl sm:rounded-[2rem] sm:border-8">
            <Image
              src={imageUrl}
              alt={title}
              width={720}
              height={720}
              className="aspect-square w-full object-cover"
              sizes="(max-width: 768px) 220px, 50vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
