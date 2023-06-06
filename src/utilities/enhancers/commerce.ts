import { ChildEnhancerBuilder, enhance, EnhancerBuilder } from '@uniformdev/canvas';
import { COMMERCETOOLS_PRODUCT_PARAMETER_TYPE } from '@uniformdev/canvas-enhancers';
import { EnhanceParameter } from '@/utilities';
import { getCompositionProps } from '@/utilities/canvas';

interface CommercetoolsCategoriesParam {
  restrictLocale?: string;
  categoryIds?: string[];
}

interface CommercetoolsQueryParam {
  options?: {
    count?: number;
    categories?: string[];
    brand?: string;
    keyword?: string;
    sort?: string;
    sortOrder?: string;
  };
  searchLocale?: string;
  restrictSearch?: string;
  restrictLocale?: string;
  restrictCurrency?: string;
}

interface CommercetoolsProductParam {
  productIds?: string[];
  restrictLocale?: string;
  restrictCurrency?: string;
}

const getCategoriesFromParameter =
  (categoriesHashMapper: { [name: string]: unknown }) =>
  ({ parameter }: EnhanceParameter<{ url: string }[]>) =>
    parameter.value.forEach(category => {
      categoriesHashMapper[category.url] = category;
    });

export const getCategories = async ({
  paths,
  preview,
  parameterType,
}: {
  paths: string[];
  preview: boolean;
  parameterType: string[];
}): Promise<{ [name: string]: Type.Category } | null> => {
  const categoriesHashMapper = {};
  await Promise.all(
    paths.map(
      async path =>
        await getCompositionProps({ path, context: { preview } }).then(({ composition }) => {
          const enhancers = new EnhancerBuilder();
          enhancers.parameterType(parameterType, {
            enhanceOne: getCategoriesFromParameter(categoriesHashMapper),
          });

          return enhance({
            composition,
            enhancers,
            context: { preview },
          });
        })
    )
  );
  return categoriesHashMapper;
};

const getProductsFromParameter =
  (productsHashMapper: { [name: string]: unknown }) =>
  ({ parameter }: EnhanceParameter<{ slug: string }[]>) =>
    parameter.value.forEach(product => {
      productsHashMapper[product.slug] = product;
    });

export const getProducts = async ({
  paths,
  preview,
  parameterType,
}: {
  paths: string[];
  preview: boolean;
  parameterType: string[];
}): Promise<{ [name: string]: Type.Product } | null> => {
  const productsHashMapper = {};
  await Promise.all(
    paths.map(
      async path =>
        await getCompositionProps({ path, context: { preview } }).then(({ composition }) => {
          const enhancers = new EnhancerBuilder();
          enhancers.parameterType(parameterType, {
            enhanceOne: getProductsFromParameter(productsHashMapper),
          });

          return enhance({
            composition,
            enhancers,
            context: { preview },
          });
        })
    )
  );
  return productsHashMapper;
};

// PreEnhancer for Search page
const setActiveCategoryParameter = (subCategoryId?: string) => ({
  enhanceOne: async function Enhancer({ parameter }: EnhanceParameter<CommercetoolsCategoriesParam>) {
    return {
      ...parameter.value,
      categoryIds: subCategoryId ? [subCategoryId] : parameter.value.categoryIds,
    };
  },
});

const setPrefetchedSearchResultParameter = (subCategoryId?: string) => ({
  enhanceOne: async function Enhancer({ parameter }: EnhanceParameter<CommercetoolsQueryParam>) {
    return {
      ...parameter.value,
      options: {
        ...parameter.value.options,
        categories: subCategoryId ? [subCategoryId] : parameter.value.options?.categories,
      },
    };
  },
});

export const getPreEnhancerForSearchPage = (subCategoryId?: string) => {
  return new EnhancerBuilder()
    .parameterName('activeCategory', setActiveCategoryParameter(subCategoryId))
    .parameterName('prefetchedSearchResult', setPrefetchedSearchResultParameter(subCategoryId));
};

//PreEnhancer for commercetoolsProduct parameter
const setProductParameter = (productId?: string) => ({
  enhanceOne: async function Enhancer({ parameter }: EnhanceParameter<CommercetoolsProductParam>) {
    return {
      ...parameter.value,
      productIds: productId ? [productId] : parameter.value.productIds,
    };
  },
});

export const getPreEnhancerForProductDetailPage = (currentProductId?: string) => {
  return new EnhancerBuilder().parameterType(
    COMMERCETOOLS_PRODUCT_PARAMETER_TYPE,
    setProductParameter(currentProductId)
  );
};

// Extender enhancer for Related Products component
const getRelatedProducts = (products: Type.Product[], currentProductId?: string) => {
  const productCategories = products.find(product => product.id === currentProductId)?.categories || [];
  return products.filter(
    item => item.categories.some(category => productCategories.includes(category)) && item.id !== currentProductId
  );
};

const getRelatedProductComponentParameterEnhancer =
  (products: Type.Product[], currentProductId?: string) => (builder: ChildEnhancerBuilder) => {
    builder.data('relatedProducts', () => getRelatedProducts(products, currentProductId));
  };

export const enhancerCustomExtenderFactory =
  (products: Type.Product[], currentProductId?: string) => (enhancer: EnhancerBuilder) => {
    enhancer.component('relatedProducts', getRelatedProductComponentParameterEnhancer(products, currentProductId));
  };
