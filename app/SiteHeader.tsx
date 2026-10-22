"use client";

import { useEffect, useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import BrandLogo from "./BrandLogo";

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };
    const closeOnDesktop = () => {
      if (window.innerWidth > 900) setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", closeOnDesktop);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", closeOnDesktop);
    };
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return <>
    <header className="top shell site-header">
      <a className="logo brand-logo-link" href="/#top" aria-label="Found Fair 首頁"><BrandLogo/></a>
      <nav aria-label="主要導航">
        <div className="nav-dropdown">
          <a href="/products/" aria-haspopup="true">產品 <span>⌄</span></a>
          <div className="nav-dropdown-menu">
            <a href="/products/">產品總覽</a>
            <a href="/products/ius-4065/">IUS-4065</a>
            <a href="/products/lf-et78a/">LF-ET78A</a>
            <a href="/products/lf-hr53a/">LF-HR53A</a>
            <a href="/products/gte-8030/">GTE-8030</a>
            <a href="/products/gte-8075/">GTE-8075</a>
          </div>
        </div>
        <div className="nav-dropdown">
          <a href="/articles/" aria-haspopup="true">Blog <span>⌄</span></a>
          <div className="nav-dropdown-menu">
            <a href="/articles/">文章總覽</a>
            <a href="/blog/chemical-foaming-vs-supercritical-foaming/">發泡技術</a>
            <a href="/blog/biobased-carbon14-biodegradability/">生質材料</a>
            <a href="/blog/eva-foam-shrinkage-ius-4065/">尺寸穩定</a>
          </div>
        </div>
        <div className="nav-dropdown company-dropdown">
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
      <div className="tools">
        <LanguageSwitcher/>
        <a className="contact" href="/contact/#inquiry">聯絡工程師 ↗</a>
        <button
          className="mobile-menu-toggle"
          type="button"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-site-navigation"
          aria-label={mobileMenuOpen ? "關閉導航選單" : "開啟導航選單"}
          onClick={() => setMobileMenuOpen(open => !open)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>
    </header>
    <nav
      id="mobile-site-navigation"
      className={`mobile-nav-panel${mobileMenuOpen ? " is-open" : ""}`}
      aria-label="手機導航"
      aria-hidden={!mobileMenuOpen}
    >
      <div className="mobile-nav-primary">
        <a href="/products/" onClick={closeMobileMenu}>產品總覽</a>
        <a href="/articles/" onClick={closeMobileMenu}>文章總覽</a>
        <a href="/company/" onClick={closeMobileMenu}>企業介紹</a>
        <a href="/honors/" onClick={closeMobileMenu}>企業榮譽</a>
        <a href="/contact/" onClick={closeMobileMenu}>聯絡我們</a>
      </div>
      <div className="mobile-nav-secondary">
        <a href="/products/ius-4065/" onClick={closeMobileMenu}>IUS-4065</a>
        <a href="/products/lf-et78a/" onClick={closeMobileMenu}>LF-ET78A</a>
        <a href="/products/lf-hr53a/" onClick={closeMobileMenu}>LF-HR53A</a>
        <a href="/company/#company-laboratory" onClick={closeMobileMenu}>實驗室環境</a>
      </div>
      <a className="mobile-nav-contact" href="/contact/#inquiry" onClick={closeMobileMenu}>聯絡工程師 ↗</a>
    </nav>
    {mobileMenuOpen && <button className="mobile-nav-backdrop" type="button" aria-label="關閉導航選單" onClick={closeMobileMenu} />}
    <div className="site-header-spacer" id="page-top" aria-hidden="true" />
    <aside className="floating-contacts" aria-label="快速聯絡方式">
      <a href="https://wa.me/8613928736388" target="_blank" rel="noreferrer" aria-label="WhatsApp 聯絡" title="WhatsApp"><img src="/icons/whatsapp.svg" alt=""/></a>
      <a href="/contact/#social-qr" aria-label="查看微信二維碼" title="WeChat"><img src="/icons/wechat.svg" alt=""/></a>
      <a href="mailto:joe.chen@ffsystem.com" aria-label="電子郵件聯絡" title="Email"><img src="/icons/mail.svg" alt=""/></a>
      <a href="tel:+8613928736388" aria-label="電話聯絡" title="Phone"><img src="/icons/phone.svg" alt=""/></a>
      <a className="back-to-top" href="#page-top" aria-label="返回頁首" title="返回頁首"><span aria-hidden="true">⌃</span></a>
    </aside>
  </>;
}
