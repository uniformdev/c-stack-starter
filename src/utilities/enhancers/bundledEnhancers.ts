import { RootComponentInstance } from '@uniformdev/canvas';
import { getEnhancers } from '@uniformdev/canvas-enhancers';
import { commercetoolsPostEnhancer } from './cmsPostEnhancers/commercetoolsPostEnhancer';

const postEnhancers = new Map();
// Commercetools post enhancer
postEnhancers.set('Commercetools', commercetoolsPostEnhancer);

export const getBundledEnhancers = (composition: RootComponentInstance) => getEnhancers({ composition }, postEnhancers);
