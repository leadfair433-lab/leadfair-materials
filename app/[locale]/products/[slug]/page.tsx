import ProductDetail from "../../../products/[slug]/ProductDetail";
import { products } from "../../../content/products";

export function generateStaticParams() {
  return ["zh-tw", "en", "vi"].flatMap(locale => products.map(product => ({ locale, slug: product.slug })));
}

export default function LocalizedProduct() {
  return <ProductDetail />;
}
