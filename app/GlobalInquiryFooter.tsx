"use client";

import SiteFooter from "./SiteFooter";

export default function GlobalInquiryFooter({showFooter=true}:{showFooter?:boolean}){
  return <>
    <section className="cta global-inquiry" id="contact"><div className="shell inquiry-wrap">
      <div className="inquiry-copy"><span>CONTACT OUR MATERIAL TEAM</span><h2>告訴我們您的需求，<br/>取得可落地的材料方案。</h2><p>無論您正在選材、打樣、改善製程或準備量產，留下關鍵條件後，材料工程師將在 24 小時內回覆下一步建議。</p><div className="inquiry-promises"><article><b>01</b><span>工程師直接對接<small>降低反覆溝通成本</small></span></article><article><b>02</b><span>支援樣品與打樣<small>先驗證，再進入量產</small></span></article><article><b>03</b><span>量產可行性評估<small>同步考量效能、製程與成本</small></span></article></div><div className="reply-note"><b>24h</b><small>工作日內首次回覆</small></div></div>
      <form id="inquiry" className="inquiry-form" onSubmit={e=>{e.preventDefault();e.currentTarget.reset()}}><div className="inquiry-form-head"><span>PROJECT INQUIRY</span><h3>提交您的專案需求</h3><p>填寫約需 2 分鐘。資訊越完整，我們越能快速提供適配建議。</p></div><div className="field-row"><label>您的姓名<input name="name" required placeholder="請輸入姓名"/></label><label>公司名稱<input name="company" required placeholder="請輸入公司名稱"/></label></div><div className="field-row"><label>工作郵箱<input name="email" required type="email" placeholder="name@company.com"/></label><label>聯絡電話<input name="phone" required type="tel" placeholder="國家程式碼 + 電話號碼"/></label></div><div className="field-row"><label>目前需求<select name="intent" defaultValue="材料選型"><option>材料選型</option><option>索取樣品</option><option>客製配方</option><option>製程改善</option><option>量產與報價</option></select></label><label>預計用量<input name="volume" placeholder="例如：5 噸 / 月"/></label></div><label>專案需求<textarea name="message" rows={4} placeholder="請描述應用場景、硬度、顏色、認證、時程或交付要求"/></label><label className="consent"><input type="checkbox" required/> 我同意材料工程師就本次專案需求與我聯絡</label><button type="submit">取得材料建議與樣品方案 <b>↗</b></button><small className="inquiry-privacy">您的資料僅用於本次商務與技術聯絡，不會用於非相關推廣。</small></form>
    </div></section>
    {showFooter&&<SiteFooter/>}
  </>;
}
