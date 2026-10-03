import { entryRoute } from '@/lib/cms/entryPage';

const route = entryRoute('product');

export const revalidate = 300;
export const dynamicParams = true;
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
