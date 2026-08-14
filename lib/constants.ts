export const SESSION_COOKIE = "fragola_admin";

export const PAGE_COPY: Record<
  "GELATO" | "BEVERAGES" | "SPECIALS",
  { title: string; description: string; seoTitle: string; seoDescription: string }
> = {
  GELATO: {
    title: "جيلاتو إيطالي طازج بنكهات لا تُقاوم",
    description:
      "نحضّر الجيلاتو يومياً من مكونات طبيعية مختارة، بنكهات كلاسيكية وموسمية ترضي كل الأذواق.",
    seoTitle: "جيلاتو",
    seoDescription:
      "اكتشف نكهات جيلاتو فراجولا الطازجة: فراولة، فستق، شوكولاتة، فانيليا والمزيد.",
  },
  BEVERAGES: {
    title: "استمتع بمشروباتنا المنعشة واللذيذة",
    description:
      "مجموعة متنوعة من المشروبات الباردة والساخنة المحضّرة بعناية لتكتمل تجربتك مع الجيلاتو.",
    seoTitle: "المشروبات",
    seoDescription:
      "مشروبات فراجولا الباردة والساخنة: موهيتو فراولة، كابتشينو، هوت شوكليت وشاي كرك.",
  },
  SPECIALS: {
    title: "عروضنا الخاصة لهذا الأسبوع",
    description:
      "نكهات وعروض محدودة الوقت نختارها لكم بعناية. اطلبوا المميز قبل نفاد الكمية.",
    seoTitle: "العروض",
    seoDescription: "عروض فراجولا جيلاتو الحالية على النكهات والمشروبات المميزة.",
  },
};

export const DEFAULT_SETTINGS = {
  id: "main",
  storeName: "Fragola Gelato",
  phone: "+966 50 000 0000",
  address: "الرياض، المملكة العربية السعودية",
  description: "متجر جيلاتو إيطالي فاخر يقدم نكهات طازجة يومياً.",
  isOpen: true,
  currency: "ل.س",
  taxEnabled: false,
  taxRate: 0.15,
  heroTitle: "",
  heroText: "",
  heroImage:
    "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=1200&q=80",
  showWhatsapp: true,
  showInstagram: false,
  showFacebook: false,
  instagramUrl: "",
  facebookUrl: "",
  whatsappNumbers: [] as { id: string; phone: string; label: string }[],
};

export const SITE_NAME_AR = "فراجولا جيلاتو";
