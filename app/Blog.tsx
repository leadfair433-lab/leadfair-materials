import "./blog.css";
import technicalArticles from "./content/technical-articles.json";

export type ArticleBlock = { type: string; text?: string; src?: string; rows?: { text: string; colSpan: number }[][] };
export type JournalArticle = { slug: string; title: string; englishTitle?: string; summary: string; category: string; image: string; alt: string; illustrativeCover?: boolean; sections: { title: string; text: string; blocks?: ArticleBlock[] }[] };

export function articleAssetPath(src: string) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return basePath && !src.startsWith(`${basePath}/`) ? `${basePath}${src}` : src;
}

const publicImage = (filename: string) => `/images/${filename}`;

const articles = [
  { category: "01 / MATERIAL SELECTION", title: "如何为产品选择合适的 TPE 材料？", image: "/images/blog-selection-v2.png", alt: "TPE 选材样片、原料颗粒与测量工具", summary: "从应用场景到目标性能，梳理开始选材前需要准备的信息。", paragraphs: ["选材从实际产品需求开始。产品用途、结构设计、成型方式和使用环境，都是与材料工程师沟通时需要说明的信息。", "您可以提供产品样品、图面或现行材料资料，并列明硬度、密度、回弹性、手感、颜色及其他特殊物性要求。我们会依实际应用推荐材料方案，必要时进一步进行客制配方开发。"] },
  { category: "02 / FOAMING DEVELOPMENT", title: "发泡 TPE 开发，需要关注哪些指标？", image: "/images/blog-foam-v2.png", alt: "发泡材料的泡孔结构与样片截面", summary: "不只关注硬度与密度，也要结合实际成型条件验证材料表现。", paragraphs: ["发泡材料开发会结合产品需求调整硬度、密度、回弹性、手感及发泡效果。材料配方与实际成型条件需要一起评估。", "验证项目可包括发泡倍率、成型密度、泡孔结构、表面品质、尺寸稳定性及成型加工性。通过试料与实际射出成型验证，再根据结果调整配方，确认材料与制程的匹配性。"] },
  { category: "03 / PROCESS & VALIDATION", title: "从试料到量产，如何推进材料开发？", image: "/images/blog-validation-v2.png", alt: "鞋底模具与成型试样", summary: "明确需求、试料验证与配方调整，让开发步骤与产品目标保持一致。", paragraphs: ["开发初期先确认产品用途、目标性能与加工需求，再开展配方开发及小批量试料。实际试料数量、费用及交期，需要依材料与开发项目个别确认。", "试产过程中可针对发泡效果、密度、硬度、回弹性及成型状况进行分析与调整。涉及特殊性能要求的项目，可能需要多轮试料、成型与再验证，之后再推进量产导入。"] },
];

const articleSlugs = ["tpe-material-selection", "foaming-tpe-development", "material-development-validation"];
const sectionTitles = [["从产品应用出发", "准备选材资料与性能需求"], ["让材料配方与成型条件协同", "通过试料验证关键指标"], ["明确开发目标与试料计划", "从试产验证走向量产"]];
export const blogArticles: JournalArticle[] = [...technicalArticles, ...articles.map((article, index) => ({ ...article, image: publicImage(["blog-selection-v2.png", "blog-foam-v2.png", "blog-validation-v2.png"][index]), slug: articleSlugs[index], sections: article.paragraphs.map((text, sectionIndex) => ({ title: sectionTitles[index][sectionIndex], text })) }))];

export default function Blog({ listing = false }: { listing?: boolean }) {
  return <section className="material-blog shell" id="blog" aria-labelledby="blog-title">
    <header><div><span className="blog-label">{listing ? "MATERIAL JOURNAL / 全部文章" : "06 — MATERIAL JOURNAL"}</span><h2 id="blog-title">材料洞察与应用指南</h2></div><p>从选材到成型，让材料知识<br/>成为产品开发的下一步。</p></header>
    <div className="blog-grid">{(listing ? blogArticles : blogArticles.slice(0, 3)).map(article => <article className="blog-card" key={article.title}>
      <a className="blog-image" href={`/blog/${article.slug}`} aria-label={`阅读文章：${article.title}`}><img src={articleAssetPath(article.image)} alt={article.alt} loading="lazy" width="640" height="400"/></a>
      <div className="blog-copy"><span className="blog-label">{article.category}</span><h3>{article.title}</h3><p>{article.summary}</p>
        <a className="blog-read-link" href={`/blog/${article.slug}`} aria-label={`阅读全文：${article.title}`}><span>阅读全文</span><span aria-hidden="true">↗</span></a>
      </div>
    </article>)}</div>
    {!listing && <div className="blog-more"><a href="/articles">更多文章 <span aria-hidden="true">↗</span></a></div>}
  </section>;
}
