"use client";

import { useRef, useState } from "react";

export default function MaterialInquiry() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [message, setMessage] = useState("");
  const previousOverflow = useRef("");
  function open() {
    previousOverflow.current = document.body.style.overflow;
    dialog.current?.showModal();
    document.body.style.overflow = "hidden";
    setMessage("");
  }
  function afterClose() {
    document.body.style.overflow = previousOverflow.current;
    trigger.current?.focus();
  }
  return <>
    <button type="button" className="material-inquiry-trigger" ref={trigger} onClick={open}>提交商務詢盤</button>
    <dialog ref={dialog} className="material-inquiry-dialog" aria-labelledby="material-inquiry-title" aria-describedby="material-inquiry-description" onClose={afterClose} onClick={event => { if (event.target === event.currentTarget) { const bounds = event.currentTarget.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.current?.close(); } }}>
      <div className="material-inquiry-inner"><button type="button" className="material-inquiry-close" aria-label="關閉詢盤表單" onClick={() => dialog.current?.close()}>×</button>
        <header><span>MATERIAL DEVELOPMENT / 樣品與定製</span><h2 id="material-inquiry-title">提交材料詢盤</h2><p id="material-inquiry-description">告訴我們您的產品應用與目標效能，以便材料工程師評估選材、試料或配方開發需求。</p></header>
        <form onSubmit={event => { event.preventDefault(); setMessage("表單已透過填寫檢查，但詢盤尚未傳送：當前為預覽版本，後臺未接入。您填寫的內容仍保留在此表單中。"); }}>
          <div className="material-inquiry-fields">
            <label>您的姓名 <span>*</span><input name="name" autoComplete="name" required maxLength={80} placeholder="例如：張經理" /></label>
            <label>公司名稱<input name="company" autoComplete="organization" maxLength={160} placeholder="請輸入公司名稱" /></label>
            <label>工作郵箱 <span>*</span><input name="email" autoComplete="email" type="email" required maxLength={254} placeholder="name@company.com" /></label>
            <label>聯絡電話<input name="phone" autoComplete="tel" type="tel" maxLength={40} placeholder="國家程式碼 + 電話號碼" /></label>
            <label>意向材料牌號<select name="grade" defaultValue="待推薦"><option>待推薦</option>{["IUS-4065", "LF-ET78A", "LF-HR53A", "GTE-8030", "GTE-8075", "定製配方"].map(value => <option key={value}>{value}</option>)}</select></label>
            <label>產品應用 <span>*</span><select name="application" defaultValue="" required><option value="" disabled>請選擇應用場景</option>{["鞋材", "中底", "鞋墊", "運動護具", "其他應用"].map(value => <option key={value}>{value}</option>)}</select></label>
            <label>成型方式<select name="process" defaultValue="待評估">{["待評估", "射出成型", "射出發泡", "押出 / 擠出", "其他製程"].map(value => <option key={value}>{value}</option>)}</select></label>
            <label>預計用量<input name="quantity" maxLength={100} placeholder="例如：試料 25 kg / 量產 5 噸每月" /></label>
          </div>
          <label className="material-inquiry-requirements">效能與專案需求 <span>*</span><textarea name="requirements" required rows={4} maxLength={4000} placeholder="請說明目標硬度（Shore A / Asker C）、密度、回彈性、顏色、使用環境、測試要求及預計交期；暫不確定的指標可留給工程師評估。" /></label>
          <label className="material-inquiry-consent"><input name="consent" type="checkbox" required />我同意就本次材料需求與我聯絡。</label>
          <p className="material-inquiry-preview">預覽表單：後臺尚未接入，提交不會傳送資料。</p>
          <button className="material-inquiry-submit" type="submit">提交材料詢盤 →</button>
          <p className="material-inquiry-status" role="status">{message}</p>
        </form>
      </div>
    </dialog>
  </>;
}
