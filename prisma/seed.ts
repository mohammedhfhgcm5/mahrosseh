import { PrismaClient, PageType } from "@prisma/client";

const prisma = new PrismaClient();

const IMG = {
  hero: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1400&q=80",
  frappe: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80",
  icedLatte: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80",
  icedAmericano: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?auto=format&fit=crop&w=800&q=80",
  softDrink: "https://images.unsplash.com/photo-1546171753-97d7676e4602?auto=format&fit=crop&w=800&q=80",
  icedTea: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80",
  softLamin: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=800&q=80",
  milkshake: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&q=80",
  espressoConPanna: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=800&q=80",
  cortado: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
  affogato: "https://images.unsplash.com/photo-1413745043345-1b8890a81a45?auto=format&fit=crop&w=800&q=80",
  flatWhite: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
  cappuccino: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80",
  latte: "https://images.unsplash.com/photo-1561882468-9110e03e0f78?auto=format&fit=crop&w=800&q=80",
  macchiato: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80",
  espresso: "https://images.unsplash.com/photo-1510591509098-f4b5d0ba0d5c?auto=format&fit=crop&w=800&q=80",
  spanishEspresso: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
  lungo: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80",
  ristretto: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
  pancakeKinder: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80",
  pancakeChocolate: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=800&q=80",
  pancakeLotus: "https://images.unsplash.com/photo-1506089676908-3592f7389d4d?auto=format&fit=crop&w=800&q=80",
  pancakePistachio: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80",
  crepeChocolate: "https://images.unsplash.com/photo-1519676867392-c54d0b4c0d1c?auto=format&fit=crop&w=800&q=80",
  crepeKinder: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80",
  crepeLotus: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=80",
  crepePistachio: "https://images.unsplash.com/photo-1621303837174-89787a7d2398?auto=format&fit=crop&w=800&q=80",
  crepeDubai: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80",
  crepeKitkat: "https://images.unsplash.com/photo-1606312619070-d48b4e809a91?auto=format&fit=crop&w=800&q=80",
  crepeSushi: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80",
  crepeFettuccine: "https://images.unsplash.com/photo-1470114756179-9f0d56c0c5a0?auto=format&fit=crop&w=800&q=80",
  happinessBox: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80",
};

