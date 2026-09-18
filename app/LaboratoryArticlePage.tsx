import SiteHeader from "./SiteHeader";
import GlobalInquiryFooter from "./GlobalInquiryFooter";
import { laboratoryArticles, type LaboratoryArticle } from "./content/laboratory";
import "./laboratory.css";

export default function LaboratoryArticlePage({ article, locale }: { article: LaboratoryArticle; locale?: string }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const companyUrl = `${basePath}${locale ? `/${locale}` : ""}/company/`;
  const laboratoryUrl = `${basePath}${locale ? `/${locale}` : ""}/company/laboratory/`;
  return <main className="laboratory-article-page">
    <SiteHeader />
    <article className="laboratory-article shell">
      <nav aria-label="返回實驗室"><a href={`${companyUrl}#company-laboratory`}>← 返回實驗室環境</a></nav>
      <div className="laboratory-article-hero">
        <header className="laboratory-article-header">
          <span>FF / LF LABORATORY · 實驗室環境</span>
          <h1>{article.title}</h1>
          <p>{article.summary}</p>
          <small>實驗室介紹 / 設備資料待確認</small>
        </header>
        <figure className="laboratory-article-cover"><img src={article.image} alt={article.title} /><figcaption>實驗室環境圖片；設備型號與測試數據待確認。</figcaption></figure>
      </div>
      <div className="laboratory-article-layout">
        <aside><strong>本文內容</strong>{article.sections.map((section, index) => <a key={section.title} href={`#lab-section-${index+1}`}>{String(index+1).padStart(2,"0")}　{section.title}</a>)}</aside>
        <div className="laboratory-article-body">
          {article.sections.map((section, index) => <section id={`lab-section-${index+1}`} key={section.title}><span>{String(index+1).padStart(2,"0")} / LABORATORY</span><h2>{section.title}</h2>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</section>)}
          <div className="laboratory-article-related"><h2>其他實驗室介紹</h2><div>{laboratoryArticles.filter(item => item.slug !== article.slug).map(item => <a href={`${laboratoryUrl}${item.slug}/`} key={item.slug}><img src={item.image} alt="" loading="lazy" /><span>{item.title}<b aria-hidden="true">↗</b></span></a>)}</div></div>
        </div>
      </div>
    </article>
    <GlobalInquiryFooter />
  </main>;
}
