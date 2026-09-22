import LaboratoryIndexPage from "../../../LaboratoryIndexPage";

export const metadata = { title: "實驗室儀器總覽 | 峰暉塑膠", description: "查看峰暉塑膠的材料研發與測試環境介紹。" };

export function generateStaticParams() { return [{ locale: "zh-tw" }, { locale: "en" }, { locale: "vi" }]; }

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <LaboratoryIndexPage locale={locale} />;
}
