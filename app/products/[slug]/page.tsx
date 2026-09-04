import ProductDetail from './ProductDetail';

export function generateStaticParams() {
  return ['ius-4065', 'lf-et78a', 'lf-hr53a', 'gte-8030', 'gte-8075'].map(slug => ({ slug }));
}

export default function ProductPage() {
  return <ProductDetail />;
}
