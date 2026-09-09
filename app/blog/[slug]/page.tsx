import { notFound } from "next/navigation";
import { articleAssetPath, blogArticles, type ArticleBlock } from "../../Blog";
import "../article.css";
import ArticleFrame, { ArticleBackButton } from "../ArticleFrame";
import { ArticleShare, ArticleContact, ArticlePrint } from "../ArticleActions";
import LanguageSwitcher from "../../LanguageSwitcher";

type Props = { params: Promise<{ slug: string }> };

function Blocks({ blocks }: { blocks: ArticleBlock[] }) {
  return <>{blocks.map((block, i) => {
    if (block.type === "image") return <figure className="journal-source-figure" key={i}><img src={articleAssetPath(block.src || "")} alt={block.text || "原文示意圖"} loading="lazy" /></figure>;
    if (block.type === "table") return <div className="journal-table-scroll" key={i} role="region" aria-label="技术数据表" tabIndex={0}><table><tbody>{block.rows?.map((row, r) => <tr key={r}>{row.map((cell, c) => r === 0 ? <th key={c} colSpan={cell.colSpan}>{cell.text}</th> : <td key={c} colSpan={cell.colSpan}>{cell.text}</td>)}</tr>)}</tbody></table></div>;
    if (block.type === "heading") return <h3 key={i}>{block.text}</h3>;
    return <p className={block.type === "list" ? "journal-list-item" : undefined} key={i}>{block.text}</p>;
  })}</>;
}

export function generateStaticParams() {
  return blogArticles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = blogArticles.find(item => item.slug === slug);
  return { title: article ? `${article.title} | 材料洞察` : "文章未找到", description: article?.summary };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = blogArticles.find(item => item.slug === slug);
  if (!article) notFound();

  return <ArticleFrame>
    <article className="journal-sheet">
      <header className="journal-toolbar"><ArticleBackButton /><span>MATERIAL JOURNAL</span><div className="journal-toolbar-actions"><LanguageSwitcher compact/><ArticlePrint /><a className="journal-contact" href="/articles">更多文章 ↗</a></div></header>
      <div className="journal-content">
        <div className="journal-hero">
          <div><span className="journal-category">{article.category}</span><h1>{article.title}</h1>{article.englishTitle && <p>{article.englishTitle}</p>}<p>{article.summary}</p><span className="journal-series">材料洞察 / 应用指南{article.illustrativeCover && " · 主圖為 AI 情境示意，非實測照片"}</span></div>
          <img src={articleAssetPath(article.image)} alt={article.alt} width="1536" height="1024" />
        </div>
        <div className="journal-reading">
          <aside><nav className="journal-outline" aria-label="文章目录"><h2>OUTLINE / 文章大纲（点击跳转）</h2>{article.sections.map((section, index) => <a key={section.title} href={`#section-${index + 1}`}><span>{String(index + 1).padStart(2, "0")}.</span>{section.title}</a>)}</nav><ArticleShare title={article.title} /><ArticleContact /></aside>
          <div className="journal-body">{article.sections.map((section, index) => <section id={`section-${index + 1}`} key={section.title}><h2><span>{String(index + 1).padStart(2, "0")}</span>{section.title}</h2>{section.blocks ? <Blocks blocks={section.blocks} /> : <p>{section.text}</p>}</section>)}<footer><span>材料洞察与应用指南</span><a href="/articles">返回全部文章 ↗</a></footer></div>
        </div>
      </div>
    </article>
  </ArticleFrame>;
}
