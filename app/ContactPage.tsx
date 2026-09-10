import GlobalInquiryFooter from "./GlobalInquiryFooter";

const needs = [
  ["01", "材料選型", "依應用、硬度、密度、耐熱與加工方式，快速縮小材料選擇範圍。"],
  ["02", "樣品與打樣", "取得適合驗證的材料樣品，並確認試料條件、數量與預計時程。"],
  ["03", "客製配方", "針對回彈、觸感、顏色、發泡效果與特殊規範進行配方開發。"],
  ["04", "量產與報價", "提供預計用量、交付地區與時程，以便評估產能、交期與商務條件。"],
];

export default function ContactPage(){
  return <>
    <section className="contact-hero shell"><div><span>CONTACT FOUND FAIR</span><h1>從需求開始，<br/>讓材料方案更快落地。</h1><p>告訴我們產品用途、目標效能與專案階段。材料工程師會整理關鍵問題，協助您完成選材、驗證與量產評估。</p><a href="#inquiry">提交專案需求 <b>↓</b></a></div><aside><span>首次回覆</span><b>24h</b><p>工作日內由材料工程師直接對接</p></aside></section>
    <section className="contact-needs shell"><header><span>HOW WE CAN HELP</span><h2>您目前需要哪一種協助？</h2><p>不確定材料牌號也沒有關係，先提供產品需求即可。</p></header><div>{needs.map(([no,title,text])=><article key={no}><b>{no}</b><h3>{title}</h3><p>{text}</p><a href="#inquiry">開始諮詢 ↗</a></article>)}</div></section>
    <section className="contact-prep"><div className="shell"><div><span>BEFORE YOU SUBMIT</span><h2>準備這些資訊，<br/>可加快評估速度。</h2></div><ol><li><b>01</b><span>產品與應用場景<small>用途、結構、使用環境或現有樣品</small></span></li><li><b>02</b><span>目標材料效能<small>硬度、密度、回彈、耐熱、顏色或認證</small></span></li><li><b>03</b><span>加工與量產條件<small>成型方式、預計用量、時程及交付地區</small></span></li></ol></div></section>
    <section className="contact-location shell" aria-labelledby="contact-location-title"><div className="contact-location-copy"><span>OUR LOCATION</span><h2 id="contact-location-title">公司位置</h2><h3>臺灣峰暉塑膠工業股份有限公司</h3><p><small>地址</small>臺灣省彰化縣社頭鄉永興路30之35號</p><a href="https://www.google.com/maps/dir/?api=1&destination=23.918942%2C120.580882" target="_blank" rel="noreferrer">使用 Google 地圖導航 <b>↗</b></a></div><div className="contact-map"><img src="/images/company-location-map.png" alt="臺灣峰暉塑膠工業股份有限公司所在地圖"/><span className="map-pin" aria-label="公司位置"><i>●</i></span><div className="map-location-card"><i aria-hidden="true">●</i><div><b>臺灣峰暉塑膠工業股份有限公司</b><span>彰化縣社頭鄉永興路30之35號</span></div></div></div></section>
    <GlobalInquiryFooter />
  </>;
}
