import { FC, PropsWithChildren } from 'react';
import Container, { BackgroundTypes } from './Container';
import Carousel from './Carousel';
import Button from './Button';

type CarouselBlockProps = PropsWithChildren<{
  title: string;
  subTitle?: string;
  buttonCopy?: string;
  buttonLink?: string;
  isDark?: boolean;
}>;

const CarouselBlock: FC<CarouselBlockProps> = ({ title, subTitle, buttonCopy, buttonLink, children, isDark }) => (
  <Container backgroundType={isDark ? BackgroundTypes.Dark : BackgroundTypes.LightGray}>
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-10">
      <div className="mb-6 md:mb-0 basis-2/3 xl:basis-auto">
        <p className="font-acumin font-extrabold text-3xl">{title}</p>
        {subTitle && <p className="sm:pr-8">{subTitle}</p>}
      </div>
      {buttonCopy && buttonLink && (
        <Button.Link href={buttonLink} styleType={isDark ? 'secondary' : 'primary'}>
          <span>{buttonCopy}</span>
        </Button.Link>
      )}
    </div>
    <Carousel isDark={isDark} itemClass="px-2.5 my-px" containerClass="-mx-2.5">
      {children}
    </Carousel>
  </Container>
);

export default CarouselBlock;
