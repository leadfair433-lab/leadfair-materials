import ProductsOverview from "../../ProductsOverview";

export function generateStaticParams(){return [{locale:"zh-tw"},{locale:"en"},{locale:"vi"}]}

export default function LocalizedProductsPage(){return <ProductsOverview/>}
