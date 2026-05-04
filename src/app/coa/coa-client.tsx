'use client';

import { useState } from 'react';
import { vendorVerifications } from '@/data/verification-data';
import VerificationDashboard from '@/components/verification-dashboard';
import CommunitySubmitModal from '@/components/community-submit-modal';

export default function CoaClientPage() {
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [submitVendor, setSubmitVendor] = useState<{ slug: string; name: string } | null>(null);

  const openSubmit = (slug: string, name: string) => {
    setSubmitVendor({ slug, name });
    setSubmitModalOpen(true);
  };

  return (
    <>
      <section id="per-vendor-dashboards">
        <div className="section-label" style={{ marginBottom: 32 }}>§ Per-Vendor Verification</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
          {vendorVerifications.map(v => (
            <div key={v.vendorSlug} id={`verify-${v.vendorSlug}`} style={{
              borderTop: '1px solid var(--line)', paddingTop: 48,
            }}>
              <VerificationDashboard
                verification={v}
                onOpenSubmitModal={() => openSubmit(v.vendorSlug, v.vendorName)}
              />
            </div>
          ))}
        </div>
      </section>

      <CommunitySubmitModal
        isOpen={submitModalOpen}
        onClose={() => setSubmitModalOpen(false)}
        vendorSlug={submitVendor?.slug}
        vendorName={submitVendor?.name}
      />
    </>
  );
}
