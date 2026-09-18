import SiteHeader from "./SiteHeader";
import GlobalInquiryFooter from "./GlobalInquiryFooter";
import { products } from "./content/products";

const applications = [
  ["01", "鞋材與大底", "耐磨、止滑與彎折需求", "/images/application-footwear-fast.jpg"],
  ["02", "中底與鞋墊", "輕量、回彈與緩衝表現", "/images/application-midsole-fast.jpg"],
  ["03", "運動護具", "舒適包覆與衝擊吸收", "/images/application-protective-gear-fast.jpg"],
];

export default function ProductsOverview() {
  const featuredDatasheet = products.find(product => product.featured)?.modules.find(module => module.type === "download");
  return <main className="products-page">
    <SiteHeader />
    <section className="products-hero shell">
      <div className="products-hero-copy">
        <span>PRODUCT PORTFOLIO / 產品總覽</span>
        <h1>從材料牌號開始，<br />找到適合產品的性能組合。</h1>
        <p>依硬度、密度、回彈、耐熱與加工方式比較現有 TPE 牌號；若規格尚未確定，也可直接交由材料工程師協助選型。</p>
        <a href="#product-list">查看全部牌號 <b>↓</b></a>
      </div>
      <div className="products-hero-visual">
        <img src={products[0].image} alt="透明 TPE 材料顆粒" />
      </div>
    </section>
    <section className="products-catalog shell" id="product-list">
      <header><div><span>ALL PRODUCT GRADES</span><h2>產品牌號</h2></div><p>點選牌號查看完整物性、應用優勢與技術資料。</p></header>
      <div className="products-grid">{products.map((product, index) => product.featured ? <article className="overview-product-card featured" key={product.slug}>
        <a className="overview-product-image" href={`/products/${product.slug}/`} aria-label={`查看 ${product.name} 產品詳情`}><img src={product.image} alt={product.imageAlt} loading="eager" /><span>{String(index + 1).padStart(2, "0")}</span></a>
        <div className="overview-product-copy">
          <small>{product.family}</small><h3>{product.name}</h3><h4>{product.title}</h4><p>{product.summary}</p>
          <p className="overview-featured-detail">以 Shore A 40 的柔軟觸感兼顧約 64°C 熔點，降低二次熱收縮與翹曲風險；穩定的加工表現有助於維持產品尺寸與外觀一致。</p>
          <dl className="overview-featured-specs">{product.specs.map(spec => <div key={spec.label}><dt>{spec.label}</dt><dd>{spec.value}</dd></div>)}</dl>
          <div className="overview-featured-actions"><a href={`/products/${product.slug}/`}>查看產品詳情 <span aria-hidden="true">↗</span></a>{featuredDatasheet?.type === "download" && <a href={featuredDatasheet.href} download={featuredDatasheet.filename}>下載技術資料表 <span aria-hidden="true">↓</span></a>}</div>
        </div>
      </article> : <a
        className="home-product-card"
        href={`/products/${product.slug}/`}
        key={product.slug}
        aria-label={`查看 ${product.name} 產品詳情`}
      >
        <div className="home-product-card-image"><img src={product.image} alt={product.imageAlt} loading={index === 0 ? "eager" : "lazy"} /><span>{String(index + 1).padStart(2, "0")}</span></div>
        <div className="home-product-card-copy">
          <small>{product.family}</small><h3>{product.name}</h3><strong>{product.title}</strong><p>{product.summary}</p>
          {product.specs.length > 0 ? <dl className="home-product-specs">{product.specs.map(spec => <div key={spec.label}><dt>{spec.label}</dt><dd>{spec.value}</dd></div>)}</dl> : <div className="overview-product-tags">{product.tags.map(tag => <span key={tag}>{tag}</span>)}</div>}
          <span className="home-product-link">查看產品詳情 <b aria-hidden="true">↗</b></span>
        </div>
      </a>)}</div>
    </section>
    <section className="products-applications"><div className="shell">
      <header><span>APPLICATION DIRECTION</span><h2>按應用方向選材</h2><p>從終端產品出發，快速縮小材料選擇範圍。</p></header>
      <div>{applications.map(([no, title, text, image]) => <article key={no}>
        <img src={image} alt={title} /><b>{no}</b><h3>{title}</h3><p>{text}</p><a href="/contact/#inquiry">諮詢適用材料 ↗</a>
      </article>)}</div>
    </div></section>
    <section className="product-selection shell">
      <div><span>MATERIAL SELECTION SUPPORT</span><h2>不確定該選哪個牌號？</h2><p>提供產品用途、加工方式與目標物性，材料工程師將結合性能、成本與量產條件給出建議。</p></div>
      <a href="/contact/#inquiry">提交選材需求 <b>↗</b></a>
    </section>
    <GlobalInquiryFooter />
  </main>;
}
