'use client';
import { NewsletterSignup } from '@/components/newsletter-signup';
import { LAST_REVIEWED_DATE, LAST_REVIEWED_ISO } from '@/data/constants';
import { resetOnboarding } from '@/lib/storage/onboarding';
import './Footer.css';

export default function Footer() {
  const handleResetOnboarding = () => {
    resetOnboarding();
    window.location.reload();
  };

  return (
    <>
      {/* Newsletter section above footer — stays as-is */}
      <div className="footer-newsletter-wrap">
        <div className="footer-newsletter-inner">
          <NewsletterSignup source="footer" />
        </div>
      </div>

      {/* Legal / disclaimer band (between newsletter and footer) */}
      <div className="legal-band">
        <p>PeptiDex is an independent research reference. We are not a pharmacy, clinic, or medical provider. We do not sell, ship, or handle controlled substances. We provide educational reference material for researchers studying peptide pharmacology. All efficacy claims attributed to published peer-reviewed sources.</p>
      </div>

      <footer className="site-footer">
        <p className="affiliate-disclosure">
          <strong>Affiliate Disclosure:</strong> Some links earn PeptiDex a small commission at no extra cost to you. This keeps the site free and ad-free. We only feature products we&apos;ve independently verified.
        </p>
        <div className="footer-inner">
          <p className="footer-tagline">The independent, evidence-based peptide research index.</p>
          <div className="footer-cols">
            <div className="footer-col">
              <h4>§ Learn</h4>
              <ul>
                <li><a href="/intro">Peptide 101</a></li>
                <li><a href="/library">Library</a></li>
                <li><a href="/tools/evidence">Evidence Dashboard</a></li>
                <li><a href="/blog">Blog</a></li>
                <li><a href="/faq">FAQ</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>§ Tools</h4>
              <ul>
                <li><a href="/tools/cycle-planner">Cycle Planner</a></li>
                <li><a href="/tools/evidence">Evidence Dashboard</a></li>
                <li><a href="/tools/compare">Peptide Comparison</a></li>
                <li><a href="/tools/pricing">Price Comparison</a></li>
                <li><a href="/tools/calculator">Reconstitution Calc</a></li>
                <li><a href="/tools/coa">COA Analyzer</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>§ Source</h4>
              <ul>
                <li><a href="/vendors">Vendor Reviews</a></li>
                <li><a href="/vendors/amino-club">Amino Club Review</a></li>
                <li><a href="/coa">COA Library</a></li>
                <li><a href="/stacks">Peptide Stacks</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>§ About</h4>
              <ul>
                <li><a href="/about">Our Mission</a></li>
                <li><a href="/about/editorial-policy">Editorial Policy</a></li>
                <li><a href="/disclaimers">Medical Disclaimer</a></li>
                <li><a href="/about">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-last-reviewed">
            Last reviewed: <time dateTime={LAST_REVIEWED_ISO}>{LAST_REVIEWED_DATE}</time> · PeptiDex Editorial Team
          </div>
          <div className="footer-bottom">
            <span className="footer-copy">
              © 2026 PeptiDex. All rights reserved.
              {process.env.NODE_ENV === 'development' && (
                <button
                  onClick={handleResetOnboarding}
                  style={{
                    background: 'none',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: 'rgba(255,255,255,0.4)',
                    fontSize: '11px',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginLeft: '12px'
                  }}
                >
                  Reset onboarding
                </button>
              )}
            </span>
            <span className="footer-legal">
              <a href="/legal">Privacy</a>
              <a href="/legal">Terms</a>
              <a href="/disclaimers">Disclosures</a>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
