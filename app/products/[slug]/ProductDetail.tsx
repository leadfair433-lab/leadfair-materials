"use client";

import { useParams } from "next/navigation";
import SiteHeader from "../../SiteHeader";
import GlobalInquiryFooter from "../../GlobalInquiryFooter";

const products = {
  "ius-4065": { name: "IUS-4065", title: "超柔軟 · 更高熔點 · 更穩定加工", image: "/images/ius-4065-white-pellets-v4-scattered.png", description: "專為兼顧卓越柔軟性與更高耐熱效能而研發。IUS–4065 能夠滿足對舒適性、尺寸穩定性及製造可靠性有更高要求的產品，是高效能發泡及注塑應用的理想材料解決方案。", specs: [["硬度","Shore A 40"],["熔點","≈ 64°C"],["熱收縮性","優異"],["尺寸穩定性","優異"],["加工穩定性","優異"]] },
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
  const isIus = key === "ius-4065";
  const isLf = key === "lf-et78a";
  return <main className="product-page">
    <SiteHeader />
    <nav className="product-index shell" aria-label="產品牌號導航"><span>PRODUCT GRADES</span><div>{slugs.map(slug=><a className={slug===key?"active":""} href={`/products/${slug}`} key={slug}>{products[slug].name}</a>)}</div></nav>
    <section className={`product shell ${isLf?"product-lf":""}`}>
      <div className="product-head"><div className="product-visual"><div className="product-photo"><img src={product.image} alt={`${product.name} 產品材料`}/></div><span>{product.specs[0]?.[1] || "TPE MATERIAL"}</span><small>{product.name} / PRODUCT GRADE</small></div><div className="product-copy"><span className="eyebrow blue">FEATURED GRADE · {product.name}</span><h2>{product.name}<br/>{product.title}</h2><p>{product.description}</p>{product.specs.length>0&&<div className="specs">{product.specs.map(x=><div key={x[0]}><small>{x[0]}</small><b>{x[1]}</b></div>)}</div>}<a className="product-action" href="/#inquiry">獲取樣品 ↗</a></div></div>
      {isIus&&<Ius4065Details/>}
      {isLf&&<><div className="lf-story"><div><span className="detail-label">APPLICATION REQUIREMENTS</span><h3>彈性發泡材料的真實應用需求</h3><ul className="lf-needs"><li>兼具高強韌與耐用性</li><li>滿足輕量化與防震表現</li><li>材料效能穩定、批次一致</li><li>保持良好硬度與尺寸穩定</li><li>適用於射出、押出及壓延加工</li></ul></div><div><span className="detail-label">VALUE OF LF-ET78A</span><h3>從材料效能，轉化為產品價值</h3><div className="lf-value-grid">{[["01","高延伸","提升製品耐用度"],["02","高撕裂強度","降低破損風險"],["03","輕量低密度","有利產品減重"],["04","良好回彈","提升使用舒適感"],["05","加工適應性","適配多種成型方式"]].map(x=><article className="lf-value-card" key={x[0]}><b>{x[0]}</b><h4>{x[1]}</h4><p>{x[2]}</p></article>)}</div></div></div><div className="lf-data"><DataTable title="原料基本特性" rows={[["外觀","N/A","顆粒"],["顏色","N/A","半透明"],["硬度","ASTM D2240","Shore A 78"],["熔融指數","ASTM D1238","2 g/10min"],["比重","ASTM D792","0.87"],["拉力","ASTM D412","85 kgf/cm²"],["延伸率","ASTM D412","570%"],["撕裂強度","ASTM D624","62 kgf/cm"],["熔點","DSC","69°C"]]}/><DataTable title="發泡後物性" rows={[["硬度 Asker C","ASTM D2240","50"],["密度","ASTM D792","0.1919"],["拉力 N/mm²","ASTM D638","4.6"],["延伸率","ASTM D638","446%"],["撕裂強度 N/mm","ASTM D624","5.65"],["回彈度","ASTM D3574","62"],["收縮率","60°C / 120 分鐘","1%"],["壓縮變形","35°C / 6 小時","20%"],["倍率 E/R","—","190%"],["壓縮比 CR","—","1.9"]]}/></div><div className="lf-advantages">{["高回彈","輕量低密度","高柔韌性","尺寸穩定","加工通用性","適合鞋材與發泡製品"].map((x,i)=><div key={x}><b>{String(i+1).padStart(2,"0")}</b><span>{x}</span></div>)}</div></>}
    </section>
    <GlobalInquiryFooter />
  </main>;
}

