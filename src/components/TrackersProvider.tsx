import { FC, memo, useEffect, useState, useCallback } from 'react';
import Script from 'next/script';
import getConfig from 'next/config';

const { googleAnalyticsId } = getConfig().publicRuntimeConfig;

const TrackersProvider: FC = () => {
  const [shouldLoad, setShouldLoad] = useState(false);

  const listener = useCallback(() => setShouldLoad(true), []);

  useEffect(() => {
    if (shouldLoad || !googleAnalyticsId) return;
    window.addEventListener('mousemove', listener, { passive: true });
    window.addEventListener('touchmove', listener, { passive: true });
    return () => {
      window.removeEventListener('mousemove', listener);
      window.removeEventListener('touchmove', listener);
    };
  }, [shouldLoad, listener]);

  if (!shouldLoad || !googleAnalyticsId) return null;
  window.removeEventListener('mousemove', listener);
  window.removeEventListener('touchmove', listener);

  return <Script src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`} />;
};

export const GoogleAnalyticsGtag = () => {
  if (!googleAnalyticsId) return null;
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());
        
              gtag('config', '${googleAnalyticsId}');
            `,
      }}
    />
  );
};

export default memo(TrackersProvider);
