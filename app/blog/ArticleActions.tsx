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
      setMessage(`链接已复制，可粘贴到社媒或聊天中。${local ? "当前链接仅限本机访问，网站上线后即可对外分享。" : ""}`);
    } catch {
      setManualLink(url);
      setMessage("请选中下方链接并复制。");
    }
  }
  async function share() {
    if (!navigator.share) { await copyLink(); return; }
    try { await navigator.share({ title, url: window.location.href }); }
    catch (error) { if (!(error instanceof Error && error.name === "AbortError")) setMessage("暂时无法打开分享菜单，请使用复制链接。"); }
  }
  return <section className="journal-action-card" aria-labelledby="share-title"><h2 id="share-title">SHARE / 社媒分享</h2><div className="journal-social-grid">{["YouTube", "Instagram", "LinkedIn", "Facebook", "X", "WhatsApp", "复制链接"].map((name, index) => <button type="button" key={name} title={name === "复制链接" ? name : `${name}：复制链接后转发`} aria-label={name === "复制链接" ? name : `复制链接用于 ${name} 分享`} onClick={copyLink}>{socialIcons[index]}</button>)}</div><p role="status" className="journal-action-note">{message}</p>{manualLink && <input aria-label="文章链接" readOnly value={manualLink} onFocus={event => event.target.select()} />}</section>;
}

export function ArticlePrint() {
  return <button type="button" className="journal-save" onClick={() => window.print()}>保存文章 PDF ↓</button>;
}

export function ArticleDownloads() {
  return <section className="journal-action-card" id="article-downloads" aria-labelledby="download-title"><h2 id="download-title">DOWNLOAD / 资料下载</h2><a className="journal-download-link" href="/images/IUS-4065-technical-datasheet.png" download="IUS-4065-Technical-Datasheet.png">IUS-4065 技术数据表 ↓<small>PNG · 产品性能资料</small></a><ArticlePrint /><p className="journal-action-note">在打印窗口中选择“另存为 PDF”保存本文。</p><a className="journal-catalogue-link" href="/#inquiry">索取完整产品目录 ↗</a></section>;
}

export function ArticleContact() {
  const [notice, setNotice] = useState("");
  return <section className="journal-action-card journal-contact-card" id="article-downloads"><h2>CONTACT US / 官方对接</h2><div className="journal-contact-details"><span>+86 (0) 571-8888-9999</span><span className="journal-email">info@leadfaircorp.com</span><span className="journal-whatsapp">+86 138 0000 8888 (WhatsApp)</span></div><small className="journal-action-note">参考代码示例联系方式 · 待确认</small><div className="journal-contact-buttons"><MaterialInquiry /><button type="button" onClick={() => setNotice("完整产品目录 PDF 尚未配置，请通过商务询盘索取。")}>下载产品目录</button></div><p role="status" className="journal-action-note">{notice}</p></section>;
}
