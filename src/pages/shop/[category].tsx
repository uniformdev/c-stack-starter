import { GetStaticProps, GetStaticPaths } from 'next';
import { CommonContainer } from '@/components';
import { getErrorPageProps } from '@/utilities';
import { getPathsFromProjectMap, getCompositionProps, getState } from '@/utilities/canvas';
import { InternalCompositionPaths, ProductPagesPrefixes } from '@/constants';

export const getStaticProps: GetStaticProps<{ preview?: boolean }> = async context => {
  const { preview, params } = context;
  const { category: queryCategory } = params || {};

  const category = String(queryCategory);

  return getCompositionProps({
    path: `${InternalCompositionPaths.ProductListingPrefix}/${category}`,
    context,
  })
    .then(compositionProps => ({
      props: { ...compositionProps, key: category, preview: Boolean(preview) },
      revalidate: 31536000,
    }))
    .catch(getErrorPageProps);
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getPathsFromProjectMap({ path: ProductPagesPrefixes.ProductListPage, state: getState(false) });
  return { paths, fallback: 'blocking' };
};

export default CommonContainer;
