import CompanySection from "../../CompanySection";
import SiteHeader from "../../SiteHeader";
import GlobalInquiryFooter from "../../GlobalInquiryFooter";

export function generateStaticParams() {
  return [{ locale: "zh-tw" }, { locale: "en" }, { locale: "vi" }];
}

export default function CompanyPage() {
  return <main className="company-page">
    <SiteHeader />
    <CompanySection />
    <GlobalInquiryFooter />
  </main>;
}
