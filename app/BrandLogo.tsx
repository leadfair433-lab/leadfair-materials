export default function BrandLogo({className="brand-logo"}:{className?:string}){
  return <span className="localized-brand-logo" aria-hidden="true">
    <img className={`${className} brand-logo-zh`} src="/images/leadfair-logo-zh.png" alt=""/>
    <img className={`${className} brand-logo-intl`} src="/images/leadfair-logo-en.png" alt=""/>
  </span>;
}
