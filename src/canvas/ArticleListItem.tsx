import { FC } from 'react';
import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import BaseArticleListItem from '../components/ArticleListItem';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ArticleListItem: FC<ComponentProps<Type.Article>> = ({ component, ...props }) => (
  <BaseArticleListItem {...props} />
);

registerUniformComponent({
  type: 'articleListItem',
  component: ArticleListItem,
});

export default ArticleListItem;
