import BrandLogo from "./BrandLogo";

export default function SiteFooter(){
  return <footer className="footer site-footer">
    <div className="footer-main shell"><div className="footer-brand"><a className="logo brand-logo-link" href="/#top" aria-label="Found Fair 首頁"><BrandLogo/></a><p>專注 TPE 熱塑性彈性體研發、客製配方、測試驗證與穩定量產。</p></div>
    <nav className="footer-nav" aria-label="頁尾導航"><strong>網站導航</strong><a href="/products/">產品</a><a href="/articles/">Blog</a><a href="/company/">企業介紹</a><a href="/honors/">企業榮譽</a><a href="/contact/">聯絡我們</a></nav>
    <div className="footer-contact-info" aria-label="聯絡資訊">
      <strong>聯絡方式</strong>
      <span><small>地址</small>彰化縣社頭鄉永興路30之35號</span>
      <a href="tel:+8613928736388"><small>手機電話</small>+86-139-2873-6388</a>
      <a href="mailto:joe.chen@ffsystem.com"><small>電子郵箱</small>joe.chen@ffsystem.com</a>
      <a href="tel:+8869250938852"><small>座機</small>+886-0925-093-8852</a>
    </div>
    <div className="footer-connect"><strong>關注與聯絡</strong><div className="footer-socials"><a className="facebook" href="#" aria-label="Facebook">f</a><a className="youtube" href="#" aria-label="YouTube">▶</a><a className="x-social" href="#" aria-label="X">X</a><a className="linkedin" href="#" aria-label="LinkedIn">in</a><a className="instagram" href="#" aria-label="Instagram">◎</a><a className="whatsapp" href="https://wa.me/8613928736388" target="_blank" rel="noreferrer" aria-label="WhatsApp"><img src="/icons/whatsapp.svg" alt=""/></a></div><a className="footer-contact-button" href="/contact/#inquiry">聯絡材料工程師 ↗</a></div></div>
    <div className="footer-bottom shell"><small className="footer-copyright">© 2026 Found Fair. All rights reserved.</small><a href="#page-top">返回頁首 ↑</a></div>
  </footer>;
}
