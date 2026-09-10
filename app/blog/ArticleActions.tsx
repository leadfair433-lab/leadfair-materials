"use client";

import { useState } from "react";
import { socialIcons } from "./SocialIcons";
import MaterialInquiry from "./MaterialInquiry";

export function ArticleShare({ title }: { title: string }) {
  const [message, setMessage] = useState("");
  const [manualLink, setManualLink] = useState("");
  async function copyLink() {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      const local = ["localhost", "127.0.0.1", "[::1]"].includes(window.location.hostname);
      setMessage(`連結已複製，可貼上到社媒或聊天中。${local ? "當前連結僅限本機訪問，網站上線後即可對外分享。" : ""}`);
    } catch {
      setManualLink(url);
      setMessage("請選中下方連結並複製。");
    }
  }
  async function share() {
    if (!navigator.share) { await copyLink(); return; }
    try { await navigator.share({ title, url: window.location.href }); }
    catch (error) { if (!(error instanceof Error && error.name === "AbortError")) setMessage("暫時無法開啟分享選單，請使用複製連結。"); }
  }
  return <section className="journal-action-card" aria-labelledby="share-title"><h2 id="share-title">SHARE / 社媒分享</h2><div className="journal-social-grid">{["YouTube", "Instagram", "LinkedIn", "Facebook", "X", "WhatsApp", "複製連結"].map((name, index) => <button type="button" key={name} title={name === "複製連結" ? name : `${name}：複製連結後轉發`} aria-label={name === "複製連結" ? name : `複製連結用於 ${name} 分享`} onClick={copyLink}>{socialIcons[index]}</button>)}</div><p role="status" className="journal-action-note">{message}</p>{manualLink && <input aria-label="文章連結" readOnly value={manualLink} onFocus={event => event.target.select()} />}</section>;
}

export function ArticlePrint() {
  return <button type="button" className="journal-save" onClick={() => window.print()}>儲存文章 PDF ↓</button>;
}

export function ArticleDownloads() {
  return <section className="journal-action-card" id="article-downloads" aria-labelledby="download-title"><h2 id="download-title">DOWNLOAD / 資料下載</h2><a className="journal-download-link" href="/images/IUS-4065-technical-datasheet.png" download="IUS-4065-Technical-Datasheet.png">IUS-4065 技術資料表 ↓<small>PNG · 產品效能資料</small></a><ArticlePrint /><p className="journal-action-note">在列印視窗中選擇“另存為 PDF”儲存本文。</p><a className="journal-catalogue-link" href="/#inquiry">索取完整產品目錄 ↗</a></section>;
}

export function ArticleContact() {
  const [notice, setNotice] = useState("");
  return <section className="journal-action-card journal-contact-card" id="article-downloads"><h2>CONTACT US / 官方對接</h2><div className="journal-contact-details"><span>+86 (0) 571-8888-9999</span><span className="journal-email">info@leadfaircorp.com</span><span className="journal-whatsapp">+86 138 0000 8888 (WhatsApp)</span></div><small className="journal-action-note">參考程式碼示例聯絡方式 · 待確認</small><div className="journal-contact-buttons"><MaterialInquiry /><button type="button" onClick={() => setNotice("完整產品目錄 PDF 尚未配置，請透過商務詢盤索取。")}>下載產品目錄</button></div><p role="status" className="journal-action-note">{notice}</p></section>;
}
