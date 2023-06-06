import { FC } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Button from './Button';
import { getFormattedLink } from '../utilities';

const ArticleListItem: FC<Type.Article> = ({ slug, title, description, thumbnail }) => {
  const src = typeof thumbnail === 'string' ? thumbnail : thumbnail?.src;
  const thumbnailUrl = src ? getFormattedLink(src) : '';
  const router = useRouter();

  return (
    <div className="border border-gray-50 p-2 flex w-md h-md flex-col min-w-full min-h-full max-w-full">
      {Boolean(thumbnailUrl) && (
        <div className="shrink-0 relative w-full h-[150px]">
          <Image className="object-cover" src={thumbnailUrl} alt="" fill />
        </div>
      )}
      <div className="p-3 inline-flex flex-col h-full">
        <p className="font-bold text-2xl">{title}</p>
        <p className="pt-2 pb-2">{description}</p>
        {Boolean(slug) && (
          <Button.Link href={`${router.asPath}/${slug}`} styleType="primary" className="block mt-auto text-sm w-max">
            <span>READ ARTICLE</span>
          </Button.Link>
        )}
      </div>
    </div>
  );
};

export default ArticleListItem;
