import { entryRoute } from '@/lib/cms/entryPage';

const route = entryRoute('product');

export const dynamic = 'force-static';
export const dynamicParams = false;
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
