// The site's blogs, services, products and case studies, hardcoded one
// file per entry under ./data/<type>/. The web app renders them as static
// pages; scripts/db-seed.mjs uses them to fill an empty database.
import blogs from './data/blogs/index.js';
import services from './data/services/index.js';
import products from './data/products/index.js';
import caseStudies from './data/case-studies/index.js';

export { blogs, services, products, caseStudies };
export const seedEntries = [...blogs, ...services, ...products, ...caseStudies];
