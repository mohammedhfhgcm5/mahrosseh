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
    <section className="mx-auto max-w-7xl px-4 pt-6">
      <div className="grid items-center gap-8 rounded-[2rem] bg-hero p-6 md:grid-cols-2 md:p-10">
        <div>
          <h1 className="text-3xl font-extrabold leading-tight text-brand md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-md text-base leading-7 text-zinc-600 md:text-lg">
            {description}
          </p>
          <Link
            href={ctaHref}
            className="mt-6 inline-flex rounded-full bg-brand px-8 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-brand-dark"
          >
            اطلب الآن
          </Link>
        </div>
        <div className="relative mx-auto w-full max-w-md">
          <div className="overflow-hidden rounded-[2rem] border-8 border-white shadow-xl">
            <Image
              src={imageUrl}
              alt={title}
              width={720}
              height={720}
              className="aspect-square w-full object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
