import BlogIndexPage from "../../blog/page";

export function generateStaticParams() {
  return ["zh-tw", "en", "vi"].map(locale => ({ locale }));
}

export default function LocalizedBlogIndex() {
  return <BlogIndexPage />;
}
