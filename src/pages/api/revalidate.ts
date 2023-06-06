import type { NextApiRequest, NextApiResponse } from 'next';
import { projectMapClient } from '@/utilities/canvas';

// Vercel specific, Incremental Static Regeneration. more info https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const secret = req.query.secret as string | undefined;

  if (secret !== process.env.UNIFORM_PREVIEW_SECRET) {
    return res.status(401).json({ message: 'Secret was not provided or it does not match' });
  }

  const compositionId = (req.body?.composition_id as string | undefined) || (req.body?.id as string | undefined);
  if (!compositionId || typeof compositionId !== 'string') {
    return res.status(401).json({ message: 'Composition id is not provided' });
  }

  const { nodes } = await projectMapClient.getNodes({ compositionId });
  const pathsToRevalidate: string[] = nodes?.map((n: { path: string }) => n?.path) || [];

  if (!pathsToRevalidate?.length) {
    // FixMe. We have to cover delete composition event
    return res.status(404).json({ message: 'Paths could not be resolved for composition: ' + compositionId });
  }

  try {
    console.info(`Revalidating paths: '${pathsToRevalidate}'`);
    await Promise.all((pathsToRevalidate || []).map(pagePath => res.revalidate(pagePath)));
    console.info('Revalidating completed');
    return res.json({ revalidated: true });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).json({ message: err.message, compositionId, query: req.query, body: req.body });
  }
}
