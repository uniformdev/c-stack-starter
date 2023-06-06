import { FC } from 'react';
import dynamic from 'next/dynamic';
import { useUniformCurrentComponent } from '@uniformdev/canvas-react';
import { NavigationHeader, NavigationLink } from '@/components';
import { AppPages } from '@/constants';

// local storage based fake cart functionality loaded only on the client side
const ShoppingCartIcon = dynamic(() => import('@/components').then(com => com.ShoppingCartIcon), { ssr: false });

const Header: FC<Type.HeaderProps> = ({ navigationLinks = [] }) => {
  const { data } = useUniformCurrentComponent();
  const hideHeader = data?.parameters?.hideHeader?.value;
  if (hideHeader) return null;

  return (
    <NavigationHeader cartIcon={<ShoppingCartIcon cartUrl={AppPages.Cart} />}>
      {navigationLinks.map(({ title, link }) => (
        <NavigationLink key={title} title={title} link={link} />
      ))}
    </NavigationHeader>
  );
};

export default Header;
