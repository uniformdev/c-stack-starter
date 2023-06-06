import { FC, useCallback, useEffect, useState } from 'react';
import Container, { PaddingSize } from './Container';
import ProductQuantityItem from './ProductQuantityItem';
import ProductAddToCartButton from './ProductAddToCartButton';

interface Props {
  product: Type.Product;
}

const AddToCart: FC<Props> = ({ product }) => {
  const [quantity, setQuantity] = useState<number>(1);

  // FixMe.
  useEffect(() => setQuantity(1), [product?.id]);

  const increaseQuantity = useCallback(() => setQuantity(quantity => quantity + 1), []);
  const decreaseQuantity = useCallback(() => setQuantity(quantity => quantity - 1), []);

  return (
    <Container paddingTop={PaddingSize.None} paddingBottom={PaddingSize.None}>
      <div className="flex flex-col lg:flex-row justify-between items-center border-y-2 py-6">
        <div className="flex items-center justify-between w-full w-full lg:w-auto">
          <div className="inline font-bold mr-12">QUANTITY:</div>
          <ProductQuantityItem
            onClickIncrement={increaseQuantity}
            onClickDecrement={decreaseQuantity}
            quantity={quantity}
          />
        </div>
        <ProductAddToCartButton product={product} quantity={quantity} className="w-full mt-6 lg:w-1/3 lg:mt-0" />
      </div>
    </Container>
  );
};

export default AddToCart;
