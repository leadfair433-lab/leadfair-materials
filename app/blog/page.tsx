import Blog from "../Blog";
import LanguageSwitcher from "../LanguageSwitcher";

export const metadata = { title: "全部文章 | 材料洞察与应用指南", description: "探索 TPE 材料选型、发泡开发与成型验证的应用指南。" };

export default function BlogIndexPage() {
  return <main className="blog-listing">
    <nav className="blog-listing-nav shell" aria-label="文章列表导航"><a href="/#blog">← 返回首页</a><span>MATERIAL JOURNAL</span><LanguageSwitcher compact/></nav>
    <Blog listing />
  </main>;
}
