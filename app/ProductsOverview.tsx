import SiteHeader from "./SiteHeader";
import GlobalInquiryFooter from "./GlobalInquiryFooter";

const products = [
  {slug:"ius-4065", name:"IUS-4065", family:"高耐熱柔軟 TPE", title:"超柔軟・更高熔點・穩定加工", text:"兼顧柔軟觸感、尺寸穩定與耐熱表現，適合對舒適性與製程可靠性要求較高的產品。", image:"/images/ius-4065-white-pellets-v4-scattered.png", tags:["Shore A 40","≈ 64°C","高尺寸穩定"]},
  {slug:"lf-et78a", name:"LF-ET78A", family:"高分散型 TPE", title:"高延伸・低比重・良好回彈", text:"適用射出、押出與發泡製程，兼具高延伸、撕裂強度與輕量化表現。", image:"/images/lf-et78a-product.png", tags:["Shore A 78","比重 0.87","延伸率 570%"]},
  {slug:"lf-hr53a", name:"LF-HR53A", family:"高回彈 TPE", title:"柔韌耐磨・回彈穩定", text:"面向鞋材與緩衝應用，提供柔韌性、耐磨性與穩定回彈的平衡方案。", image:"/images/application-insole.png", tags:["Shore A 53","比重 0.89","良好回彈"]},
  {slug:"gte-8030", name:"GTE-8030", family:"生質 TPE", title:"生質含量・輕量高反彈", text:"含 30% 生質成分，適合發泡鞋材、鞋中底、鞋墊及各類緩衝材料。", image:"/images/application-midsole.png", tags:["生質 30%","密度 0.91","反彈率 51%"]},
  {slug:"gte-8075", name:"GTE-8075", family:"客製材料牌號", title:"依應用條件進行材料匹配", text:"完整技術資料持續整理中，可先提供產品用途與加工條件，由工程師協助選材。", image:"/images/application-footwear-v2.png", tags:["材料選型","配方調整","試產驗證"]},
];

const applications = [
  ["01","鞋材與大底","耐磨、止滑與彎折需求","/images/application-footwear.png"],
  ["02","中底與鞋墊","輕量、回彈與緩衝表現","/images/application-midsole.png"],
  ["03","運動護具","舒適包覆與衝擊吸收","/images/application-protective-gear.png"],
];

export default function ProductsOverview(){return <main className="products-page">
  <SiteHeader/>
  <section className="products-hero shell">
    <div className="products-hero-copy"><span>PRODUCT PORTFOLIO / 產品總覽</span><h1>從材料牌號開始，<br/>找到適合產品的性能組合。</h1><p>依硬度、密度、回彈、耐熱與加工方式比較現有 TPE 牌號；若規格尚未確定，也可直接交由材料工程師協助選型。</p><a href="#product-list">查看全部牌號 <b>↓</b></a></div>
    <div className="products-hero-visual"><img src="/images/ius-4065-white-pellets-v4-scattered.png" alt="透明 TPE 材料顆粒"/><div><b>5</b><span>現有產品牌號<small>支援客製配方開發</small></span></div></div>
  </section>
  <section className="products-catalog shell" id="product-list">
    <header><div><span>ALL PRODUCT GRADES</span><h2>產品牌號</h2></div><p>點選牌號查看完整物性、應用優勢與技術資料。</p></header>
    <div className="products-grid">{products.map((product,index)=><a className={`overview-product-card${index===0?" featured":""}`} href={`/products/${product.slug}/`} key={product.slug}>
      <div className="overview-product-image"><img src={product.image} alt={`${product.name} ${product.family}`}/><span>{String(index+1).padStart(2,"0")}</span></div>
      <div className="overview-product-copy"><small>{product.family}</small><h3>{product.name}</h3><h4>{product.title}</h4><p>{product.text}</p><div>{product.tags.map(tag=><em key={tag}>{tag}</em>)}</div><strong>查看產品詳情 <b>↗</b></strong></div>
    </a>)}</div>
  </section>
  <section className="products-applications"><div className="shell"><header><span>APPLICATION DIRECTION</span><h2>按應用方向選材</h2><p>從終端產品出發，快速縮小材料選擇範圍。</p></header><div>{applications.map(([no,title,text,image])=><article key={no}><img src={image} alt={title}/><b>{no}</b><h3>{title}</h3><p>{text}</p><a href="/contact/#inquiry">諮詢適用材料 ↗</a></article>)}</div></div></section>
  <section className="product-selection shell"><div><span>MATERIAL SELECTION SUPPORT</span><h2>不確定該選哪個牌號？</h2><p>提供產品用途、加工方式與目標物性，材料工程師將結合性能、成本與量產條件給出建議。</p></div><a href="/contact/#inquiry">提交選材需求 <b>↗</b></a></section>
  <GlobalInquiryFooter/>
</main>}
