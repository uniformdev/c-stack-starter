import { FC } from 'react';
import Image from 'next/image';
import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import Container, { PaddingSize } from '../components/Container';
import Button from '../components/Button';
import { getFormattedLink } from '../utilities/index';

export enum HeroVariants {
  Centered = 'centered',
}

type HeroProps = ComponentProps<{
  title: string;
  subtitle?: string;
  buttonCopy?: string;
  buttonLink?: Type.ProjectMapLink;
  image?: {
    src: string;
  };
}>;

const HeroDefault: FC<HeroProps> = ({ title, subtitle, buttonCopy = '', buttonLink, image }) => {
  const imgScr = getFormattedLink(image?.src);
  return (
    <div className="relative">
      {Boolean(imgScr) && (
        <Image className="absolute w-full h-full object-cover" src={imgScr} fill alt="hero-image" priority />
      )}
      <Container paddingTop={PaddingSize.None} paddingBottom={PaddingSize.None} backgroundClassName="pt-40">
        <div className="bg-neutral-800 md:bg-orange-900 relative md:-bottom-11 ml-auto w-full md:max-w-[658px] p-12 md:pl-24 md:pr-7 md:py-20 z-10">
          <p className="font-bold text-3xl md:text-4xl lg:text-5xl text-white">{title}</p>
          {Boolean(subtitle) && <p className="mt-7 font-extrabold text-white">{subtitle}</p>}
          {buttonCopy && buttonLink && (
            <Button.Link href={buttonLink.path} styleType="primary" className="lg:w-1/2 mt-9 text-sm max-w-full">
              <span>{buttonCopy}</span>
            </Button.Link>
          )}
        </div>
      </Container>
    </div>
  );
};

const HeroCentered: FC<HeroProps> = ({ title, subtitle, buttonCopy = '', buttonLink, image }) => {
  const imgScr = getFormattedLink(image?.src);
  return (
    <div className="relative">
      {Boolean(imgScr) && (
        <Image className="absolute w-full h-full object-cover" src={imgScr} fill alt="hero-image" priority />
      )}
      <div className="relative flex items-center flex-col px-4 py-56 z-30">
        <p className="text-white text-3xl md:text-5xl font-bold text-center max-w-[600px]">{title}</p>
        {Boolean(subtitle) && <p className="mt-7 font-extrabold text-white">{subtitle}</p>}
        {buttonCopy && buttonLink && (
          <Button.Link href={buttonLink.path} styleType="primary" className="mt-9 text-sm md:w-[329px] max-w-full">
            <span>{buttonCopy}</span>
          </Button.Link>
        )}
      </div>
    </div>
  );
};

const Hero: FC<HeroProps> = props =>
  props.component.variant === HeroVariants.Centered ? <HeroCentered {...props} /> : <HeroDefault {...props} />;

['centered', undefined].forEach(variantId =>
  registerUniformComponent({
    type: 'hero',
    component: Hero,
    variantId,
  })
);

export default Hero;
