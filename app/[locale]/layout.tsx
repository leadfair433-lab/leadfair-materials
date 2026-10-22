import type { Metadata } from "next";

const localeMetadata: Record<string, Metadata> = {
  en: {
    title: "Found Fair Materials | Advanced TPE R&D and Manufacturing",
    description: "TPE research, modification, testing and scalable manufacturing for global brands and manufacturers.",
  },
  vi: {
    title: "Vật liệu Found Fair | Nghiên cứu, phát triển và sản xuất TPE",
    description: "Nghiên cứu, cải tiến, thử nghiệm và sản xuất TPE quy mô lớn cho các thương hiệu và nhà sản xuất toàn cầu.",
  },
  "zh-tw": {
    title: "峰暉材料｜先進熱塑性材料研發與製造",
    description: "面向全球品牌與製造商的 TPE 熱塑性彈性體研發、改性、測試與規模化生產服務。",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return localeMetadata[locale] || localeMetadata["zh-tw"];
}

export default function LocaleLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
