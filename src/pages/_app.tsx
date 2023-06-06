import React from 'react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { UniformContext } from '@uniformdev/context-react';
import { UniformAppProps } from '@uniformdev/context-next';
import createUniformContext from '@/context/createUniformContext';
import { Header, TrackersProvider } from '@/components';
import { CartContextProvider } from '@/context';
import '@/canvas';

import '@/styles/globals.scss';
import 'tailwindcss/tailwind.css';

const ShoppingCartModal = dynamic(() => import('@/components').then(com => com.ShoppingCartModal), { ssr: false });

const clientContext = createUniformContext();

export const App: NextPage<UniformAppProps<Type.HeaderProps>> = ({ Component, pageProps }) => (
  <UniformContext context={clientContext}>
    <CartContextProvider>
      <Component {...pageProps} headerComponent={<Header navigationLinks={pageProps.navigationLinks} />} />
      <ShoppingCartModal />
      <TrackersProvider />
    </CartContextProvider>
  </UniformContext>
);

export default App;
