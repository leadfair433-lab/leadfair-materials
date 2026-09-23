"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import SiteHeader from "../../SiteHeader";
import GlobalInquiryFooter from "../../GlobalInquiryFooter";
import { productBySlug, products, type ProductGalleryImage, type ProductModule } from "../../content/products";
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

function ProductGallery({ images, name }: { images: ProductGalleryImage[]; name: string }) {
  const [active, setActive] = useState(0);
  const [firstVisible, setFirstVisible] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const current = images[active];
  const visibleCount = 5;
  const maxFirstVisible = Math.max(0, images.length - visibleCount);
  const select = (index: number) => {
    setActive(index);
    setFirstVisible(first => Math.min(maxFirstVisible, Math.max(index - visibleCount + 1, Math.min(first, index))));
  };
  const move = (direction: number) => select((active + direction + images.length) % images.length);
  return <div className="modular-product-gallery">
    <button className="modular-gallery-main" type="button" onClick={() => dialog.current?.showModal()} aria-label={`放大查看${current.caption}`}>
      <img src={current.src} alt={current.alt} fetchPriority={active === 0 ? "high" : undefined} />
      <span className="modular-gallery-zoom" aria-hidden="true">放大查看 ↗</span>
    </button>
    {images.length > 1 && <div className="modular-gallery-strip" aria-label={`${name} 圖片選擇`}>
      <button className="modular-gallery-strip-arrow" type="button" onClick={() => setFirstVisible(first => Math.max(0, first - 1))} disabled={firstVisible === 0} aria-label="向左瀏覽圖片">←</button>
      <div className="modular-gallery-thumbnails">
        {images.slice(firstVisible, firstVisible + visibleCount).map((image, offset) => {
          const index = firstVisible + offset;
          return <button type="button" key={image.src} onClick={() => select(index)} aria-label={`查看第 ${index + 1} 張：${image.caption}`} aria-pressed={index === active}>
            <img src={image.src} alt="" loading={index < 3 ? "eager" : "lazy"} />
            <span>{String(index + 1).padStart(2, "0")}</span>
          </button>;
        })}
      </div>
      <button className="modular-gallery-strip-arrow" type="button" onClick={() => setFirstVisible(first => Math.min(maxFirstVisible, first + 1))} disabled={firstVisible === maxFirstVisible} aria-label="向右瀏覽圖片">→</button>
    </div>}
    <p className="modular-gallery-caption"><span>{String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span>{current.caption}</p>
    <dialog ref={dialog} className="modular-gallery-dialog" aria-label={`${name} 圖片放大預覽`} onClick={event => { if (event.target === dialog.current) dialog.current.close(); }} onKeyDown={event => { if (event.key === "ArrowLeft") move(-1); if (event.key === "ArrowRight") move(1); }}>
      <div className="modular-gallery-dialog-inner">
        <button className="modular-gallery-close" type="button" onClick={() => dialog.current?.close()} aria-label="關閉圖片預覽">×</button>
        <img src={current.src} alt={current.alt} />
        <div className="modular-gallery-dialog-controls">
          {images.length > 1 && <button type="button" onClick={() => move(-1)} aria-label="上一張圖片">←</button>}
          <p>{current.caption} <span>{active + 1} / {images.length}</span></p>
          {images.length > 1 && <button type="button" onClick={() => move(1)} aria-label="下一張圖片">→</button>}
        </div>
      </div>
    </dialog>
  </div>;
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
  const tabIds = ["product-overview", "product-technical", "product-comparison"] as const;
  const [activeTab, setActiveTab] = useState<(typeof tabIds)[number]>("product-overview");
  useEffect(() => {
    const syncTabToHash = () => {
      const hash = window.location.hash.slice(1);
      if (tabIds.some(id => id === hash)) setActiveTab(hash as (typeof tabIds)[number]);
    };
    syncTabToHash();
    window.addEventListener("hashchange", syncTabToHash);
    return () => window.removeEventListener("hashchange", syncTabToHash);
  }, []);
  const selectTab = (id: (typeof tabIds)[number]) => {
    setActiveTab(id);
    window.history.replaceState(null, "", `#${id}`);
  };
  const goBack = () => {
    if (window.history.length > 1 && document.referrer && new URL(document.referrer).origin === window.location.origin) window.history.back();
    else window.location.assign("/products/");
  };
  const onTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const next = event.key === "ArrowRight" ? (index + 1) % tabIds.length
      : event.key === "ArrowLeft" ? (index - 1 + tabIds.length) % tabIds.length
      : event.key === "Home" ? 0 : event.key === "End" ? tabIds.length - 1 : -1;
    if (next < 0) return;
    event.preventDefault();
    selectTab(tabIds[next]);
    document.getElementById(`tab-${tabIds[next]}`)?.focus();
  };
  const gallery = product.gallery || [{ src: product.image, alt: product.imageAlt, caption: product.name }];
  const moduleById = (id: string) => product.modules.find(module => module.id === id);
  const overviewModules = isIus4065
    ? [moduleById("why-ius"), moduleById("heat-photo-compare"), moduleById("advantages")].filter((module): module is ProductModule => Boolean(module))
    : product.modules.filter(module => module.type === "text" || module.type === "features" || module.type === "imageCompare");
  const technicalModules = isIus4065
    ? [moduleById("performance")].filter((module): module is ProductModule => Boolean(module))
    : product.modules.filter(module => module.type === "table" || module.type === "download");
  const additionalModules = isIus4065
    ? [moduleById("problem-solution")].filter((module): module is ProductModule => Boolean(module))
    : product.modules.filter(module => module.type === "list" || module.type === "faq" || module.type === "compare");
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
        <ProductGallery images={gallery} name={product.name} />
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
      <div className="modular-product-simple">
        <div className="modular-product-section-nav" role="tablist" aria-label="產品資訊">
          {tabIds.map((id, index) => <button key={id} type="button" role="tab" id={`tab-${id}`} aria-controls={id} aria-selected={activeTab === id} tabIndex={activeTab === id ? 0 : -1} onClick={() => selectTab(id)} onKeyDown={event => onTabKeyDown(event, index)}>{["產品亮點", "技術資料", isIus4065 ? "材料比較" : "應用資訊"][index]}</button>)}
        </div>
        {activeTab === "product-overview" && <section className="modular-product-info-group" id="product-overview" role="tabpanel" aria-labelledby="tab-product-overview" tabIndex={0}>
          <div className="modular-product-group-content">{overviewModules.length > 0
            ? overviewModules.map(module => <DetailModule module={module} key={module.id} />)
            : <div className="modular-product-placeholder"><h2>產品亮點</h2><p>{product.summary}</p></div>}</div>
        </section>}
        {activeTab === "product-technical" && <section className="modular-product-info-group" id="product-technical" role="tabpanel" aria-labelledby="tab-product-technical" tabIndex={0}>
          <div className="modular-product-group-content">{technicalModules.length > 0
            ? technicalModules.map(module => <DetailModule module={module} key={module.id} />)
            : <div className="modular-product-placeholder"><h2>技術資料</h2><p>完整技術資料持續整理中。如需確認材料物性與加工條件，請聯絡材料工程師。</p></div>}</div>
        </section>}
        {activeTab === "product-comparison" && <section className="modular-product-info-group" id="product-comparison" role="tabpanel" aria-labelledby="tab-product-comparison" tabIndex={0}>
          <div className="modular-product-group-content">{additionalModules.length > 0
            ? additionalModules.map(module => <DetailModule module={module} key={module.id} />)
            : <div className="modular-product-placeholder"><h2>應用與選材</h2><p>可提供產品用途與加工條件，由材料工程師協助選材、配方調整及試產驗證。</p></div>}</div>
        </section>}
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
