import { products } from "./content/products";

export default function HomeProductSection() {
  return <section className="home-products shell" id="product" aria-labelledby="home-products-title">
    <div className="home-products-heading">
      <div>
        <span>02 — PRODUCT GRADES</span>
        <h2 id="home-products-title">從產品牌號，找到適合的材料。</h2>
      </div>
      <p>選擇牌號查看完整物性、應用與技術資料。每種材料的資料依實際內容呈現。</p>
    </div>
    <div className="home-products-grid">
      {products.slice(0, 4).map((product, index) => <a
        className="home-product-card"
        href={`/products/${product.slug}/`}
        key={product.slug}
        aria-label={`查看 ${product.name} 產品詳情`}
      >
        <div className="home-product-card-image">
          <img src={product.image} alt={product.imageAlt} loading={index === 0 ? "eager" : "lazy"} />
          <span>{String(index + 1).padStart(2, "0")}</span>
        </div>
        <div className="home-product-card-copy">
          <small>{product.family}</small>
          <h3>{product.name}</h3>
          <strong>{product.title}</strong>
          <p>{product.summary}</p>
          <dl className="home-product-specs">{product.specs.map(spec => <div key={spec.label}>
            <dt>{spec.label}</dt><dd>{spec.value}</dd>
          </div>)}</dl>
          <span className="home-product-link">查看產品詳情 <b aria-hidden="true">↗</b></span>
        </div>
      </a>)}
    </div>
    <a className="home-products-all" href="/products/">查看全部產品 <span aria-hidden="true">↗</span></a>
  </section>;
}
