'use client';
import { NewsletterSignup } from '@/components/newsletter-signup';
import './Footer.css';

export default function Footer() {
  return (
    <footer>
      <div className="footer-wrap">
        {/* Newsletter above footer columns */}
        <div style={{ marginBottom: 48 }}>
          <NewsletterSignup source="footer" />
        </div>

        <div className="footer-top">
          <div className="footer-brand">
            <h3>Pepti<em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Dex</em></h3>
            <p>The independent, evidence-based peptide research index. Trusted by researchers worldwide for unbiased education and verified sourcing.</p>
          </div>
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
            <h4>§ Source</h4>
            <ul>
              <li><a href="/vendors">Vendor Reviews</a></li>
              <li><a href="/tools/pricing">Price Comparison</a></li>
              <li><a href="/tools/compare">Compare Tool</a></li>
              <li><a href="/tools/cycle-planner">Cycle Planner</a></li>
              <li><a href="/stacks">Community Stacks</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>§ About</h4>
            <ul>
              <li><a href="/about">Our Mission</a></li>
              <li><a href="/about/editorial-policy">Editorial Policy</a></li>
              <li><a href="/disclaimer">Medical Disclaimer</a></li>
              <li><a href="/about">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-last-reviewed">
          Last reviewed: <time dateTime="2026-04-29">April 29, 2026</time> · PeptiDex Editorial Team
        </div>
        <div className="footer-bottom">
          <div>© 2026 PeptiDex. All rights reserved.</div>
          <div className="footer-bottom-links">
            <a href="/legal">Privacy</a>
            <a href="/legal">Terms</a>
            <a href="/disclaimer">Disclosures</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

