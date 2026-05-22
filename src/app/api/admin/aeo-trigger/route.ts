/**
 * One-shot admin trigger for manual AEO poll invocation.
 * Protected by CRON_SECRET. Used to bootstrap and test the pipeline
 * without requiring Inngest dashboard access.
 * DELETE this route after confirmed live (or leave protected — it's safe).
 *
 * Usage: GET /api/admin/aeo-trigger?secret=<CRON_SECRET>
 */
import { NextRequest, NextResponse } from 'next/server';
import { inngest } from '@/inngest/client';

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');

  if (!secret || secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Send the event that aeoDailyPoll can also respond to
    await inngest.send({
      name: 'aeo/daily.poll.manual',
      data: { triggered_by: 'admin-manual', triggered_at: new Date().toISOString() },
    });

    return NextResponse.json({
      ok: true,
      message: 'aeo/daily.poll.manual event sent to Inngest',
      note: 'Check Inngest dashboard for run status. Function must have this event as trigger to execute.',
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
