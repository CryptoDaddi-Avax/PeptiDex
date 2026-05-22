import { Inngest } from 'inngest';

export const inngest = new Inngest({
  id: 'peptidex-aeo',
  signingKey: process.env.INNGEST_SIGNING_KEY,
});
