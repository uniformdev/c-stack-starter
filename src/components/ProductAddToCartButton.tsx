import { FC, useCallback } from 'react';
import { useCartContext } from '../context/CartProvider';
import Button from './Button';

interface Props {
  product: Type.Product;
  quantity: number;
  className?: string;
  styleType?: 'primary' | 'secondary';
  buttonCopy?: string;
}

const ProductAddToCartButton: FC<Props> = ({
  product,
  quantity,
  className = '',
  styleType = 'primary',
  buttonCopy = 'Add to Cart',
}) => {
  const { addItemToCart } = useCartContext();

  const handleAddToCard = useCallback(
    (): void => addItemToCart({ product, quantity }),
    [addItemToCart, product, quantity]
  );

  return (
    <Button.Action styleType={styleType} className={className} onClick={handleAddToCard}>
      <span>{buttonCopy}</span>
    </Button.Action>
  );
};

export default ProductAddToCartButton;
