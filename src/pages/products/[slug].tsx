import { GetStaticProps, GetStaticPaths } from 'next';
import { COMMERCETOOLS_PRODUCT_QUERY_PARAMETER_TYPE } from '@uniformdev/canvas-enhancers';
import { CommonContainer } from '@/components';
import { getErrorPageProps, getFormattedPath } from '@/utilities';
import { getCompositionProps } from '@/utilities/canvas';
import {
  enhancerCustomExtenderFactory,
  getPreEnhancerForProductDetailPage,
  getProducts,
} from '@/utilities/enhancers/commerce';
import { AppPages, InternalCompositionPaths, ProductPagesPrefixes } from '@/constants';

export const getStaticProps: GetStaticProps<{ preview?: boolean }> = async context => {
  const { preview, params } = context;
  const { slug: initialSlug } = params || {};

  const path = getFormattedPath(AppPages.Products, initialSlug);
  const productSlug = String(initialSlug);
  const productsHash = await getMemoizedData({ preview });

  if (!productsHash || !productSlug) return { notFound: true };

  const selectedProductId = productsHash?.[productSlug]?.id;

  return getCompositionProps({
    path,
    defaultPath: `${AppPages.Products}${InternalCompositionPaths.ProductDetails}`,
    context,
    preEnhancer: getPreEnhancerForProductDetailPage(selectedProductId),
    extendEnhancer: enhancerCustomExtenderFactory(Object.values(productsHash), selectedProductId),
  })
    .then(compositionProps => ({
      props: { ...compositionProps, preview: Boolean(preview), key: productSlug },
      revalidate: 31536000,
    }))
    .catch(getErrorPageProps);
};

const getMemoizedData = (() => {
  let memo: { [name: string]: Type.Product } | null = null;
  return async ({ preview = false }) => {
    if (memo && !preview) return memo;
    memo = await getProducts({
      paths: [AppPages.CoffeeMakers, AppPages.Beans],
      preview,
      parameterType: [COMMERCETOOLS_PRODUCT_QUERY_PARAMETER_TYPE],
    });
    return memo;
  };
})();

export const getStaticPaths: GetStaticPaths = async () => {
  const productsHash = await getMemoizedData({ preview: false });
  const products = Object.values(productsHash || {});
  const paths = products ? products.map(product => `${ProductPagesPrefixes.ProductDetailsPage}/${product.slug}`) : [];
  return { paths, fallback: 'blocking' };
};

export default CommonContainer;
