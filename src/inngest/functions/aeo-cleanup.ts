// ═══════════════════════════════════════════════════════
// AEO Cleanup — Weekly purge of expired responses (>90 days)
// ═══════════════════════════════════════════════════════

import { inngest } from '../client';
import { createServerClient as createClient } from '@/lib/supabase-server';

export const aeoCleanup = inngest.createFunction(
  { id: 'aeo-cleanup', retries: 1, cron: 'TZ=UTC 0 3 * * 1' } as any,
  async ({ step }: any) => {
    const deleted = await step.run('purge-expired', async () => {
      const supabase = await createClient() as any;
      const { data, error } = await supabase
        .from('aeo_responses')
        .delete()
        .lt('expires_at', new Date().toISOString())
        .select('id');

      return { count: data?.length ?? 0, error: error?.message };
    });

    return { status: 'cleanup_complete', purged: deleted.count };
  }
);
