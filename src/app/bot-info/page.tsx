export const metadata = {
  title: 'Citation Monitor Bot Info | PeptiDex',
};

export default function BotInfoPage() {
  return (
    <div className="p-8 max-w-3xl mx-auto min-h-[60vh] text-zinc-300">
      <h1 className="text-3xl font-bold text-zinc-100 mb-6">PeptiDex Citation Monitor</h1>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-zinc-200 mb-2">What is this?</h2>
          <p className="leading-relaxed">
            The PeptiDex Citation Monitor (`PeptiDex-CitationMonitor/1.0`) is a benign, read-only crawler operated by PeptiDex.app. 
            Its sole purpose is to verify the visibility of our official coupon codes on sites where they have been explicitly submitted or organically discovered.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-200 mb-2">How it behaves</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Rate Limited:</strong> It fetches a maximum of 1 URL every 10 seconds per domain.</li>
            <li><strong>Daily Cap:</strong> It will never request more than 50 URLs from a single domain per day.</li>
            <li><strong>Robots.txt:</strong> It strictly obeys all `robots.txt` directives, including `Crawl-delay` and `Disallow`.</li>
            <li><strong>Read-Only:</strong> It does not submit forms, execute JavaScript, or scrape content outside of searching for our specific coupon string.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-200 mb-2">Contact & Opt-Out</h2>
          <p className="leading-relaxed">
            If you are a site administrator and would like to block this bot, you can simply disallow `PeptiDex-CitationMonitor` in your `robots.txt`. 
            For any questions or manual exclusion requests, please email us at <a href="mailto:admin@peptidex.app" className="text-gold hover:underline">admin@peptidex.app</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
