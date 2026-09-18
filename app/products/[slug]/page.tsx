import ProductDetail from './ProductDetail';
import { products } from '../../content/products';

export function generateStaticParams() {
  return products.map(product => ({ slug: product.slug }));
}

export default function ProductPage() {
  return <ProductDetail />;
}
