import { ChildEnhancerBuilder, enhance, EnhancerBuilder, ComponentEnhancerOptions } from '@uniformdev/canvas';
import { EnhanceParameter } from '../index';
import { getCompositionProps } from '../canvas';

const getArticleComponentParameterEnhancer = (article: Type.Article) => (builder: ChildEnhancerBuilder) => {
  builder.data('content', () => article.content); // To override template content
  builder.data('title', () => article.title); // To override the title specified with the canvas parameter
};

export const enhancerCustomExtenderFactory = (article: Type.Article) => (enhancer: EnhancerBuilder) => {
  enhancer.component('article', getArticleComponentParameterEnhancer(article));
};

// Get articles from the parameter. For example, from the parameter of integration
const getArticlesFromParameter =
  (articlesHashMapper: { [name: string]: unknown }) =>
  ({ parameter }: EnhanceParameter<{ slug: string }[]>) =>
    parameter.value.forEach(article => {
      articlesHashMapper[article.slug] = article;
    });

// Get articles from the component. For example, from the component whose values are set with the canvas parameters (NGM project)
const getArticleFromComponent =
  (articlesHashMapper: { [name: string]: unknown }, componentType: string[]) =>
  ({ component }: ComponentEnhancerOptions) => {
    if (!componentType.includes(component.type)) return;
    const article = Object.keys(component.parameters || {}).reduce<{ slug?: string; [name: string]: unknown }>(
      (acc, key) => ({ ...acc, [key]: component?.parameters?.[key]?.value }),
      {}
    );
    if (article?.slug) articlesHashMapper[article.slug] = article;
  };

export const getArticles = async ({
  path,
  preview,
  parameterType,
  componentType,
}: {
  path: string;
  preview: boolean;
  parameterType?: string[];
  componentType?: string[];
}): Promise<{ [name: string]: Type.Article } | null> =>
  getCompositionProps({ path, context: { preview } })
    .then(({ composition }) => {
      const articlesHashMapper = {};

      const enhancers = new EnhancerBuilder();
      if (parameterType) {
        enhancers.parameterType(parameterType, {
          enhanceOne: getArticlesFromParameter(articlesHashMapper),
        });
      }
      if (componentType) {
        // articlesNGMData is a dummy value here.
        // Enhancer is in use just to fill the articlesHashMapper object.
        // articlesHashMapper object is required to build dynamic articles pages
        enhancers.data('articlesNGMData', getArticleFromComponent(articlesHashMapper, componentType));
      }

      return enhance({
        composition,
        enhancers,
        context: { preview },
      })
        .then(() => articlesHashMapper)
        .catch(() => null);
    })
    .catch(() => null);
