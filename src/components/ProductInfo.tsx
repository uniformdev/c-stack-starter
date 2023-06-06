import { FC, useEffect, useMemo } from 'react';
import { useUniformContext } from '@uniformdev/context-react';
import CurrencyFormatter from './CurrencyFormatter';
import { camelize } from '../utilities';

interface Props {
  product: Type.Product;
}

const ProductInfo: FC<Props> = ({ product }) => {
  const { context } = useUniformContext();
  const { name, price, subCategories = [] } = product || {};

  const enrichments = useMemo(
    () =>
      subCategories.map((subCategory: string) => ({
        cat: 'subCategory',
        key: camelize(subCategory),
        str: 5,
      })),
    [subCategories]
  );

  useEffect(() => {
    context.update({ enrichments });
  }, [context, enrichments]);

  return (
    <div className="md:pt-8 pt-4">
      {Boolean(name) && <p className="font-bold text-4xl lg:text-5xl">{name}</p>}
      <div className="flex flex-row w-28 justify-between mt-8 leading-5 text-2xl">
        {Boolean(price) && <CurrencyFormatter amount={product.price} />}
      </div>
      <div className="border-gray-100 border-t-2 my-7" />
    </div>
  );
};

export default ProductInfo;
