import SiteHeader from "./SiteHeader";
import GlobalInquiryFooter from "./GlobalInquiryFooter";
import { laboratoryArticles } from "./content/laboratory";
import "./laboratory.css";

export default function LaboratoryIndexPage({ locale }: { locale?: string }) {
  const base = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${locale ? `/${locale}` : ""}/company`;
  return <main className="laboratory-index-page">
    <SiteHeader />
    <div className="shell laboratory-index">
      <nav aria-label="返回企業介紹"><a href={`${base}/#company-laboratory`}>← 返回實驗室環境</a></nav>
      <header className="laboratory-index-heading"><span>FF / LF LABORATORY</span><h1>實驗室儀器總覽</h1><p>了解材料研發與測試環境。點擊各項目可查看獨立介紹；設備名稱、用途與測試資訊將持續補充。</p></header>
      <div className="laboratory-index-grid">{laboratoryArticles.map((article, index) => <article key={article.slug}>
        <a className="laboratory-index-image" href={`${base}/laboratory/${article.slug}/`} aria-label={`查看${article.title}詳情`}><img src={article.image} alt={article.title} loading={index < 2 ? "eager" : "lazy"} /></a>
        <div className="laboratory-index-copy"><small>{String(index + 1).padStart(2, "0")} / LABORATORY</small><h2>{article.title}</h2><p>{article.summary}</p><a href={`${base}/laboratory/${article.slug}/`}>查看詳情 <span aria-hidden="true">↗</span></a></div>
      </article>)}</div>
    </div>
    <GlobalInquiryFooter />
  </main>;
}
