import { getSiteUrl } from "@/lib/site";
import type { CategoryWithProducts, SerializedSettings } from "@/lib/types";

type JsonLdProps = {
  settings: SerializedSettings;
  categories: CategoryWithProducts[];
};

export function JsonLd({ settings, categories }: JsonLdProps) {
  const siteUrl = getSiteUrl();
  const menuItems = categories.flatMap((category) =>
    category.products.map((product) => ({
      "@type": "MenuItem",
      name: product.name,
      description: product.description,
      image: product.imageUrl,
      offers: {
        "@type": "Offer",
        price: product.price,
        priceCurrency: settings.currency === "ر.س" ? "SAR" : "AED",
      },
    })),
  );

  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: settings.storeName,
    description: settings.description,
    url: siteUrl,
    telephone: settings.phone,
    image: `${siteUrl}/logo.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address,
    },
    servesCuisine: ["Gelato", "Ice Cream", "Beverages"],
    hasMenu: {
      "@type": "Menu",
      hasMenuSection: categories.map((category) => ({
        "@type": "MenuSection",
        name: category.name,
        hasMenuItem: category.products.map((product) => ({
          "@type": "MenuItem",
          name: product.name,
          description: product.description,
          image: product.imageUrl,
          offers: {
            "@type": "Offer",
            price: product.price,
            priceCurrency: settings.currency === "ر.س" ? "SAR" : "AED",
          },
        })),
      })),
    },
    menu: menuItems,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
