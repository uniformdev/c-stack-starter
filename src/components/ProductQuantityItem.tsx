import { FC } from 'react';
import Image from 'next/image';
import Button from './Button';

interface Props {
  quantity: number;
  onClickIncrement: () => void;
  onClickDecrement: () => void;
}

const ProductQuantityItem: FC<Props> = ({ quantity, onClickIncrement, onClickDecrement }) => (
  <div className="flex justify-between flex-row lg:w-48 w-40 max-h-13 border border-gray-100">
    <Button.Action
      styleType="arrow"
      disabled={quantity === 1}
      className="bg-white !border-0 !border-r border-gray-100"
      onClick={onClickDecrement}
    >
      <Image
        width={18}
        height={18}
        src="https://res.cloudinary.com/uniformdev/image/upload/v1675622825/vNext%20Demos/icons/icon-minus_rl6auo.svg"
        alt="icon minus"
        unoptimized
      />
    </Button.Action>
    <div className="lg:w-1/2 w-1/3 my-auto text-center font-bold">{quantity}</div>
    <Button.Action styleType="arrow" className="bg-white !border-0 !border-l" onClick={onClickIncrement}>
      <Image
        width={18}
        height={18}
        src="https://res.cloudinary.com/uniformdev/image/upload/v1675622526/vNext%20Demos/icons/icon-plus_pcl73l.svg"
        alt="icon plus"
        unoptimized
      />
    </Button.Action>
  </div>
);

export default ProductQuantityItem;
