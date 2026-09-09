import Blog from "../Blog";
import LanguageSwitcher from "../LanguageSwitcher";

export const metadata = { title: "全部文章 | 材料洞察與應用指南", description: "探索 TPE 材料選型、發泡開發與成型驗證的應用指南。" };

export default function BlogIndexPage() {
  return <main className="blog-listing">
    <nav className="blog-listing-nav shell" aria-label="文章列表導航"><a href="/#blog">← 返回首頁</a><span>MATERIAL JOURNAL</span><LanguageSwitcher compact/></nav>
    <Blog listing />
  </main>;
}
