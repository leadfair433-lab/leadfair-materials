"use client";

import GlobalInquiryFooter from "./GlobalInquiryFooter";
import SiteFooter from "./SiteFooter";

const needs = [
  ["01", "材料選型", "依應用、硬度、密度、耐熱與加工方式，快速縮小材料選擇範圍。"],
  ["02", "樣品與打樣", "取得適合驗證的材料樣品，並確認試料條件、數量與預計時程。"],
  ["03", "客製配方", "針對回彈、觸感、顏色、發泡效果與特殊規範進行配方開發。"],
  ["04", "量產與報價", "提供預計用量、交付地區與時程，以便評估產能、交期與商務條件。"],
];

export default function ContactPage(){
  return <>
    <section className="contact-hero shell"><div><span>CONTACT FOUND FAIR</span><h1>從需求開始，<br/>讓材料方案更快落地。</h1><p>告訴我們產品用途、目標效能與專案階段。材料工程師會整理關鍵問題，協助您完成選材、驗證與量產評估。</p><div className="hero-reply"><b>24h</b><span>工作日內由材料工程師直接對接</span></div></div><form id="inquiry" className="hero-quick-form" onSubmit={event=>{event.preventDefault();event.currentTarget.reset();alert("已收到您的需求，我們將儘快與您聯絡。");}}><div><span>QUICK INQUIRY</span><h2>快速提交需求</h2><p>留下基本資料，工程師將與您聯絡。</p></div><label>姓名 / 公司<input name="name" required placeholder="您的姓名與公司名稱"/></label><label>郵箱或電話<input name="contact" required placeholder="name@company.com / 電話"/></label><label>目前需求<select name="intent" defaultValue="材料選型"><option>材料選型</option><option>索取樣品</option><option>客製配方</option><option>量產與報價</option></select></label><button type="submit">提交需求 <b>↗</b></button></form></section>
    <section className="contact-needs shell"><header><span>HOW WE CAN HELP</span><h2>您目前需要哪一種協助？</h2><p>不確定材料牌號也沒有關係，先提供產品需求即可。</p></header><div>{needs.map(([no,title,text])=><article key={no}><b>{no}</b><h3>{title}</h3><p>{text}</p><a href="#inquiry">開始諮詢 ↗</a></article>)}</div></section>
    <section className="contact-location shell" aria-labelledby="contact-location-title"><div className="contact-location-copy"><span>OUR LOCATION</span><h2 id="contact-location-title">公司位置</h2><h3>臺灣峰暉塑膠工業股份有限公司</h3><p><small>地址</small>彰化縣社頭鄉永興路30之35號</p><a className="map-direction" href="https://www.google.com/maps/dir/?api=1&destination=23.918942%2C120.580882" target="_blank" rel="noreferrer">使用 Google 地圖導航 <b>↗</b></a></div><a className="contact-map" href="https://www.google.com/maps/dir/?api=1&destination=23.918942%2C120.580882" target="_blank" rel="noreferrer" aria-label="在 Google 地圖中導航至臺灣峰暉塑膠工業股份有限公司"><img src="/images/company-location-map.png" alt="臺灣峰暉塑膠工業股份有限公司所在地圖"/><span className="map-pin" aria-label="公司位置"><i>●</i></span><div className="map-location-card"><i aria-hidden="true">●</i><div><b>臺灣峰暉塑膠工業股份有限公司</b><span>彰化縣社頭鄉永興路30之35號</span></div></div><strong className="map-open">開啟 Google 地圖 ↗</strong></a></section>
    <GlobalInquiryFooter showFooter={false}/>
    <section className="contact-social" id="social-qr"><div className="shell contact-social-grid"><div><span>STAY CONNECTED</span><h2>直接聯絡我們</h2><p>可透過 WhatsApp、WeChat、電話或電子郵件與材料團隊聯絡。</p><dl className="contact-detail-list"><div><dt>地址</dt><dd>彰化縣社頭鄉永興路30之35號</dd></div><div><dt>手機電話</dt><dd><a href="tel:+8613928736388">+86-139-2873-6388</a></dd></div><div><dt>電子郵箱</dt><dd><a href="mailto:joe.chen@ffsystem.com">joe.chen@ffsystem.com</a></dd></div><div><dt>座機</dt><dd><a href="tel:+8869250938852">+886-0925-093-8852</a></dd></div></dl><div className="social-contact-buttons"><a href="https://wa.me/8613928736388" target="_blank" rel="noreferrer"><img src="/icons/whatsapp.svg" alt=""/>WhatsApp</a><a href="mailto:joe.chen@ffsystem.com"><img src="/icons/mail.svg" alt=""/>Email</a><a href="tel:+8613928736388"><img src="/icons/phone.svg" alt=""/>Phone</a><a href="#social-qr"><img src="/icons/wechat.svg" alt=""/>WeChat</a></div></div><figure><img src="/images/contact-qr-whatsapp-wechat.png" alt="WhatsApp 與 WeChat 聯絡二維碼"/><figcaption>掃描二維碼，立即與我們聯絡</figcaption></figure></div></section>
    <SiteFooter/>
  </>;
}
