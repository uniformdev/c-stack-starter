import { FC } from 'react';
import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import Container, { PaddingSize } from '../components/Container';
import Button from '../components/Button';

type CallToActionProps = ComponentProps<{
  title: string;
  description: string;
  buttonCopy?: string;
  buttonLink?: Type.ProjectMapLink;
}>;

const CallToAction: FC<CallToActionProps> = ({ title, description, buttonCopy, buttonLink }) => (
  <Container paddingTop={PaddingSize.Large} paddingBottom={PaddingSize.Large}>
    <div className="md:w-9/12 m-auto">
      {title && <p className="md:text-center font-bold text-4xl">{title}</p>}
      <p className="md:text-center mt-6">{description}</p>
      {buttonCopy && buttonLink && (
        <Button.Link href={buttonLink.path} styleType="primary" ariaLabel={buttonCopy} className="mt-8 px-4">
          <span>{buttonCopy}</span>
        </Button.Link>
      )}
    </div>
  </Container>
);

registerUniformComponent({
  type: 'callToAction',
  component: CallToAction,
});

export default CallToAction;
