export default function BrandLogo({className="brand-logo",variant="header"}:{className?:string;variant?:"header"|"footer"}){
  const prefix = variant === "footer" ? "footer-logo" : "leadfair-logo";
  return <span className="localized-brand-logo" aria-hidden="true">
    <img className={`${className} brand-logo-zh`} src={`/images/${prefix}-zh.png`} alt=""/>
    <img className={`${className} brand-logo-intl`} src={`/images/${prefix}-en.png`} alt=""/>
  </span>;
}
