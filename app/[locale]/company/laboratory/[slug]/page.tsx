import { notFound } from "next/navigation";
import LaboratoryArticlePage from "../../../../LaboratoryArticlePage";
import { laboratoryArticles } from "../../../../content/laboratory";

type Props = { params: Promise<{ locale: string; slug: string }> };
export function generateStaticParams() { return ["zh-tw", "en", "vi"].flatMap(locale => laboratoryArticles.map(article => ({ locale, slug: article.slug }))); }
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = laboratoryArticles.find(item => item.slug === slug);
  return { title: article ? `${article.title} | 實驗室環境` : "文章未找到", description: article?.summary };
}
export default async function Page({ params }: Props) {
  const { slug, locale } = await params;
  const article = laboratoryArticles.find(item => item.slug === slug);
  if (!article) notFound();
  return <LaboratoryArticlePage article={article} locale={locale} />;
}
