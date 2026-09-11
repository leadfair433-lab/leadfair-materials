"use client";

import LanguageSwitcher from "./LanguageSwitcher";

export default function SiteHeader() {
  return <>
    <header className="top shell site-header">
      <a className="logo brand-logo-link" href="/#top" aria-label="麗暉塑膠首頁"><img className="brand-logo" src="/images/leadfair-logo.png" alt="麗暉塑膠"/></a>
      <nav aria-label="主要導航">
        <a href="/products/">產品</a>
        <a href="/articles/">Blog</a>
        <div className="nav-dropdown">
          <a href="/company/" aria-haspopup="true">企業介紹 <span>⌄</span></a>
          <div className="nav-dropdown-menu">
            <a href="/company/#company-overview">公司簡介</a>
            <a href="/company/#company-history">歷史沿革</a>
            <a href="/company/#company-laboratory">實驗室環境</a>
          </div>
        </div>
        <a href="/honors/">企業榮譽</a>
        <a href="/contact/">聯絡我們</a>
      </nav>
      <div className="tools"><LanguageSwitcher/><a className="contact" href="/contact/#inquiry">聯絡工程師 ↗</a></div>
    </header>
    <div className="site-header-spacer" aria-hidden="true" />
    <aside className="floating-contacts" aria-label="快速聯絡方式">
      <a href="https://wa.me/8613928736388" target="_blank" rel="noreferrer" aria-label="WhatsApp 聯絡" title="WhatsApp"><span>WA</span></a>
      <a href="/contact/#social-qr" aria-label="查看微信二維碼" title="WeChat"><span>微</span></a>
      <a href="mailto:joe.chen@ffsystem.com" aria-label="電子郵件聯絡" title="Email"><span>@</span></a>
      <a href="tel:+8613928736388" aria-label="電話聯絡" title="Phone"><span>☎</span></a>
    </aside>
  </>;
}
