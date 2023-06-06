import { FC } from 'react';
import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import { Next, documentToHtmlString, Options } from '@contentful/rich-text-html-renderer';
import { BLOCKS, NodeData, Document } from '@contentful/rich-text-types';
import Container, { PaddingSize } from '../components/Container';

const documentToHtmlStringOptions: Options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: NodeData, next: Next) => `<p class="pb-10 text-lg">${next(node.content)}</p>`,
    [BLOCKS.HEADING_2]: (node: NodeData, next: Next) => `<h2 class="pb-2.5 text-2xl">${next(node.content)}</h2>`,
    [BLOCKS.EMBEDDED_ASSET]: (node: NodeData) =>
      `<div class="pb-12 lg:pb-16 max-w-4xl">
            <img src="${node.data.target.fields.file.url}" 
                    height="${node.data.target.fields.file.details.image.height}"
                    width="${node.data.target.fields.file.details.image.width}" alt="${node.data.target.fields.description}"/>
          </div>`,
  },
};

type ArticleProps = ComponentProps<{
  title?: string;
  content?: string | Document;
}>;

const Article: FC<ArticleProps> = ({ title, content = '' }) => (
  <Container paddingTop={PaddingSize.Large} paddingBottom={PaddingSize.Large}>
    <h1 className="text-4xl md:text-5xl font-extrabold pb-6 md:pb-14">{title}</h1>
    {Boolean(content) && (
      <div
        dangerouslySetInnerHTML={{
          __html: typeof content === 'string' ? content : documentToHtmlString(content, documentToHtmlStringOptions),
        }}
        className="max-w-5xl prose"
      />
    )}
  </Container>
);

registerUniformComponent({
  type: 'article',
  component: Article,
});

export default Article;
