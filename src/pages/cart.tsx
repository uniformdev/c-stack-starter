import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import { getLinksFromProjectMap, getState } from '@/utilities/canvas';

const ShoppingCart = dynamic(() => import('@/components').then(com => com.ShoppingCart), { ssr: false });

export const getStaticProps: GetStaticProps<{ preview?: boolean }> = async context => {
  const { preview } = context;
  const navigationLinks = await getLinksFromProjectMap(
    {
      state: getState(preview),
    },
    preview
  );
  return {
    props: {
      preview: Boolean(preview),
      navigationLinks,
    },
    revalidate: 31536000,
  };
};

export default ShoppingCart;
