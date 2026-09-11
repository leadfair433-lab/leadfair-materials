"use client";

import LanguageSwitcher from "./LanguageSwitcher";

export default function SiteHeader() {
  return <>
    <header className="top shell site-header">
      <a className="logo" href="/#top"><i>R</i><span>原料網站<small>ADVANCED MATERIALS</small></span></a>
      <nav aria-label="主要導航">
        <div className="nav-dropdown">
          <a href="/company/" aria-haspopup="true">企業介紹 <span>⌄</span></a>
          <div className="nav-dropdown-menu">
            <a href="/company/#company-overview">公司簡介</a>
            <a href="/company/#company-history">歷史沿革</a>
            <a href="/company/#company-laboratory">實驗室環境</a>
          </div>
        </div>
        <a href="/honors/">企業榮譽</a>
        <a href="/products/">產品</a>
        <a href="/articles/">Blog</a>
        <a href="/contact/">聯絡我們</a>
      </nav>
      <div className="tools"><LanguageSwitcher/><a className="contact" href="/contact/#inquiry">聯絡工程師 ↗</a></div>
    </header>
    <div className="site-header-spacer" aria-hidden="true" />
  </>;
}
