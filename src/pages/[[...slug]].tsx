import { GetStaticProps, GetStaticPaths } from 'next';
import { CommonContainer } from '@/components';
import { getErrorPageProps, getFormattedPath } from '@/utilities';
import { getPathsFromProjectMap, getCompositionProps, getState } from '@/utilities/canvas';
import { AppPages, ProductPagesPrefixes } from '@/constants';

export const getStaticProps: GetStaticProps<{ preview?: boolean }> = async context => {
  const { preview, params } = context;
  const { slug: initialSlug } = params || {};

  const path = getFormattedPath(AppPages.Home, initialSlug);

  return getCompositionProps({
    path,
    context,
  })
    .then(compositionProps => ({
      props: { ...compositionProps, preview: Boolean(preview) },
      revalidate: 31536000,
    }))
    .catch(getErrorPageProps);
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getPathsFromProjectMap({
    skipPaths: [ProductPagesPrefixes.ProductListPage],
    depth: 1,
    state: getState(false),
  });
  return { paths, fallback: 'blocking' };
};

export default CommonContainer;
