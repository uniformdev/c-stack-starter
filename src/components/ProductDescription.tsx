import { FC } from 'react';
import Container from './Container';

interface Props {
  title: string;
  product: Type.Product;
}

const ProductDescription: FC<Props> = ({ title, product }) => {
  if (!product?.description) return null;
  return (
    <Container>
      <div className="w-fit font-overpass font-extrabold text-3xl leading-6">{title}</div>
      <div className="mt-4 w-4/5">
        <div className="product-description leading-6" dangerouslySetInnerHTML={{ __html: product.description }} />
      </div>
    </Container>
  );
};

export default ProductDescription;