function Ius4065Details() { return <>
  <div className="product-detail">
    <div className="pain-panel"><span className="detail-label">THE PROBLEM WE SOLVE</span><h3>傳統低熔點材料的痛點，<br/>IUS–4065 一次系統解決</h3><p className="pain-subtitle">傳統低熔點材料在加工及使用過程中常出現多種問題，而 IUS–4065 能有效解決這些痛點。</p><div className="pain-compare"><ul className="before"><strong>傳統材料</strong><li>二次熱收縮導致翹曲變形</li><li>耐熱性不足，產品易變形</li><li>尺寸穩定性差、公差大</li><li>加工波動大、次品率高</li><li>外觀不一致，影響品質</li></ul><span className="compare-arrow">→</span><ul className="after"><strong>IUS–4065</strong><li>更低熱收縮，減少翹曲</li><li>更高熔點，耐熱性更好</li><li>尺寸穩定，公差更可控</li><li>加工穩定，效率更高</li><li>外觀一致，品質穩定</li></ul></div></div>
    <div className="why-panel"><span className="detail-label">WHY IUS–4065</span><h3>為什麼選擇 IUS–4065？</h3><p>許多超柔軟配方會採用 TAFMER 或 ENGAGE 系列 POE 來實現低硬度。然而，這類體系通常存在熱收縮率高、易變形等問題。IUS–4065 成功兼顧超柔軟硬度、更高熔點與更穩定加工效能，讓產品同時擁有舒適觸感與卓越製造表現。</p><div className="heat-test"><div className="fail"><small>低熔點材料<br/>DF640 / ENGAGE 8842</small><div className="sample-image warped"><i/><i/></div><b>&lt; 50°C</b><em>容易發生二次熱收縮、<br/>翹曲及外觀不一致</em></div><span>加工溫度<br/><strong>&gt;50°C →</strong><i>層壓 / 後加工溫度</i></span><div className="pass"><small>IUS–4065（約 64°C）</small><div className="sample-image stable"><i/></div><b>≈ 64°C</b><em>✓ 尺寸穩定性優異<br/>✓ 產品品質一致<br/>✓ 良率更高</em></div></div></div>
  </div>
  <div className="performance"><div><span className="detail-label">PERFORMANCE COMPARISON</span><h3>材料效能對比</h3><div className="table-wrap"><table><thead><tr><th>效能 / Property</th><th>測試標準</th><th>DF640</th><th>ENGAGE 8842</th><th>IUS–4065</th></tr></thead><tbody><tr><td>硬度 Shore A</td><td>ASTM D2240</td><td>54–56</td><td>54–56</td><td>40</td></tr><tr><td>熔點 °C</td><td>DSC</td><td>&lt; 50</td><td>&lt; 50</td><td>≈ 64</td></tr><tr><td>熱收縮風險</td><td>內部測試</td><td className="bad">高</td><td className="bad">高</td><td className="good">低</td></tr><tr><td>尺寸穩定性</td><td>內部測試</td><td className="bad">低</td><td className="bad">低</td><td className="good">高</td></tr><tr><td>柔軟觸感</td><td>內部評估</td><td className="rating-bad">★★★★☆</td><td className="rating-bad">★★★★☆</td><td className="good">★★★★★</td></tr><tr><td>加工穩定性</td><td>內部評估</td><td className="rating-bad">★★★☆☆</td><td className="rating-bad">★★★☆☆</td><td className="good">★★★★☆</td></tr></tbody></table></div></div><div className="advantages"><span className="detail-label">PRODUCT ADVANTAGES</span><h3>五項核心優勢</h3>{[["01","超柔軟觸感","Shore A 40，觸感舒適細膩"],["02","更高熔點","約 64°C，降低二次熱收縮風險"],["03","卓越尺寸穩定","減少翹曲，尺寸更可控"],["04","更高良率","加工視窗穩定，減少次品"],["05","適用高效能應用","滿足更高耐熱與穩定性要求"]].map(x=><div className="advantage" key={x[0]}><b>{x[0]}</b><h4>{x[1]}</h4><p>{x[2]}</p></div>)}</div></div>
</> }

function DataTable({title,rows}:{title:string;rows:string[][]}) { return <div><span className="detail-label">TECHNICAL PROPERTIES</span><h3>{title}</h3><div className="table-wrap"><table><thead><tr><th>專案</th><th>測試方法</th><th>數值</th></tr></thead><tbody>{rows.map(r=><tr key={r[0]}>{r.map(c=><td key={c}>{c}</td>)}</tr>)}</tbody></table></div></div> }
