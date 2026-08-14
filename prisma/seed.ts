import { PrismaClient, PageType } from "@prisma/client";

const prisma = new PrismaClient();

const IMG = {
  strawberryMojito:
    "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=800&q=80",
  berryMojito:
    "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
  lemonade:
    "https://images.unsplash.com/photo-1523677011782-c13c85906db2?auto=format&fit=crop&w=800&q=80",
  icedLatte:
    "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80",
  espresso:
    "https://images.unsplash.com/photo-1510591509098-f4b5d0ba0d5c?auto=format&fit=crop&w=800&q=80",
  cappuccino:
    "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80",
  hotChocolate:
    "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=800&q=80",
  karak:
    "https://images.unsplash.com/photo-1571934811356-5cc061af4d29?auto=format&fit=crop&w=800&q=80",
  strawberryGelato:
    "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80",
  vanilla:
    "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=800&q=80",
  chocolate:
    "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80",
  pistachio:
    "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=800&q=80",
  mango:
    "https://images.unsplash.com/photo-1488900128323-21526024875f?auto=format&fit=crop&w=800&q=80",
  cookies:
    "https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=800&q=80",
  hero: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=1400&q=80",
};

async function main() {
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.location.deleteMany();
  await prisma.settings.deleteMany();

  await prisma.settings.create({
    data: {
      id: "main",
      storeName: "Fragola Gelato",
      phone: "+966 50 000 0000",
      address: "الرياض، حي العليا",
      description: "متجر جيلاتو إيطالي فاخر يقدم نكهات طازجة يومياً.",
      isOpen: true,
      currency: "ل.س",
      taxEnabled: false,
      taxRate: 0.15,
      heroTitle: "استمتع بمشروباتنا المنعشة واللذيذة",
      heroText:
        "مجموعة متنوعة من المشروبات الباردة والساخنة المحضّرة بعناية لتكتمل تجربتك مع الجيلاتو.",
      heroImage: IMG.hero,
      showWhatsapp: true,
      showInstagram: false,
      showFacebook: false,
      instagramUrl: "",
      facebookUrl: "",
      whatsappNumbers: [],
    },
  });

  const classic = await prisma.category.create({
    data: {
      name: "النكهات الكلاسيكية",
      slug: "classic-gelato",
      icon: "cone",
      page: PageType.GELATO,
      sortOrder: 1,
    },
  });

  const signature = await prisma.category.create({
    data: {
      name: "نكهات مميزة",
      slug: "signature-gelato",
      icon: "cone",
      page: PageType.GELATO,
      sortOrder: 2,
    },
  });

  const cold = await prisma.category.create({
    data: {
      name: "مشروبات باردة",
      slug: "cold-drinks",
      icon: "snowflake",
      page: PageType.BEVERAGES,
      sortOrder: 1,
    },
  });

  const hot = await prisma.category.create({
    data: {
      name: "مشروبات ساخنة",
      slug: "hot-drinks",
      icon: "cup",
      page: PageType.BEVERAGES,
      sortOrder: 2,
    },
  });

  await prisma.product.createMany({
    data: [
      {
        name: "جيلاتو فراولة",
        description: "فراولة طازجة مهروسة مع كريمة إيطالية ناعمة.",
        price: 18,
        imageUrl: IMG.strawberryGelato,
        categoryId: classic.id,
        isSpecial: true,
        sortOrder: 1,
      },
      {
        name: "جيلاتو فانيليا",
        description: "فانيليا مدغشقر الكلاسيكية بقوام حريري.",
        price: 16,
        imageUrl: IMG.vanilla,
        categoryId: classic.id,
        sortOrder: 2,
      },
      {
        name: "جيلاتو شوكولاتة",
        description: "شوكولاتة بلجيكية غنية لعشاق الكاكاو.",
        price: 18,
        imageUrl: IMG.chocolate,
        categoryId: classic.id,
        sortOrder: 3,
      },
      {
        name: "جيلاتو فستق",
        description: "فستق حلبي محمص بنكهة أصيلة وقوام كريمي.",
        price: 22,
        imageUrl: IMG.pistachio,
        categoryId: signature.id,
        isSpecial: true,
        sortOrder: 1,
      },
      {
        name: "جيلاتو مانجو",
        description: "مانجو استوائي ناضج بطعم صيفي منعش.",
        price: 20,
        imageUrl: IMG.mango,
        categoryId: signature.id,
        sortOrder: 2,
      },
      {
        name: "جيلاتو كوكيز",
        description: "قطع كوكيز مقرمشة داخل جيلاتو فانيليا.",
        price: 20,
        imageUrl: IMG.cookies,
        categoryId: signature.id,
        sortOrder: 3,
      },
      {
        name: "موهيتو فراولة",
        description: "مزيج منعش من النعناع والفراولة الطازجة مع لمسة ليمون.",
        price: 22,
        imageUrl: IMG.strawberryMojito,
        categoryId: cold.id,
        isSpecial: true,
        sortOrder: 1,
      },
      {
        name: "موهيتو توت",
        description: "توت مشكل مع نعناع وثلج ليوم حار.",
        price: 22,
        imageUrl: IMG.berryMojito,
        categoryId: cold.id,
        sortOrder: 2,
      },
      {
        name: "ليموناضة فراجولا",
        description: "ليمون طبيعي مع نعناع وسكر خفيف.",
        price: 16,
        imageUrl: IMG.lemonade,
        categoryId: cold.id,
        sortOrder: 3,
      },
      {
        name: "آيس لاتيه",
        description: "إسبريسو مثلّج مع حليب بارد وكريمة خفيفة.",
        price: 18,
        imageUrl: IMG.icedLatte,
        categoryId: cold.id,
        sortOrder: 4,
      },
      {
        name: "إسبريسو",
        description: "جرعة إيطالية مركّزة من البن المحمّص طازجاً.",
        price: 12,
        imageUrl: IMG.espresso,
        categoryId: hot.id,
        sortOrder: 1,
      },
      {
        name: "كابتشينو",
        description: "إسبريسو مع حليب مبخّر ورغوة ناعمة.",
        price: 16,
        imageUrl: IMG.cappuccino,
        categoryId: hot.id,
        sortOrder: 2,
      },
      {
        name: "هوت شوكليت",
        description: "شوكولاتة ساخنة غنية مع كريمة مخفوقة.",
        price: 18,
        imageUrl: IMG.hotChocolate,
        categoryId: hot.id,
        sortOrder: 3,
      },
      {
        name: "شاي كرك",
        description: "شاي كرك بالحليب والهيل على الطريقة التقليدية.",
        price: 14,
        imageUrl: IMG.karak,
        categoryId: hot.id,
        sortOrder: 4,
      },
    ],
  });

  await prisma.location.createMany({
    data: [
      {
        name: "فراجولا — الفرع الرئيسي",
        address: "الرياض، حي العليا، طريق الملك فهد",
        phone: "+966 50 000 0000",
        mapUrl: "https://maps.google.com/?q=Riyadh+Olaya",
        isOpen: true,
        sortOrder: 1,
      },
      {
        name: "فراجولا — جدة",
        address: "جدة، الكورنيش",
        phone: "+966 50 000 0001",
        mapUrl: "https://maps.google.com/?q=Jeddah+Corniche",
        isOpen: true,
        sortOrder: 2,
      },
    ],
  });

  console.log("Seeded Fragola Gelato menu data.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
