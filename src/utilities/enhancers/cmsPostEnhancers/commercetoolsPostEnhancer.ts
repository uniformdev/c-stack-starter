import {
  COMMERCETOOLS_PRODUCT_LIST_PARAMETER_TYPE,
  COMMERCETOOLS_CATEGORY_SELECTOR_PARAMETER_TYPE,
  COMMERCETOOLS_PRODUCT_PARAMETER_TYPE,
  COMMERCETOOLS_PRODUCT_QUERY_PARAMETER_TYPE,
} from '@uniformdev/canvas-enhancers';
import { EnhanceParameter, getFormattedLink } from '../../index';

const UNKNOWN = `unknown`;

type CommercetoolsProduct = {
  id: string;
  version: number;
  productType: { typeId: string; id: string };
  name: { [locale: string]: string };
  description: { [locale: string]: string };
  categories: [{ typeId: string; id: string }];
  slug: { [locale: string]: string };
  masterVariant: {
    id: number;
    sku: string;
    key: string;
    prices: [{ id: string; value: { type: string; currencyCode: string; centAmount: number; fractionDigits: number } }];
    images: [{ url: string; label: string; dimensions: { w: number; h: number } }];
  };
  key: string;
  createdAt: string;
  lastModifiedAt: string;
  [key: string]: unknown;
};

type CommercetoolsCategory = {
  id: string;
  version: number;
  versionModifiedAt: string;
  lastMessageSequenceNumber: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: { clientId: string; isPlatformClient: boolean };
  createdBy: { clientId: string; isPlatformClient: boolean };
  key: string;
  name: { [locale: string]: string };
  slug: { [locale: string]: string };
  ancestors: [{ typeId: string; id: string }];
  parent: { typeId: string; id: string };
  orderHint: string;
  categoryName: string;
  categorySlug: string;
};

const mapCommercetoolsPrice = (priceValue: {
  type: string;
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
}) => {
  const { centAmount = 0, fractionDigits } = priceValue || {};
  return fractionDigits ? centAmount / (10 * fractionDigits) : centAmount;
};

const mapCommercetoolsProduct = (product: CommercetoolsProduct): Type.Product => {
  const { id, slug, name, description, categories, masterVariant } = product;
  return {
    id: id,
    slug: Object.values(slug)?.[0] || UNKNOWN,
    name: Object.values(name)?.[0] || UNKNOWN,
    description: Object.values(description)?.[0] || UNKNOWN,
    price: mapCommercetoolsPrice(masterVariant.prices[0].value),
    categories: categories.map(c => c.id),
    thumbnailId: getFormattedLink(masterVariant.images.find(img => img.label === 'master')?.url),
    images: masterVariant.images.map((img, index) => ({ id: `${img.label}-${index}`, url: getFormattedLink(img.url) })),
  };
};

const mapCommercetoolsCategory = (category: CommercetoolsCategory): Type.Category => ({
  id: category.id,
  name: Object.values(category.name)?.[0] || UNKNOWN,
  url: category.categorySlug,
  parentId: category?.parent?.id || '',
});

export const commercetoolsPostEnhancer = ({
  parameter,
}: EnhanceParameter<CommercetoolsProduct | CommercetoolsProduct[] | CommercetoolsCategory[]>) => {
  switch (parameter.type) {
    case COMMERCETOOLS_PRODUCT_PARAMETER_TYPE:
      return mapCommercetoolsProduct((parameter.value as CommercetoolsProduct[])?.[0]);
    case COMMERCETOOLS_PRODUCT_LIST_PARAMETER_TYPE:
    case COMMERCETOOLS_PRODUCT_QUERY_PARAMETER_TYPE:
      return (parameter.value as CommercetoolsProduct[]).map(mapCommercetoolsProduct);
    case COMMERCETOOLS_CATEGORY_SELECTOR_PARAMETER_TYPE:
      return (parameter.value as CommercetoolsCategory[]).map(mapCommercetoolsCategory);
    default:
      return parameter.value;
  }
};
