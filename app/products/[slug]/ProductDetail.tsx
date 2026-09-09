"use client";

import { useParams } from "next/navigation";
import LanguageSwitcher from "../../LanguageSwitcher";

const products = {
  "ius-4065": { name: "IUS-4065", title: "超柔软 · 更高熔点 · 更稳定加工", image: "/images/ius-4065-white-pellets-v4-scattered.png", description: "专为兼顾卓越柔软性与更高耐热性能而研发，适用于对舒适性、尺寸稳定性与制造可靠性有更高要求的产品。", specs: [["硬度","Shore A 40"],["熔点","≈ 64°C"],["热收缩性","优异"],["尺寸稳定性","优异"],["加工稳定性","优异"]] },
  "lf-et78a": { name: "LF-ET78A", title: "高分散型 TPE 弹性材料", image: "/images/lf-et78a-product.png", description: "适用于射出、押出及发泡应用，具备高延伸、良好撕裂强度、低比重与优秀回弹特性，可兼顾应用功能与制造成本。", specs: [["硬度","Shore A 78"],["熔融指数","2 g/10min"],["比重","0.87"],["延伸率","570%"],["撕裂强度","62 kgf/cm"],["熔点","69°C"]] },
  "lf-hr53a": { name: "LF-HR53A", title: "高分散型 TPE 弹性材料", image: "/images/lf-et78a-product.png", description: "适用于射出、押出及发泡应用，具备高延伸、良好耐磨强度、低比重与良好回弹弹性。", specs: [["硬度","Shore A 53"],["熔融指数","0.32 g/10min"],["比重","0.89"],["拉力","37.3 kgf/cm²"],["延伸率","360%"],["撕裂强度","38 kgf/cm"]] },
  "gte-8030": { name: "GTE-8030", title: "生质高反弹 TPE 弹性材料", image: "/images/lf-et78a-product.png", description: "生质含量 30%，与 EVA、POE 具有良好相容性，适用于发泡鞋材、鞋中底、鞋垫及各类缓冲材料。", specs: [["生质含量","30%"],["硬度","Shore A 72"],["熔融指数","4.7 g/10min"],["密度","0.91 g/cm³"],["反弹率","51%"],["延伸率","665%"]] },
  "gte-8075": { name: "GTE-8075", title: "材料技术资料整理中", image: "/images/lf-et78a-product.png", description: "此牌号的完整参数与应用资料将在后续补充，欢迎先联系材料工程师获取选材建议。", specs: [] },
} as const;

const slugs = ["ius-4065","lf-et78a","lf-hr53a","gte-8030","gte-8075"] as const;

export default function ProductPage() {
  const params = useParams<{slug:string}>();
  const key = (params?.slug || "ius-4065") as keyof typeof products;
  const product = products[key] || products["ius-4065"];
  const isLf = key === "lf-et78a";
  return <main className="product-page">
    <header className="top shell"><a className="logo" href="/"><i>R</i><span>原料网站<small>ADVANCED MATERIALS</small></span></a><div className="localized-nav-actions"><LanguageSwitcher compact/><a className="product-back" href="/#materials">返回首页 ↗</a></div></header>
    <nav className="product-index shell" aria-label="产品牌号导航"><span>PRODUCT GRADES</span><div>{slugs.map(slug=><a className={slug===key?"active":""} href={`/products/${slug}`} key={slug}>{products[slug].name}</a>)}</div></nav>
    <section className={`product shell ${isLf?"product-lf":""}`}>
      <div className="product-head"><div className="product-visual"><div className="product-photo"><img src={product.image} alt={`${product.name} 产品材料`}/></div><span>{product.specs[0]?.[1] || "TPE MATERIAL"}</span><small>{product.name} / PRODUCT GRADE</small></div><div className="product-copy"><span className="eyebrow blue">FEATURED GRADE · {product.name}</span><h2>{product.name}<br/>{product.title}</h2><p>{product.description}</p>{product.specs.length>0&&<div className="specs">{product.specs.map(x=><div key={x[0]}><small>{x[0]}</small><b>{x[1]}</b></div>)}</div>}<a className="product-action" href="/#inquiry">获取样品 ↗</a></div></div>
      {isLf&&<><div className="lf-story"><div><span className="detail-label">APPLICATION REQUIREMENTS</span><h3>弹性发泡材料的真实应用需求</h3><ul className="lf-needs"><li>兼具高强韧与耐用性</li><li>满足轻量化与防震表现</li><li>材料性能稳定、批次一致</li><li>保持良好硬度与尺寸稳定</li><li>适用于射出、押出及压延加工</li></ul></div><div><span className="detail-label">VALUE OF LF-ET78A</span><h3>从材料性能，转化为产品价值</h3><div className="lf-value-grid">{[["01","高延伸","提升制品耐用度"],["02","高撕裂强度","降低破损风险"],["03","轻量低密度","有利产品减重"],["04","良好回弹","提升使用舒适感"],["05","加工适应性","适配多种成型方式"]].map(x=><article className="lf-value-card" key={x[0]}><b>{x[0]}</b><h4>{x[1]}</h4><p>{x[2]}</p></article>)}</div></div></div><div className="lf-data"><DataTable title="原料基本特性" rows={[["外观","N/A","颗粒"],["颜色","N/A","半透明"],["硬度","ASTM D2240","Shore A 78"],["熔融指数","ASTM D1238","2 g/10min"],["比重","ASTM D792","0.87"],["拉力","ASTM D412","85 kgf/cm²"],["延伸率","ASTM D412","570%"],["撕裂强度","ASTM D624","62 kgf/cm"],["熔点","DSC","69°C"]]}/><DataTable title="发泡后物性" rows={[["硬度 Asker C","ASTM D2240","50"],["密度","ASTM D792","0.1919"],["拉力 N/mm²","ASTM D638","4.6"],["延伸率","ASTM D638","446%"],["撕裂强度 N/mm","ASTM D624","5.65"],["回弹度","ASTM D3574","62"],["收缩率","60°C / 120 分钟","1%"],["压缩变形","35°C / 6 小时","20%"],["倍率 E/R","—","190%"],["压缩比 CR","—","1.9"]]}/></div><div className="lf-advantages">{["高回弹","轻量低密度","高柔韧性","尺寸稳定","加工通用性","适合鞋材与发泡制品"].map((x,i)=><div key={x}><b>{String(i+1).padStart(2,"0")}</b><span>{x}</span></div>)}</div></>}
    </section>
    <footer className="footer shell"><a className="logo" href="/"><i>R</i><span>原料网站<small>ADVANCED MATERIALS</small></span></a><p>Advanced thermoplastic material solutions for global manufacturing.</p></footer>
  </main>;
}

function DataTable({title,rows}:{title:string;rows:string[][]}) { return <div><span className="detail-label">TECHNICAL PROPERTIES</span><h3>{title}</h3><div className="table-wrap"><table><thead><tr><th>项目</th><th>测试方法</th><th>数值</th></tr></thead><tbody>{rows.map(r=><tr key={r[0]}>{r.map(c=><td key={c}>{c}</td>)}</tr>)}</tbody></table></div></div> }
