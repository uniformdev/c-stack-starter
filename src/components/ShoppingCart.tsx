import { FC, ReactElement, useMemo } from 'react';
import Image from 'next/image';
import { useCartContext } from '../context/CartProvider';
import Container from './Container';
import CurrencyFormatter from './CurrencyFormatter';
import Button from './Button';
import InformationContent from './InformationContent';
import ShoppingCartItem from './ShoppingCartItem';
import NavigationFooter from './NavigationFooter';

interface ShoppingCartProps {
  preview: boolean;
  headerComponent?: ReactElement;
}

const ShoppingCart: FC<ShoppingCartProps> = ({ headerComponent }) => {
  const { cart, cartAmount, updateItemQuantity, removeItemFromCart } = useCartContext();
  const cartItems = useMemo(() => Object.values(cart).map(cartItem => cartItem), [cart]);
  const hasItems = Boolean(cartItems.length);

  return (
    <>
      {headerComponent}
      <Container>
        <div className="md:pt-14 lg:mb-28">
          {hasItems && (
            <div className="md:flex flex-row font-bold border-b pb-4 hidden">
              <div className="basis-3/5">ITEM</div>
              <div className="basis-1/5">QTY</div>
              <div className="basis-1/5 text-right">Price</div>
            </div>
          )}
          {hasItems ? (
            cartItems.map(cartItem => (
              <ShoppingCartItem
                updateItemQuantity={updateItemQuantity}
                removeItemFromCart={removeItemFromCart}
                key={cartItem.product.id}
                quantity={cartItem.quantity}
                product={cartItem.product}
              />
            ))
          ) : (
            <InformationContent
              title="Your shopping cart is empty"
              text="Products added to the cart will appear here."
              imageComponent={
                <Image
                  src="https://res.cloudinary.com/uniformdev/image/upload/v1675775007/vNext%20Demos/icons/icon-cart_zzou3e.svg"
                  width={75}
                  height={75}
                  alt="cart icon"
                  unoptimized
                />
              }
            />
          )}
          {hasItems && (
            <div className="pt-9">
              <div className="flex flex-row justify-end font-bold text-2xl">
                <span className="pr-4">Subtotal:</span>
                <CurrencyFormatter amount={cartAmount} />
              </div>
              <div className="flex flex-row justify-end">
                <Button.Action
                  styleType="primary"
                  onClick={() => {
                    alert(
                      'Checkout is out of scope on this starter site. Build a checkout page in Uniform, in your code, or use a preferred solution'
                    );
                  }}
                  className="border-2 mt-9 h-12 group lg:mb-32 sm:justify-center sm:mx-0 mx-auto group-hover:text-white"
                >
                  <span className=" text-black font-bold text-sm tracking-wider">Proceed to Checkout</span>
                </Button.Action>
              </div>
            </div>
          )}
        </div>
      </Container>
      <NavigationFooter />
    </>
  );
};

export default ShoppingCart;
