import { articleAssetPath, blogArticles } from "../Blog";
import SiteHeader from "../SiteHeader";
import GlobalInquiryFooter from "../GlobalInquiryFooter";
import "./articles.css";

export const metadata = { title: "材料文章彙總 | 材料洞察與應用指南", description: "彙總 TPE 材料選型、發泡開發與成型驗證的應用文章。" };

export default function ArticlesPage() {
  const featured = blogArticles[0];
  return <main className="article-hub">
    <SiteHeader />
    <div className="shell">
      <header className="article-hub-heading"><span>MATERIAL INSIGHTS / 文章中心</span><h1>材料知識，<br />從應用出發。</h1><p>瞭解材料選型、發泡開發與成型驗證，<br />為下一步產品開發找到參考。</p></header>
      <section className="article-hub-feature" aria-label="精選文章"><div><span>FEATURED / 精選閱讀</span><h2><a href={`/blog/${featured.slug}`}>{featured.title}</a></h2><p>{featured.summary}</p><a className="article-hub-button" href={`/blog/${featured.slug}`}>閱讀全文 ↗</a></div><a className="article-hub-cover" href={`/blog/${featured.slug}`} aria-label={`閱讀：${featured.title}`}><img src={articleAssetPath(featured.image)} alt={featured.alt} width="1536" height="1024" /></a></section>
      <section className="article-hub-all" aria-labelledby="all-articles"><header><h2 id="all-articles">全部文章</h2><span>{String(blogArticles.length).padStart(2,"0")} ARTICLES</span></header><div className="article-hub-grid">{blogArticles.map(article => <article key={article.slug}><a className="article-hub-thumbnail" href={`/blog/${article.slug}`} aria-label={`閱讀：${article.title}`}><img src={articleAssetPath(article.image)} alt={article.alt} width="640" height="400" loading="lazy" /></a><span>{article.category}</span><h3><a href={`/blog/${article.slug}`}>{article.title}</a></h3><p>{article.summary}</p><a className="article-hub-read" href={`/blog/${article.slug}`}>閱讀全文 <span aria-hidden="true">↗</span></a></article>)}</div></section>
      <footer className="article-hub-footer"><span>材料洞察與應用指南</span><a href="/#inquiry">與材料工程師交流 ↗</a></footer>
    </div>
    <GlobalInquiryFooter />
  </main>;
}
