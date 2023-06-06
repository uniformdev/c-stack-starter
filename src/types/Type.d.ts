declare namespace Type {
  interface ProjectMapLink {
    path: string;
    nodeId: string;
    projectMapId: string;
  }

  interface NavigationLink {
    title: string;
    link: string;
  }

  interface HeaderProps {
    navigationLinks?: NavigationLink[];
  }

  interface Category {
    id: string;
    name: string;
    url: string;
    parentId: string;
  }

  interface ProductImage {
    id: string;
    url: string;
  }

  interface Product {
    id: string;
    slug: string;
    name: string;
    description: string;
    price: number;
    categories: string[];
    rootCategories?: string[];
    subCategories?: string[];
    thumbnailId: string;
    images: ProductImage[];
  }

  interface Article {
    slug?: string;
    id?: string;
    title?: string;
    description?: string;
    thumbnail?:
      | {
          src?: string; // type for Contentstack
        }
      | string; // type for Contentful and Algolia
    content?: string;
  }

  type ProductsHashCache = Record<string, Product>;

  interface SearchParams {
    limit?: string;
    page?: string;
    categoryId?: string;
    keyword?: string;
    sortField?: 'price';
    sortDirection?: string;
  }
}
