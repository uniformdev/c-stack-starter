import { ComponentParameter } from '@uniformdev/canvas';

export interface EnhanceParameter<T> {
  parameter: ComponentParameter<T>;
}

export const togglePageScroll = (isHiddenManual?: boolean): void => {
  const html = document.querySelector('html');
  if (!html) return;
  const isHidden = isHiddenManual ?? html.style.overflow === 'hidden';
  html.style.overflow = isHidden ? 'auto' : 'hidden';
};

export const getFormattedPath = (location: string, slug?: string | string[] | null): string => {
  const slugString = Array.isArray(slug) ? slug.join('/') : slug;
  const path = location.endsWith('/') ? location : `${location}/`;
  return slugString ? `${path}${slugString}` : path;
};

export const getFormattedLink = (link?: string): string => {
  if (!link) {
    return '';
  }
  try {
    return new URL(link?.startsWith('http') ? link : `https://${link}`).toString();
  } catch (e) {
    return '';
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getErrorPageProps = (e: any): { notFound: true; revalidate: number } => {
  console.info('Get Error Page Props', e);
  if (e?.statusCode !== 404) throw e;
  return { notFound: true, revalidate: 31536000 };
};

export const camelize = (str: string) => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => (index === 0 ? word.toLowerCase() : word.toUpperCase()))
    .replace(/\s+/g, '');
};

export const fromCamelCase = (str: string) =>
  str.replace(/([^-])([A-Z])/g, (match, group1, group2) => group1 + ' ' + group2).toLowerCase();
