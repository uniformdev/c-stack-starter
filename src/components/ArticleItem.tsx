import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArticlePagesPrefixes } from '../constants';
import { getFormattedLink, getFormattedPath } from '../utilities';

interface Props {
  article: Type.Article;
}

const ArticleItem: FC<Props> = ({ article }) => {
  const { id, slug, thumbnail = '' } = article || {};
  const src = typeof thumbnail === 'string' ? thumbnail : thumbnail?.src;
  const thumbnailUrl = src ? getFormattedLink(src) : '';

  return (
    <div className="flex flex-1 flex-col w-full mx-auto mb-auto mt-0 h-full">
      <div className="relative flex flex-col items-center lg:px-0 h-full">
        <Link
          className="group flex flex-col cursor-pointer w-full h-full"
          href={getFormattedPath(ArticlePagesPrefixes.ArticlesPage, slug)}
        >
          <div className="relative p-[0px] w-full h-auto pb-[calc(100%-36px)] border-[18px] border-white outline-1 outline outline-gray-100 bg-white">
            <div className="absolute left-0 top-0 h-full w-full group-hover:scale-105 transition-all">
              {Boolean(thumbnailUrl) && (
                <Image
                  className="object-cover"
                  fill
                  src={thumbnailUrl}
                  alt={`${id}-article-image`}
                  sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              )}
            </div>
          </div>
          <span className="font-bold overflow-hidden text-ellipsis text-2xl mt-6">{article.title}</span>
        </Link>
      </div>
    </div>
  );
};
export default ArticleItem;
