export enum BaseAddPages {
  Home = '/',
}

export enum ProductPagesPrefixes {
  ProductListPage = '/shop',
  ProductDetailsPage = '/products',
}

export enum ArticlePagesPrefixes {
  ArticlesPage = '/articles',
}

export const AppPages = {
  ...BaseAddPages,
  CoffeeMakers: `${ProductPagesPrefixes.ProductListPage}/coffee-makers`,
  Beans: `${ProductPagesPrefixes.ProductListPage}/beans`,
  Articles: '/articles',
  Products: '/products',
  Cart: `/cart`,
};

export const InternalCompositionPaths = {
  ProductListingPrefix: ProductPagesPrefixes.ProductListPage,
  ProductDetails: '/product-slug',
  ArticleTemplate: `${AppPages.Articles}/article-slug`,
};
