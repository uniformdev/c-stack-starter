import { GetStaticProps, GetStaticPaths } from 'next';
import { COMMERCETOOLS_CATEGORY_SELECTOR_PARAMETER_TYPE } from '@uniformdev/canvas-enhancers';
import { CommonContainer } from '@/components';
import { getErrorPageProps } from '@/utilities';
import { getPathsFromProjectMap, getCompositionProps, getState } from '@/utilities/canvas';
import { getAvailableSubCategoriesPaths } from '@/utilities/products';
import { getCategories, getPreEnhancerForSearchPage } from '@/utilities/enhancers/commerce';
import { AppPages, InternalCompositionPaths, ProductPagesPrefixes } from '@/constants';

export const getStaticProps: GetStaticProps<{ preview?: boolean }> = async context => {
  const { preview, params } = context;
  const { category: queryCategory, subcategory: querySubCategory } = params || {};

  const category = String(queryCategory);
  const subCategorySlug = String(querySubCategory);

  const categories = await getMemoizedData({ preview });
  const subCategory = categories?.[subCategorySlug];

  return getCompositionProps({
    path: `${InternalCompositionPaths.ProductListingPrefix}/${category}`,
    context,
    preEnhancer: getPreEnhancerForSearchPage(subCategory?.id),
  })
    .then(compositionProps => ({
      props: { ...compositionProps, preview: Boolean(preview), key: `${category}-${subCategorySlug}` },
      revalidate: 31536000,
    }))
    .catch(getErrorPageProps);
};

const getMemoizedData = (() => {
  let memo: { [name: string]: Type.Category } | null = null;
  return async ({ preview = false }) => {
    if (memo && !preview) return memo;
    memo = await getCategories({
      paths: [AppPages.CoffeeMakers, AppPages.Beans],
      preview,
      parameterType: [COMMERCETOOLS_CATEGORY_SELECTOR_PARAMETER_TYPE],
    });
    return memo;
  };
})();

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await getMemoizedData({ preview: false });
  const baseCategoriesPaths = await getPathsFromProjectMap({
    path: ProductPagesPrefixes.ProductListPage,
    state: getState(false),
  });
  const paths = getAvailableSubCategoriesPaths(baseCategoriesPaths, Object.values(categories || {}));
  return { paths, fallback: 'blocking' };
};

export default CommonContainer;
