import Blog from "../Blog";
import SiteHeader from "../SiteHeader";
import GlobalInquiryFooter from "../GlobalInquiryFooter";

export const metadata = { title: "全部文章 | 材料洞察與應用指南", description: "探索 TPE 材料選型、發泡開發與成型驗證的應用指南。" };

export default function BlogIndexPage() {
  return <main className="blog-listing">
    <SiteHeader />
    <Blog listing />
    <GlobalInquiryFooter />
  </main>;
}
