import { articleAssetPath, blogArticles } from "../Blog";
import "./articles.css";

export const metadata = { title: "材料文章汇总 | 材料洞察与应用指南", description: "汇总 TPE 材料选型、发泡开发与成型验证的应用文章。" };

export default function ArticlesPage() {
  const featured = blogArticles[0];
  return <main className="article-hub">
    <nav className="article-hub-nav shell" aria-label="文章中心导航"><a href="/#blog">← 返回首页</a><span>ADVANCED MATERIALS</span><a href="/#product">查看材料牌号 ↗</a></nav>
    <div className="shell">
      <header className="article-hub-heading"><span>MATERIAL INSIGHTS / 文章中心</span><h1>材料知识，<br />从应用出发。</h1><p>了解材料选型、发泡开发与成型验证，<br />为下一步产品开发找到参考。</p></header>
      <section className="article-hub-feature" aria-label="精选文章"><div><span>FEATURED / 精选阅读</span><h2><a href={`/blog/${featured.slug}`}>{featured.title}</a></h2><p>{featured.summary}</p><a className="article-hub-button" href={`/blog/${featured.slug}`}>阅读全文 ↗</a></div><a className="article-hub-cover" href={`/blog/${featured.slug}`} aria-label={`阅读：${featured.title}`}><img src={articleAssetPath(featured.image)} alt={featured.alt} width="1536" height="1024" /></a></section>
      <section className="article-hub-all" aria-labelledby="all-articles"><header><h2 id="all-articles">全部文章</h2><span>{String(blogArticles.length).padStart(2,"0")} ARTICLES</span></header><div className="article-hub-grid">{blogArticles.map(article => <article key={article.slug}><a className="article-hub-thumbnail" href={`/blog/${article.slug}`} aria-label={`阅读：${article.title}`}><img src={articleAssetPath(article.image)} alt={article.alt} width="640" height="400" loading="lazy" /></a><span>{article.category}</span><h3><a href={`/blog/${article.slug}`}>{article.title}</a></h3><p>{article.summary}</p><a className="article-hub-read" href={`/blog/${article.slug}`}>阅读全文 <span aria-hidden="true">↗</span></a></article>)}</div></section>
      <footer className="article-hub-footer"><span>材料洞察与应用指南</span><a href="/#inquiry">与材料工程师交流 ↗</a></footer>
    </div>
  </main>;
}
