import { FC, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ProductPagesPrefixes } from '../constants';
import { getFormattedPath } from '../utilities';
import CurrencyFormatter from './CurrencyFormatter';
import ProductAddToCartButton from './ProductAddToCartButton';

export interface ProductItemProps {
  product: Type.Product;
  showAddToCart?: boolean;
  isDark?: boolean;
}

const ProductItem: FC<ProductItemProps> = ({ product, showAddToCart = false, isDark = false }) => {
  const { id, name, price, slug, thumbnailId, images, subCategories = [] } = product || {};

  const thumbnailImage = useMemo(
    () => images?.find(image => image.id === thumbnailId) || images?.[0],
    [thumbnailId, images]
  );

  return (
    <div className="flex flex-1 flex-col w-full mx-auto mb-auto mt-0 h-full">
      <div className="relative flex flex-col items-center lg:px-0 h-full">
        <Link
          className="group flex flex-col cursor-pointer w-full h-full"
          href={getFormattedPath(ProductPagesPrefixes.ProductDetailsPage, slug)}
        >
          <div className="relative p-[0px] w-full h-auto pb-[calc(100%-36px)] border-[18px] border-white outline-1 outline outline-gray-100 bg-white">
            <div className="absolute left-0 top-0 h-full w-full group-hover:scale-105 transition-all">
              <Image
                className="object-contain"
                fill
                src={thumbnailImage?.url}
                alt={`${id}-product-image`}
                sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            </div>
          </div>
          <span className="font-bold overflow-hidden text-ellipsis text-2xl mt-6">{name}</span>
          {Boolean(subCategories.length) && (
            <span className="font-bold overflow-hidden text-ellipsis text-sm mt-2">{subCategories.join(' ')}</span>
          )}
          <div className="flex h-14">
            <CurrencyFormatter amount={price} />
          </div>
        </Link>
        {showAddToCart && (
          <ProductAddToCartButton
            styleType={isDark ? 'secondary' : 'primary'}
            product={product}
            quantity={1}
            className="cursor-pointer self-start w-full md:w-32 !px-2 text-sm mt-auto"
          />
        )}
      </div>
    </div>
  );
};
export default ProductItem;
