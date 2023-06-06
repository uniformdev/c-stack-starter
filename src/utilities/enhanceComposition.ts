import { enhance, EnhancerBuilder, RootComponentInstance } from '@uniformdev/canvas';
import { getBundledEnhancers } from './enhancers/bundledEnhancers';

export const enhanceComposition = async ({
  composition,
  preEnhancer,
  extendEnhancer,
  preview = false,
}: {
  composition: RootComponentInstance;
  preEnhancer?: EnhancerBuilder;
  extendEnhancer?: (enhancer: EnhancerBuilder) => void;
  preview?: boolean;
}) => {
  // 1. apply pre enhancers (for cases where we need changes for the same parameter type twice)
  if (preEnhancer) {
    await enhance({
      composition,
      enhancers: preEnhancer,
      context: { preview },
      onErrors: errors => console.warn('Failed to pre-enhance the composition:', errors),
    });
  }

  // 2. apply bundled enhancers
  const bundledEnhancers = await getBundledEnhancers(composition);

  // 3. extend enhancer by app specific params
  if (extendEnhancer) extendEnhancer(bundledEnhancers);

  await enhance({
    composition,
    enhancers: bundledEnhancers,
    context: { preview },
    onErrors: errors => console.warn('Failed to enhance the composition:', errors),
  });
};
