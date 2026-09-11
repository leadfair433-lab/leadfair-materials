import BrandLogo from "./BrandLogo";

export default function SiteFooter(){
  return <footer className="footer site-footer shell">
    <a className="logo brand-logo-link" href="/#top" aria-label="Found Fair 首頁"><BrandLogo/></a>
    <div className="footer-contact-info" aria-label="聯絡資訊">
      <span><small>地址</small>彰化縣社頭鄉永興路30之35號</span>
      <a href="tel:+8613928736388"><small>手機電話</small>+86-139-2873-6388</a>
      <a href="mailto:joe.chen@ffsystem.com"><small>電子郵箱</small>joe.chen@ffsystem.com</a>
      <a href="tel:+8869250938852"><small>座機</small>+886-0925-093-8852</a>
    </div>
    <div className="footer-socials"><a href="https://wa.me/8613928736388" target="_blank" rel="noreferrer" aria-label="WhatsApp"><img src="/icons/whatsapp.svg" alt=""/></a><a href="/contact/#social-qr" aria-label="WeChat"><img src="/icons/wechat.svg" alt=""/></a><a href="mailto:joe.chen@ffsystem.com" aria-label="Email"><img src="/icons/mail.svg" alt=""/></a><a href="tel:+8613928736388" aria-label="Phone"><img src="/icons/phone.svg" alt=""/></a></div>
    <small className="footer-copyright">© 2026 Found Fair. All rights reserved.</small>
  </footer>;
}
