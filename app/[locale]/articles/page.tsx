import ArticlesPage from "../../articles/page";

export function generateStaticParams() {
  return ["zh-tw", "en", "vi"].map(locale => ({ locale }));
}

export default function LocalizedArticles() {
  return <ArticlesPage />;
}
