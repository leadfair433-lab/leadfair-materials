import { blogArticles } from "../../../Blog";
import ArticlePage from "../../../blog/[slug]/page";

export function generateStaticParams() {
  return ["zh-tw", "en", "vi"].flatMap(locale => blogArticles.map(article => ({ locale, slug: article.slug })));
}

export default function LocalizedArticle({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  return <ArticlePage params={params} />;
}
