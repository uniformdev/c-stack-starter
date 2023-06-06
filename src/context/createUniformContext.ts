import { NextPageContext } from 'next';
import getConfig from 'next/config';
import { Context, ManifestV2, enableContextDevTools, enableDebugConsoleLogDrain } from '@uniformdev/context';
import { NextCookieTransitionDataStore } from '@uniformdev/context-next';
import { enableGoogleGtagAnalytics } from '@uniformdev/context-gtag';
import manifest from './manifest.json';

const { googleAnalyticsId } = getConfig().publicRuntimeConfig;

// Docs: https://docs.uniform.app/guides/classification/activation
const createUniformContext = (serverContext?: NextPageContext) => {
  const plugins = [enableContextDevTools(), enableDebugConsoleLogDrain('debug')];
  // Docs: https://docs.uniform.app/integrations/data/google-analytics#activate-ga-plugin
  if (googleAnalyticsId) plugins.push(enableGoogleGtagAnalytics({ emitAll: true }));

  return new Context({
    defaultConsent: true,
    manifest: manifest as ManifestV2,
    transitionStore: new NextCookieTransitionDataStore({ serverContext }),
    plugins,
  });
};

export default createUniformContext;
