import SiteHeader from "./SiteHeader";
import GlobalInquiryFooter from "./GlobalInquiryFooter";
import { laboratoryArticles } from "./content/laboratory";
import "./laboratory.css";

const laboratoryIndexArticles = laboratoryArticles.filter((article) => article.imageFit === "contain");

export default function LaboratoryIndexPage({ locale }: { locale?: string }) {
  const base = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${locale ? `/${locale}` : ""}/company`;
  return <main className="laboratory-index-page">
    <SiteHeader />
    <div className="shell laboratory-index">
      <nav aria-label="返回企業介紹"><a href={`${base}/#company-laboratory`}>← 返回實驗室環境</a></nav>
      <header className="laboratory-index-heading"><span>FF / LF LABORATORY</span><h1>實驗室儀器總覽</h1><p>查看九項材料研發與品質驗證儀器。點擊各項目可了解設備用途、型號、測試標準與主要規格。</p></header>
      <div className="laboratory-index-grid">{laboratoryIndexArticles.map((article, index) => <article key={article.slug}>
        <a className={`laboratory-index-image${article.imageFit === "contain" ? " contain" : ""}`} href={`${base}/laboratory/${article.slug}/`} aria-label={`查看${article.title}詳情`}><img src={article.image} alt={article.title} loading={index < 2 ? "eager" : "lazy"} /></a>
        <div className="laboratory-index-copy"><small>{String(index + 1).padStart(2, "0")} / LABORATORY</small><h2>{article.title}</h2><p>{article.summary}</p><a href={`${base}/laboratory/${article.slug}/`}>查看詳情 <span aria-hidden="true">↗</span></a></div>
      </article>)}</div>
    </div>
    <GlobalInquiryFooter />
  </main>;
}
