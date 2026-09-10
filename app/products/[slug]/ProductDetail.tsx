"use client";

import { useParams } from "next/navigation";
import SiteHeader from "../../SiteHeader";
import GlobalInquiryFooter from "../../GlobalInquiryFooter";

const products = {
  "ius-4065": { name: "IUS-4065", title: "超柔軟 · 更高熔點 · 更穩定加工", image: "/images/ius-4065-white-pellets-v4-scattered.png", description: "專為兼顧卓越柔軟性與更高耐熱效能而研發，適用於對舒適性、尺寸穩定性與製造可靠性有更高要求的產品。", specs: [["硬度","Shore A 40"],["熔點","≈ 64°C"],["熱收縮性","優異"],["尺寸穩定性","優異"],["加工穩定性","優異"]] },
  "lf-et78a": { name: "LF-ET78A", title: "高分散型 TPE 彈性材料", image: "/images/lf-et78a-product.png", description: "適用於射出、押出及發泡應用，具備高延伸、良好撕裂強度、低比重與優秀回彈特性，可兼顧應用功能與製造成本。", specs: [["硬度","Shore A 78"],["熔融指數","2 g/10min"],["比重","0.87"],["延伸率","570%"],["撕裂強度","62 kgf/cm"],["熔點","69°C"]] },
  "lf-hr53a": { name: "LF-HR53A", title: "高分散型 TPE 彈性材料", image: "/images/lf-et78a-product.png", description: "適用於射出、押出及發泡應用，具備高延伸、良好耐磨強度、低比重與良好回彈彈性。", specs: [["硬度","Shore A 53"],["熔融指數","0.32 g/10min"],["比重","0.89"],["拉力","37.3 kgf/cm²"],["延伸率","360%"],["撕裂強度","38 kgf/cm"]] },
  "gte-8030": { name: "GTE-8030", title: "生質高反彈 TPE 彈性材料", image: "/images/lf-et78a-product.png", description: "生質含量 30%，與 EVA、POE 具有良好相容性，適用於發泡鞋材、鞋中底、鞋墊及各類緩衝材料。", specs: [["生質含量","30%"],["硬度","Shore A 72"],["熔融指數","4.7 g/10min"],["密度","0.91 g/cm³"],["反彈率","51%"],["延伸率","665%"]] },
  "gte-8075": { name: "GTE-8075", title: "材料技術資料整理中", image: "/images/lf-et78a-product.png", description: "此牌號的完整引數與應用資料將在後續補充，歡迎先聯絡材料工程師獲取選材建議。", specs: [] },
} as const;

const slugs = ["ius-4065","lf-et78a","lf-hr53a","gte-8030","gte-8075"] as const;

export default function ProductPage() {
  const params = useParams<{slug:string}>();
  const key = (params?.slug || "ius-4065") as keyof typeof products;
  const product = products[key] || products["ius-4065"];
  const isLf = key === "lf-et78a";
  return <main className="product-page">
    <SiteHeader />
    <nav className="product-index shell" aria-label="產品牌號導航"><span>PRODUCT GRADES</span><div>{slugs.map(slug=><a className={slug===key?"active":""} href={`/products/${slug}`} key={slug}>{products[slug].name}</a>)}</div></nav>
    <section className={`product shell ${isLf?"product-lf":""}`}>
      <div className="product-head"><div className="product-visual"><div className="product-photo"><img src={product.image} alt={`${product.name} 產品材料`}/></div><span>{product.specs[0]?.[1] || "TPE MATERIAL"}</span><small>{product.name} / PRODUCT GRADE</small></div><div className="product-copy"><span className="eyebrow blue">FEATURED GRADE · {product.name}</span><h2>{product.name}<br/>{product.title}</h2><p>{product.description}</p>{product.specs.length>0&&<div className="specs">{product.specs.map(x=><div key={x[0]}><small>{x[0]}</small><b>{x[1]}</b></div>)}</div>}<a className="product-action" href="/#inquiry">獲取樣品 ↗</a></div></div>
      {isLf&&<><div className="lf-story"><div><span className="detail-label">APPLICATION REQUIREMENTS</span><h3>彈性發泡材料的真實應用需求</h3><ul className="lf-needs"><li>兼具高強韌與耐用性</li><li>滿足輕量化與防震表現</li><li>材料效能穩定、批次一致</li><li>保持良好硬度與尺寸穩定</li><li>適用於射出、押出及壓延加工</li></ul></div><div><span className="detail-label">VALUE OF LF-ET78A</span><h3>從材料效能，轉化為產品價值</h3><div className="lf-value-grid">{[["01","高延伸","提升製品耐用度"],["02","高撕裂強度","降低破損風險"],["03","輕量低密度","有利產品減重"],["04","良好回彈","提升使用舒適感"],["05","加工適應性","適配多種成型方式"]].map(x=><article className="lf-value-card" key={x[0]}><b>{x[0]}</b><h4>{x[1]}</h4><p>{x[2]}</p></article>)}</div></div></div><div className="lf-data"><DataTable title="原料基本特性" rows={[["外觀","N/A","顆粒"],["顏色","N/A","半透明"],["硬度","ASTM D2240","Shore A 78"],["熔融指數","ASTM D1238","2 g/10min"],["比重","ASTM D792","0.87"],["拉力","ASTM D412","85 kgf/cm²"],["延伸率","ASTM D412","570%"],["撕裂強度","ASTM D624","62 kgf/cm"],["熔點","DSC","69°C"]]}/><DataTable title="發泡後物性" rows={[["硬度 Asker C","ASTM D2240","50"],["密度","ASTM D792","0.1919"],["拉力 N/mm²","ASTM D638","4.6"],["延伸率","ASTM D638","446%"],["撕裂強度 N/mm","ASTM D624","5.65"],["回彈度","ASTM D3574","62"],["收縮率","60°C / 120 分鐘","1%"],["壓縮變形","35°C / 6 小時","20%"],["倍率 E/R","—","190%"],["壓縮比 CR","—","1.9"]]}/></div><div className="lf-advantages">{["高回彈","輕量低密度","高柔韌性","尺寸穩定","加工通用性","適合鞋材與發泡製品"].map((x,i)=><div key={x}><b>{String(i+1).padStart(2,"0")}</b><span>{x}</span></div>)}</div></>}
    </section>
    <GlobalInquiryFooter />
  </main>;
}

function DataTable({title,rows}:{title:string;rows:string[][]}) { return <div><span className="detail-label">TECHNICAL PROPERTIES</span><h3>{title}</h3><div className="table-wrap"><table><thead><tr><th>專案</th><th>測試方法</th><th>數值</th></tr></thead><tbody>{rows.map(r=><tr key={r[0]}>{r.map(c=><td key={c}>{c}</td>)}</tr>)}</tbody></table></div></div> }
