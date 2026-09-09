import ProductDetail from "../../../products/[slug]/ProductDetail";

export function generateStaticParams() {
  return ["zh-tw", "en", "vi"].flatMap(locale => ["ius-4065", "lf-et78a", "lf-hr53a", "gte-8030", "gte-8075"].map(slug => ({ locale, slug })));
}

export default function LocalizedProduct() {
  return <ProductDetail />;
}
