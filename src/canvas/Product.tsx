import { FC } from 'react';
import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import { withContent } from '../hocs/withContent';
import Container, { PaddingSize } from '../components/Container';
import SectionTwoColumns from '../components/SectionTwoColumns';
import ProductImageGallery from '../components/ProductImageGallery';
import ProductInfo from '../components/ProductInfo';
import AddToCart from '../components/AddToCart';
import ProductDescription from '../components/ProductDescription';

type Props = ComponentProps<Type.Product>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Product: FC<Props> = ({ component, ...product }) => (
  <>
    <Container paddingBottom={PaddingSize.None}>
      <SectionTwoColumns
        columnWidths="1/2-1/2"
        verticalAlignment="items-start"
        rightContent={<ProductImageGallery product={product} />}
        leftContent={<ProductInfo product={product} />}
      />
    </Container>
    <AddToCart product={product} />
    <ProductDescription title="About this product" product={product} />
  </>
);

registerUniformComponent({
  type: 'product',
  component: withContent(Product),
});

export default Product;
