import { FC } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import Button from './Button';

interface Props {
  direction: 'left' | 'right';
  isDark?: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const DarkImageSrc =
  'https://res.cloudinary.com/uniformdev/image/upload/v1675764370/vNext%20Demos/icons/icon-arrow-white_dhbqim.svg';
const WhiteImageSrc =
  'https://res.cloudinary.com/uniformdev/image/upload/v1675764370/vNext%20Demos/icons/icon-arrow-black_cqgain.svg';

const ButtonArrow: FC<Props> = ({ direction, isDark = false, onClick, disabled }) => (
  <Button.Action
    styleType="arrow"
    className={isDark ? 'border-white bg-black' : 'border-black bg-white'}
    onClick={onClick}
    disabled={disabled}
    aria-label={`${direction} slide`}
    type="button"
  >
    <Image
      className={classNames({ 'rotate-180': direction === 'left' })}
      width={20}
      height={20}
      src={isDark ? DarkImageSrc : WhiteImageSrc}
      alt={`${direction} arrow`}
      unoptimized
    />
  </Button.Action>
);

export default ButtonArrow;
