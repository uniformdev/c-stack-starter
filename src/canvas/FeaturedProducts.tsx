import { FC, Fragment } from 'react';
import { ComponentProps, registerUniformComponent, componentStore } from '@uniformdev/canvas-react';
import ProductItem from '../components/ProductItem';
import { BackgroundTypes } from '../components/Container';
import CarouselBlock from '../components/CarouselBlock';

type FeaturedProductsProps = ComponentProps<{
  title: string;
  subTitle?: string;
  products: Type.Product[];
  buttonCopy: string;
  buttonLink?: Type.ProjectMapLink;
  showAddToCart: boolean;
}>;

const FeaturedProducts: FC<FeaturedProductsProps> = ({
  title,
  subTitle,
  products,
  buttonCopy,
  buttonLink,
  component,
  showAddToCart,
}) => {
  const isDark = component.variant === BackgroundTypes.Dark.toLowerCase();

  // products - for classic integration support,  component?.slots - for ngm
  const hasSomethingToRender = Boolean(products?.length || component?.slots?.items?.length);

  if (!hasSomethingToRender) return null;

  const renderContent = () => {
    if (products) {
      return products.map(item => (
        <ProductItem key={`featured-product-${item.id}`} product={item} showAddToCart={showAddToCart} isDark={isDark} />
      ));
    }
    return (component?.slots?.items || [])?.map((component, index) => {
      const Component = componentStore.get(component.type) || Fragment;
      const componentProps = Object.entries(component.parameters || {}).reduce(
        (acc, [key, { value }]) => ({ ...acc, [key]: value }),
        {}
      );
      const props = { ...componentProps, showAddToCart };
      return <Component key={`${component._id}${index}`} {...props} />;
    });
  };

  return (
    <CarouselBlock
      title={title}
      subTitle={subTitle}
      buttonCopy={buttonCopy}
      buttonLink={buttonLink?.path}
      isDark={isDark}
    >
      {renderContent()}
    </CarouselBlock>
  );
};

['dark', undefined].forEach(variantId =>
  registerUniformComponent({
    type: 'featuredProducts',
    component: FeaturedProducts,
    variantId,
  })
);

['dark', undefined].forEach(variantId =>
  registerUniformComponent({
    type: 'recommendedProducts',
    component: FeaturedProducts,
    variantId,
  })
);

['dark', undefined].forEach(variantId =>
  registerUniformComponent({
    type: 'recommendedProductsClassic',
    component: FeaturedProducts,
    variantId,
  })
);

export default FeaturedProducts;
