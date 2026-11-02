import { ShieldAlert, ExternalLink } from 'lucide-react';

export function TrustBlock() {
  return (
    <div className="pd-trust-block">
      <div className="pd-trust-educational">
        <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <p>
          <strong>⚠️ Educational only · Not medical advice · For research use only.</strong>{' '}
          Information on this page is compiled from peer-reviewed literature and is intended
          strictly for educational and informational purposes. Peptides discussed may be
          compounds not approved by the FDA for human use — consult a licensed healthcare professional before
          considering any peptide compound.{' '}
          <a href="/disclaimers" className="pd-trust-link">
            Read our full disclaimer <ExternalLink className="w-3 h-3 inline" />
          </a>
        </p>
      </div>
      <div className="pd-trust-affiliate">
        <p>
          <strong>Affiliate disclosure:</strong> PeptiDex may earn commissions from purchases
          made through vendor links on this page, and PeptiDex&apos;s founder owns Elyria Bio. Vendors are
          ranked only on our published criteria.{' '}
          <a href="/about/methodology" className="pd-trust-link">
            See our methodology
          </a>{' '}
          ·{' '}
          <a href="/about/editorial-policy" className="pd-trust-link">
            Editorial policy
          </a>
        </p>
      </div>
    </div>
  );
}
