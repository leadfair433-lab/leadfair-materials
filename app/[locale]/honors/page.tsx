import SiteHeader from "../../SiteHeader";
import GlobalInquiryFooter from "../../GlobalInquiryFooter";

export function generateStaticParams(){return [{locale:"zh-tw"},{locale:"en"},{locale:"vi"}]}

const certificates=[
  ["ISO 13485:2016","cert-iso13485"],
  ["ISO 9001:2015","cert-iso9001"],
  ["US FDA REG.","cert-fda"],
  ["REEBOK","cert-reebok"],
  ["SCHERING-PLOUGH","cert-schering"],
  ["BAYER","cert-bayer"],
];

export default function HonorsPage(){return <main className="honors-page"><SiteHeader/><section className="honors-hero shell"><span>CORPORATE HONORS / 企業榮譽</span><h1>品質獲得認證，<br/>合作建立信任。</h1><p>從品質管理、醫療器材體系到國際品牌合作肯定，每一項榮譽都是長期製造能力與交付承諾的印證。</p></section><section className="certificate-section shell"><header><span>QUALIFICATIONS & RECOGNITION</span><h2>認證與合作榮譽</h2><p>每張證書及獎牌獨立展示，便於查閱與後續更新。</p></header><div className="certificate-grid">{certificates.map(([name,klass],i)=><article key={name}><div className={`certificate-crop ${klass}`} role="img" aria-label={name}/><span>{String(i+1).padStart(2,"0")}</span><h3>{name}</h3><p>{i<3?"品質與合規體系認證":"國際品牌合作與服務肯定"}</p></article>)}</div></section><GlobalInquiryFooter/></main>}