async function main() {
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  const existingSettings = await prisma.settings.findUnique({ where: { id: "main" } });
  if (!existingSettings) {
    await prisma.settings.create({
      data: {
        id: "main",
        storeName: "Fragola Gelato",
        phone: "",
        address: "",
        description: "متجر جيلاتو إيطالي فاخر يقدم نكهات طازجة يومياً.",
        isOpen: true,
        currency: "ل.س",
        heroTitle: "استمتع بمشروباتنا المنعشة واللذيذة",
        heroText:
          "مجموعة متنوعة من المشروبات الباردة والساخنة والحلويات المحضّرة بعناية.",
        heroImage: IMG.hero,
      },
    });
  }

  const pancakes = await prisma.category.create({
    data: {
      name: "بان كيك",
      slug: "pancakes",
      icon: "cone",
      page: PageType.GELATO,
      sortOrder: 1,
    },
  });

  const crepes = await prisma.category.create({
    data: {
      name: "كلاسيك كريب",
      slug: "classic-crepes",
      icon: "cone",
      page: PageType.GELATO,
      sortOrder: 2,
    },
  });

  const boxes = await prisma.category.create({
    data: {
      name: "بوكس السعادة",
      slug: "happiness-box",
      icon: "offer",
      page: PageType.GELATO,
      sortOrder: 3,
    },
  });

  const cold = await prisma.category.create({
    data: {
      name: "المشروبات الباردة",
      slug: "cold-drinks",
      icon: "snowflake",
      page: PageType.BEVERAGES,
      sortOrder: 1,
    },
  });

  const hot = await prisma.category.create({
    data: {
      name: "المشروبات الساخنة",
      slug: "hot-drinks",
      icon: "cup",
      page: PageType.BEVERAGES,
      sortOrder: 2,
    },
  });

  await prisma.product.createMany({
    data: [
      {
        name: "بان كيك كيندر",
        description: "بان كيك مع كيندر وشوكولاتة غنية.",
        price: 350,
        imageUrl: IMG.pancakeKinder,
        categoryId: pancakes.id,
        sortOrder: 1,
      },
      {
        name: "بان كيك شوكولا",
        description: "بان كيك كلاسيك بصوص الشوكولا.",
        price: 350,
        imageUrl: IMG.pancakeChocolate,
        categoryId: pancakes.id,
        sortOrder: 2,
      },
      {
        name: "بان كيك لوتس",
        description: "بان كيك مع صوص اللوتس وبسكويت لوتس.",
        price: 350,
        imageUrl: IMG.pancakeLotus,
        categoryId: pancakes.id,
        sortOrder: 3,
      },
      {
        name: "بان كيك بستاشيو",
        description: "بان كيك مع كريمة البستاشيو.",
        price: 350,
        imageUrl: IMG.pancakePistachio,
        categoryId: pancakes.id,
        sortOrder: 4,
      },
      {
        name: "كريب شوكولا",
        description: "كريب كلاسيك بصوص الشوكولا.",
        price: 350,
        imageUrl: IMG.crepeChocolate,
        categoryId: crepes.id,
        sortOrder: 1,
      },
      {
        name: "كريب كيندر",
        description: "كريب محشي كيندر مع صوص شوكولا.",
        price: 350,
        imageUrl: IMG.crepeKinder,
        categoryId: crepes.id,
        sortOrder: 2,
      },
      {
        name: "كريب لوتس",
        description: "كريب مع صوص اللوتس وبسكويت لوتس.",
        price: 350,
        imageUrl: IMG.crepeLotus,
        categoryId: crepes.id,
        sortOrder: 3,
      },
      {
        name: "كريب بستاشيو",
        description: "كريب مع كريمة البستاشيو.",
        price: 350,
        imageUrl: IMG.crepePistachio,
        categoryId: crepes.id,
        sortOrder: 4,
      },
      {
        name: "كريب دبي",
        description: "كريب دبي بالكنافة والبستاشيو.",
        price: 450,
        imageUrl: IMG.crepeDubai,
        categoryId: crepes.id,
        isSpecial: true,
        sortOrder: 5,
      },
      {
        name: "كريب كيت كات",
        description: "كريب مع قطع كيت كات وصوص شوكولا.",
        price: 450,
        imageUrl: IMG.crepeKitkat,
        categoryId: crepes.id,
        isSpecial: true,
        sortOrder: 6,
      },
      {
        name: "سوشي كريب",
        description: "كريب ملفوف على شكل سوشي مع صوصات متنوعة.",
        price: 450,
        imageUrl: IMG.crepeSushi,
        categoryId: crepes.id,
        isSpecial: true,
        sortOrder: 7,
      },
      {
        name: "فوتوتشيني كريب",
        description: "كريب مقطّع شرائح رفيعة مع صوص الشوكولا.",
        price: 350,
        imageUrl: IMG.crepeFettuccine,
        categoryId: crepes.id,
        sortOrder: 8,
      },
      {
        name: "بوكس السعادة",
        description: "بوكس مشكل من كريب ووافل وصلصات متنوعة للمشاركة.",
        price: 1000,
        imageUrl: IMG.happinessBox,
        categoryId: boxes.id,
        isSpecial: true,
        sortOrder: 1,
      },
      {
        name: "فراببه",
        description:
          "نكهات: فريز، باونتي، كيندر، كراميل، فانيل، بابل غام، براونيز، تشيز كيك، شوكولا.",
        price: 400,
        imageUrl: IMG.frappe,
        categoryId: cold.id,
        sortOrder: 1,
      },
      {
        name: "آيس لاتيه",
        description:
          "نكهات: كراميل، فراولة، فانيلا، موكا، بابل غم، بلو كاساو، بندق، زيبرا، هازلنت.",
        price: 250,
        imageUrl: IMG.icedLatte,
        categoryId: cold.id,
        sortOrder: 2,
      },
      {
        name: "آيسد أمريكانو",
        description: "نكهات: برتقال، ليمون، مانجو، بلاك لونغ.",
        price: 250,
        imageUrl: IMG.icedAmericano,
        categoryId: cold.id,
        sortOrder: 3,
      },
      {
        name: "سوفت درينك",
        description:
          "نكهات: دراغون فروت، باشن فروت، ستروبري بلو، رازبيري، بلو كاساو، بلوبيري، ستروبري، مكس بيري، غراندين، دراق، مانجو.",
        price: 250,
        imageUrl: IMG.softDrink,
        categoryId: cold.id,
        sortOrder: 4,
      },
      {
        name: "آيس تي",
        description: "نكهات: دراق، ليمون.",
        price: 250,
        imageUrl: IMG.icedTea,
        categoryId: cold.id,
        sortOrder: 5,
      },
      {
        name: "سوفت لامين",
        description:
          "نكهات: مينت فروشينلا، سن شاين، بلو لاجون، سي ماستر، سوفت جم، سوفت لاند جوس، بوب مارلي، بينك مون، بينا كولادا، آيس كركديه، هاواي انتنت.",
        price: 350,
        imageUrl: IMG.softLamin,
        categoryId: cold.id,
        isSpecial: true,
        sortOrder: 6,
      },
      {
        name: "ميلك شيك",
        description:
          "نكهات: فريز، باونتي، كيندر، كراميل، فانيل، بابل غام، براونيز، تشيز كيك، شوكولا.",
        price: 350,
        imageUrl: IMG.milkshake,
        categoryId: cold.id,
        sortOrder: 7,
      },
      {
        name: "اسبريسو كومبانا",
        description: "إسبريسو مع كريمة مخفوقة.",
        price: 250,
        imageUrl: IMG.espressoConPanna,
        categoryId: hot.id,
        sortOrder: 1,
      },
      {
        name: "اسبريسو كورتادو",
        description: "إسبريسو مع كمية متساوية من الحليب المبخّر.",
        price: 200,
        imageUrl: IMG.cortado,
        categoryId: hot.id,
        sortOrder: 2,
      },
      {
        name: "اسبريسو أفوكادو",
        description: "إسبريسو يُسكب فوق الجيلاتو.",
        price: 200,
        imageUrl: IMG.affogato,
        categoryId: hot.id,
        sortOrder: 3,
      },
      {
        name: "فلات وايت",
        description: "إسبريسو مع حليب مبخّر ناعم.",
        price: 200,
        imageUrl: IMG.flatWhite,
        categoryId: hot.id,
        sortOrder: 4,
      },
      {
        name: "كابوتشينو",
        description: "إسبريسو مع حليب مبخّر ورغوة.",
        price: 200,
        imageUrl: IMG.cappuccino,
        categoryId: hot.id,
        sortOrder: 5,
      },
      {
        name: "لاتيه",
        description: "إسبريسو مع حليب مبخّر كريمي.",
        price: 200,
        imageUrl: IMG.latte,
        categoryId: hot.id,
        sortOrder: 6,
      },
      {
        name: "اسبريسو ميكاتو",
        description: "إسبريسو مع لمسة رغوة حليب.",
        price: 200,
        imageUrl: IMG.macchiato,
        categoryId: hot.id,
        sortOrder: 7,
      },
      {
        name: "اسبريسو",
        description: "جرعة إسبريسو مركّزة.",
        price: 60,
        imageUrl: IMG.espresso,
        categoryId: hot.id,
        sortOrder: 8,
      },
      {
        name: "اسبريسو اسباني",
        description: "إسبريسو مع حليب مكثف محلّى.",
        price: 80,
        imageUrl: IMG.spanishEspresso,
        categoryId: hot.id,
        sortOrder: 9,
      },
      {
        name: "اسبريسو لونغو",
        description: "إسبريسو مستخرج بكمية ماء أكبر.",
        price: 60,
        imageUrl: IMG.lungo,
        categoryId: hot.id,
        sortOrder: 10,
      },
      {
        name: "اسبريسو ستاليتو",
        description: "إسبريسو ريستريتو قصير ومركّز.",
        price: 60,
        imageUrl: IMG.ristretto,
        categoryId: hot.id,
        sortOrder: 11,
      },
    ],
  });

  console.log("Seeded Fragola Gelato menu from the printed menu.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
