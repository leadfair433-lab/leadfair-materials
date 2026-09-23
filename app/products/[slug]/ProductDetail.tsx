"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import SiteHeader from "../../SiteHeader";
import GlobalInquiryFooter from "../../GlobalInquiryFooter";
import { productBySlug, products, type ProductModule } from "../../content/products";
import Ius4065ReferenceFrame from "./Ius4065ReferenceFrame";

function OtherProductsCarousel({ currentSlug, locale }: { currentSlug: string; locale?: string }) {
  const [first, setFirst] = useState(0);
  const others = products.filter(item => item.slug !== currentSlug);
  const ordered = others.map((_, index) => others[(first + index) % others.length]);
  const move = (direction: number) => setFirst(index => (index + direction + others.length) % others.length);
  const prefix = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${locale ? `/${locale}` : ""}`;
  return <section className="modular-other-products" aria-labelledby="modular-other-products-title">
    <div className="modular-other-products-heading">
      <div><h2 id="modular-other-products-title">其他產品</h2><p>探索更多材料牌號與應用方向</p></div>
      <div className="modular-other-products-controls">
        <button type="button" onClick={() => move(-1)} aria-label="上一組產品">←</button>
        <button type="button" onClick={() => move(1)} aria-label="下一組產品">→</button>
      </div>
    </div>
    <div className="modular-other-products-grid">
      {ordered.map(item => <a href={`${prefix}/products/${item.slug}/`} className="modular-other-product-card" key={item.slug}>
        <img src={item.image} alt={item.imageAlt} loading="lazy" />
        <div><span>{item.family}</span><h3>{item.name}</h3><p>{item.title}</p><b>查看產品詳情 ↗</b></div>
      </a>)}
    </div>
    <a className="modular-other-products-more" href={`${prefix}/products/`}>查看更多產品 <span aria-hidden="true">↗</span></a>
  </section>;
}

function DetailModule({ module }: { module: ProductModule }) {
  return <section className={`product-module product-module-${module.type}`} id={module.id}>
    <header className="product-module-heading">
      <span>{module.eyebrow || "PRODUCT DETAILS"}</span>
      <h2>{module.title}</h2>
    </header>
    {module.type === "text" && <div className="product-module-prose">
      {module.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
    </div>}
    {module.type === "features" && <div className="product-module-features">
      {module.items.map((item, index) => <article key={item.title}>
        <b>{String(index + 1).padStart(2, "0")}</b>
        <h3>{item.title}</h3>
        {item.description && <p>{item.description}</p>}
      </article>)}
    </div>}
    {module.type === "imageCompare" && <figure className="product-module-image-compare">
      <div className="product-module-image-pair">
        <article className="product-module-image-card">
          <header><h3>{module.leftLabel}</h3><p>{module.leftSubtitle}</p></header>
          <img src={module.image} alt="加熱後翹曲的傳統材料樣片示意" loading="lazy" />
          <div className="product-module-image-result"><strong className="is-low">{module.leftMetric}</strong><p>{module.leftDescription}</p></div>
        </article>
        <article className="product-module-image-card">
          <header><h3>{module.rightLabel}</h3></header>
          <img src={module.image} alt="加熱後維持平整的 IUS-4065 樣片示意" loading="lazy" />
          <div className="product-module-image-result"><strong className="is-high">{module.rightMetric}</strong><ul>{module.rightPoints.map(point => <li key={point}>{point}</li>)}</ul></div>
        </article>
      </div>
      {module.note && <figcaption>{module.note}</figcaption>}
    </figure>}
    {module.type === "list" && <ul className="product-module-list">
      {module.items.map(item => <li key={item}>{item}</li>)}
    </ul>}
    {module.type === "table" && <div className="product-module-table-wrap">
      <table>
        <caption className="sr-only">{module.title}</caption>
        <thead><tr>{module.columns.map(column => <th scope="col" key={column}>{column}</th>)}</tr></thead>
        <tbody>{module.rows.map((row, index) => <tr key={index}>
          {row.map((cell, cellIndex) => cellIndex === 0
            ? <th scope="row" key={cellIndex}>{cell}</th>
            : <td key={cellIndex}>{cell}</td>)}
        </tr>)}</tbody>
      </table>
    </div>}
    {module.type === "compare" && <>{module.description && <p className="product-module-compare-intro">{module.description}</p>}<div className="product-module-compare">
      <div><h3>{module.leftTitle}</h3><ul>{module.left.map(item => <li key={item}>{item}</li>)}</ul></div>
      <span aria-hidden="true">→</span>
      <div><h3>{module.rightTitle}</h3><ul>{module.right.map(item => <li key={item}>{item}</li>)}</ul></div>
    </div></>}
    {module.type === "faq" && <div className="product-module-faq">
      {module.items.map(item => <details key={item.question}>
        <summary>{item.question}</summary><p>{item.answer}</p>
      </details>)}
    </div>}
    {module.type === "download" && <div className="product-module-download">
      <p>{module.description}</p>
      <a href={module.href} download={module.filename}>下載技術資料表 <span aria-hidden="true">↓</span></a>
    </div>}
  </section>;
}

export default function ProductDetail() {
  const params = useParams<{ slug: string; locale?: string }>();
  const product = productBySlug[params?.slug || ""] || products[0];
  const isIus4065 = product.slug === "ius-4065";
  const goBack = () => {
    if (window.history.length > 1 && document.referrer && new URL(document.referrer).origin === window.location.origin) window.history.back();
    else window.location.assign("/products/");
  };
  if (isIus4065 && (!params?.locale || params.locale === "zh-tw")) return <main className="ius-reference-page">
    <SiteHeader />
    <nav className="modular-product-nav shell" aria-label="產品牌號導航"><button type="button" className="modular-product-back" onClick={goBack}>← 返回上一頁</button><div>{products.map(item => <a href={`/products/${item.slug}/`} className={item.slug === product.slug ? "active" : ""} aria-current={item.slug === product.slug ? "page" : undefined} key={item.slug}>{item.name}</a>)}<a href="/products/" className="modular-product-more">更多產品 ↗</a></div></nav>
    <Ius4065ReferenceFrame />
    <div className="shell"><OtherProductsCarousel currentSlug={product.slug} locale={params?.locale} /></div>
    <GlobalInquiryFooter />
  </main>;
  return <main className="modular-product-page">
    <SiteHeader />
    <nav className="modular-product-nav shell" aria-label="產品牌號導航">
      <button type="button" className="modular-product-back" onClick={goBack}>← 返回上一頁</button>
      <div>{products.map(item => <a
        href={`/products/${item.slug}/`}
        className={item.slug === product.slug ? "active" : ""}
        aria-current={item.slug === product.slug ? "page" : undefined}
        key={item.slug}
      >{item.name}</a>)}<a href="/products/" className="modular-product-more">更多產品 ↗</a></div>
    </nav>
    <article className="modular-product shell">
      <header className="modular-product-hero">
        <img className="modular-product-hero-image" src={product.image} alt={product.imageAlt} />
        <div className="modular-product-intro">
          <span>{product.family} / PRODUCT GRADE</span>
          <h1>{product.name}</h1>
          <h2>{product.title}</h2>
          <p>{product.summary}</p>
          {product.specs.length > 0 && <dl className="modular-product-specs">
            {product.specs.map(spec => <div key={spec.label}><dt>{spec.label}</dt><dd>{spec.value}</dd></div>)}
          </dl>}
          <a href="/contact/#inquiry" className="modular-product-cta">諮詢產品與索取樣品 <b aria-hidden="true">↗</b></a>
        </div>
      </header>
      <div className="product-modules modular-product-longform" aria-label="產品資訊">
        {product.modules.length > 0
          ? product.modules.map(module => <DetailModule module={module} key={module.id} />)
          : <div className="modular-product-placeholder"><h2>產品資訊</h2><p>{product.summary}</p></div>}
      </div>
      <section className="modular-product-extra" aria-label="產品詳情">
        {product.detailContent?.length ? <div className="modular-product-extra-content">
          {product.detailContent.map((block, index) => block.type === "paragraph"
            ? <p key={`${block.type}-${index}`}>{block.text}</p>
            : <figure key={`${block.type}-${index}`}><img src={block.src} alt={block.alt} loading="lazy" />{block.caption && <figcaption>{block.caption}</figcaption>}</figure>)}
        </div> : <div className="modular-product-extra-empty"><p>更多產品詳情將陸續更新。</p></div>}
      </section>
      <OtherProductsCarousel currentSlug={product.slug} locale={params?.locale} />
    </article>
    <GlobalInquiryFooter />
  </main>;
}
