import SiteHeader from "../../SiteHeader";
import GlobalInquiryFooter from "../../GlobalInquiryFooter";
import HonorsGallery, { type HonorItem } from "../../HonorsGallery";

export function generateStaticParams(){return [{locale:"zh-tw"},{locale:"en"},{locale:"vi"}]}

const certificates: HonorItem[] = [
  {src:"/images/honors/01-footwear-registration.jpg",title:"鞋類產品註冊證書",category:"產品註冊"},
  {src:"/images/honors/02-fda-registration-2026.png",title:"2026 美國 FDA 註冊",category:"國際註冊"},
  {src:"/images/honors/03-biobased-carbon-70.jpg",title:"GTE-8075 生質碳含量 70% 檢測",category:"Beta Analytic 檢測"},
  {src:"/images/honors/04-iso-9001-bsi.png",title:"ISO 9001:2015 品質管理體系認證",category:"BSI 認證"},
  {src:"/images/honors/05-biobased-carbon-35.jpg",title:"GTE-8030 生質碳含量 35% 檢測",category:"Beta Analytic 檢測"},
  {src:"/images/honors/06-sgs-back-protector.png",title:"背部護具 EN 1621-2 檢測報告",category:"SGS 檢測"},
  {src:"/images/honors/07-iso-13485-medical.png",title:"ISO 13485:2016 醫療器材品質管理認證",category:"醫療器材體系"},
  {src:"/images/honors/08-tuv-biobased-test.jpg",title:"生質發泡材料安全項目檢測",category:"TÜV Rheinland 檢測"},
  {src:"/images/honors/09-sgs-shoulder-protector.png",title:"肩部護具 EN 1621-1 檢測報告",category:"SGS 檢測"},
  {src:"/images/honors/10-sgs-chest-protector.png",title:"胸部護具 EN 1621-3 檢測報告",category:"SGS 檢測"},
  {src:"/images/honors/11-sgs-knee-protector.png",title:"膝部護具 EN 1621-1 檢測報告",category:"SGS 檢測"},
  {src:"/images/honors/12-iso-9001-english.jpg",title:"ISO 9001:2015 品質管理體系英文證書",category:"品質體系認證"},
];

export default function HonorsPage(){return <main className="honors-page"><SiteHeader/><section className="honors-hero shell"><span>CORPORATE HONORS / 企業榮譽</span><h1>品質獲得認證，<br/>合作建立信任。</h1><p>從品質管理、醫療器材體系到國際檢測機構肯定，每一份證書與報告都是長期研發、製造能力及交付承諾的印證。</p></section><section className="certificate-section shell"><header><span>QUALIFICATIONS & TEST REPORTS</span><h2>認證證書與檢測報告</h2><p>點擊任一圖片即可放大檢視完整內容，並可切換上一張或下一張。</p></header><HonorsGallery items={certificates}/></section><GlobalInquiryFooter/></main>}
