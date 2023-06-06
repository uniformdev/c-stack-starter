import getConfig from 'next/config';
import { createPreviewHandler } from '@uniformdev/canvas-next';
import { enhanceComposition } from '@/utilities/enhanceComposition';

// Preview Mode, more info https://nextjs.org/docs/advanced-features/preview-mode
export default createPreviewHandler({
  secret: () => getConfig().serverRuntimeConfig.previewSecret,
  enhance: async composition => enhanceComposition({ composition, preview: true }),
});
