"use client";

import { useState } from "react";

const slides = [
  "/images/company/generated/campus-hero.png",
  "/images/company/generated/taiwan-entrance.png",
  "/images/company/generated/history-campus-grid.png",
];

const facts = [
  ["building", "1979", "公司成立"],
  ["gear", "46+", "年產業經驗"],
  ["chart", "1,000W+", "年產量超過1千萬"],
  ["factory", "110,000m²", "大型廠區"],
];

const history = [
  ["1979", "公司成立", "公司成立於臺灣彰化，主要生產各類塑膠鞋材，包括 ABS 射出鞋跟、TPR、TR、STR、PCU、PVC 及 PU 發泡鞋底。", "history-a"],
  ["1991", "廣州麗暉塑膠有限公司", "成立中國大陸營運中心，主要生產功能性鞋材、鞋底相關材料及電子類塑膠製品。", "history-b"],
  ["1997", "廣州番禺東泰塑膠有限公司", "主要生產 SEBS、TPR（SBS）等橡塑膠原料，並提供模具開發與製造服務。", "history-c"],
  ["2006", "廣州富勝塑膠有限公司", "提供產品開發、橡塑膠材料生產、模具加工製造、注塑生產及產品組裝等綜合服務，滿足客戶的客製化需求。", "history-d"],
];

const ffItems = ["原料處理設備", "材料混煉設備", "擠出及成型設備", "實驗生產環境", "材料測試儀器"];
const lfItems = ["實驗操作台", "材料檢測設備", "力學性能測試設備", "恆溫及環境測試設備", "綜合分析儀器"];

function FactIcon({ type }: { type: string }) {
  if (type === "gear") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 8.2A3.8 3.8 0 1 0 12 15.8 3.8 3.8 0 0 0 12 8.2Zm8 5.1v-2.6l-2.1-.7a7.7 7.7 0 0 0-.8-1.9l1-2-1.8-1.8-2 1a7.7 7.7 0 0 0-1.9-.8L11.7 2H9.2l-.7 2.1a7.7 7.7 0 0 0-1.9.8l-2-1-1.8 1.8 1 2A7.7 7.7 0 0 0 3 9.6l-2.1.7v2.6l2.1.7c.2.7.4 1.3.8 1.9l-1 2 1.8 1.8 2-1c.6.4 1.2.6 1.9.8l.7 2.1h2.6l.7-2.1c.7-.2 1.3-.4 1.9-.8l2 1 1.8-1.8-1-2c.4-.6.6-1.2.8-1.9Z"/></svg>;
  if (type === "chart") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 20h18v2H1V2h2v18Zm3-2v-7h3v7H6Zm5 0V6h3v12h-3Zm5 0V2h3v16h-3Z"/></svg>;
  if (type === "factory") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 22V9l7-4v4l6-4v4l7-4v17H2Zm4-3h3v-3H6v3Zm5 0h3v-3h-3v3Zm5 0h3v-3h-3v3ZM17 2h4l1 7-5 3V2Z"/></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 22V7l9-5 9 5v15h-7v-6h-4v6H3Zm4-3h2v-3H7v3Zm0-6h2v-3H7v3Zm8 0h2v-3h-2v3Zm0 6h2v-3h-2v3Z"/></svg>;
}

export default function CompanySection() {
  const [slide, setSlide] = useState(0);
  const changeSlide = (direction: number) => setSlide((current) => (current + direction + slides.length) % slides.length);
  return <section className="profile-page" id="company"><div className="shell profile-shell">
    <section className="profile-hero" id="company-overview" style={{backgroundImage:`linear-gradient(90deg,rgba(4,28,66,.96) 0%,rgba(4,45,91,.78) 45%,rgba(4,29,62,.18) 82%),url(${slides[slide]})`}}>
      <div className="profile-hero-copy"><span>COMPANY PROFILE / 企業介紹</span><h1>深耕材料與製造，<br/>持續創造產品價值</h1><i aria-hidden="true"/><p>以專業的材料技術、穩定的製造能力與持續創新的精神，為全球客戶提供高品質的塑膠材料與客製化解決方案，共同邁向更美好的未來。</p><a href="#company-history">探索企業實力 <b>↗</b></a></div>
      <div className="profile-keywords">專業・創新・品質・永續</div>
      <div className="profile-carousel" aria-label="企業圖片輪播控制"><b>{String(slide + 1).padStart(2,"0")}</b><span>/ 03</span><button onClick={() => changeSlide(-1)} aria-label="上一張">←</button><button onClick={() => changeSlide(1)} aria-label="下一張">→</button></div>
    </section>
    <section className="profile-facts" aria-label="企業數據">{facts.map(([icon,value,label]) => <article key={label}><span><FactIcon type={icon}/></span><div><b>{value}</b><small>{label}</small></div></article>)}</section>
    <section className="profile-about" id="company-story"><div className="profile-copy"><span>ABOUT US</span><h2>臺灣峰暉塑膠工業股份有限公司</h2><p>臺灣峰暉塑膠工業股份有限公司於1979年成立於臺灣彰化縣，主要生產經營各類塑膠鞋材，包括各種 ABS、IPS、PC 射出鞋跟、TPR、PVC 及 PU 發泡鞋底，並持續投入材料研發與製程優化，以穩定的品質滿足全球客戶需求。</p><p>集團陸續於中國大陸設立多家生產與營運公司。歷經四十多年發展，秉持「追求卓越、止於至善」的經營理念，致力於創新、服務與永續經營，為客戶創造長期價值。</p><a href="#company-history">了解更多 <b>→</b></a></div><figure><img src="/images/company/generated/taiwan-entrance.png" alt="臺灣峰暉塑膠工業廠區正門"/><figcaption>「以材料創新推動產業進步，<br/>與客戶共創永續未來。」</figcaption></figure></section>
    <section className="profile-history" id="company-history"><header><div><span>OUR HISTORY</span><h2>歷史沿革</h2></div><p>穩健發展・持續創新</p></header><div className="profile-history-grid">{history.map(([year,title,text,imageClass]) => <article key={year}><div><b>{year}</b><h3>{title}</h3></div><div className={`history-image ${imageClass}`} role="img" aria-label={`${year} ${title}廠區`}/><p>{text}</p></article>)}</div></section>
    <section className="profile-labs" id="company-laboratory"><header><div><span>LABORATORY ENVIRONMENT</span><h2>實驗室環境</h2></div><p>專業設備・嚴格把關</p></header><div className="profile-lab-grid">
      <article><div className="lab-photo ff-lab" role="img" aria-label="峰暉實驗室材料開發與試產設備"/><div className="lab-content"><span>峰暉實驗室 / FF Laboratory</span><h3>從配方到試產，完整驗證材料表現</h3><ul>{ffItems.map(item=><li key={item}>{item}</li>)}</ul><p>完整的材料開發與測試設備，確保產品品質與穩定性。</p></div></article>
      <article><div className="lab-photo lf-lab" role="img" aria-label="麗暉實驗室材料檢測與分析設備"/><div className="lab-content"><span>麗暉實驗室 / LF Laboratory</span><h3>以精密檢測，支援客製化研發</h3><ul>{lfItems.map(item=><li key={item}>{item}</li>)}</ul><p>具備專業的檢測與分析能力，支援客製化研發與應用需求。</p></div></article>
    </div></section>
  </div></section>;
}
