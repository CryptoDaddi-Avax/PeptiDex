import { serve } from 'inngest/next';
import { inngest } from '@/inngest/client';
import { aeoDailyPoll } from '@/inngest/functions/aeo-daily-poll';
import { aeoClassifyBatch } from '@/inngest/functions/aeo-classify-batch';
import { aeoWeeklyReport } from '@/inngest/functions/aeo-weekly-report';
import { aeoCleanup } from '@/inngest/functions/aeo-cleanup';

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    aeoDailyPoll,
    aeoClassifyBatch,
    aeoWeeklyReport,
    aeoCleanup,
  ],
});
