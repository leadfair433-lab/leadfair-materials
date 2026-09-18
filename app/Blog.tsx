"use client";

import { useState } from "react";
import "./blog.css";
import { articleAssetPath, blogArticles } from "./content/blog-data";

export default function Blog({ listing = false }: { listing?: boolean }) {
  const [firstArticle, setFirstArticle] = useState(0);
  const visibleArticles = listing ? blogArticles : Array.from(
    { length: Math.min(3, blogArticles.length) },
    (_, offset) => blogArticles[(firstArticle + offset) % blogArticles.length],
  );
  const turnArticles = (direction: number) => setFirstArticle(
    (current) => (current + direction + blogArticles.length) % blogArticles.length,
  );
  return <section className="material-blog shell" id="blog" aria-labelledby="blog-title">
    <header><div><span className="blog-label">{listing ? "MATERIAL JOURNAL / 全部文章" : "06 — MATERIAL JOURNAL"}</span><h2 id="blog-title">材料洞察與應用指南</h2></div><div className="blog-header-side"><p>從選材到成型，讓材料知識<br/>成為產品開發的下一步。</p>{!listing && <div className="blog-actions"><div className="blog-pager" aria-label="切換文章"><button type="button" onClick={() => turnArticles(-1)} aria-label="上一篇文章"><span aria-hidden="true">‹</span></button><button type="button" onClick={() => turnArticles(1)} aria-label="下一篇文章"><span aria-hidden="true">›</span></button></div><div className="blog-more"><a href="/articles">查看更多文章 <span aria-hidden="true">›</span></a></div></div>}</div></header>
    <div className="blog-grid" aria-live={listing ? undefined : "polite"}>{visibleArticles.map(article => <article className="blog-card" key={article.slug}>
      <a className="blog-image" href={`/blog/${article.slug}`} aria-label={`閱讀文章：${article.title}`}><img src={articleAssetPath(article.image)} alt={article.alt} loading="lazy" width="640" height="400"/></a>
      <div className="blog-copy"><span className="blog-label">{article.category}</span><h3>{article.title}</h3><p>{article.summary}</p>
        <a className="blog-read-link" href={`/blog/${article.slug}`} aria-label={`閱讀全文：${article.title}`}><span>閱讀全文</span><span aria-hidden="true">↗</span></a>
      </div>
    </article>)}</div>
  </section>;
}
