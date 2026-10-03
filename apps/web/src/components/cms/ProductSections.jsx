import ProductSection from '@/templates/fragments/product-section';
import { fragmentAccessor, getEntries } from '@/lib/cms/content';

/* Products page: one designed section per published product, from each
   product's "Section on the Products page" content. */
export default async function ProductSections() {
  const products = await getEntries('product');
  return products.map((p, i) => (
    <ProductSection key={p.slug} c={fragmentAccessor('product-section', p.section, p.slug)} i={i} />
  ));
}
