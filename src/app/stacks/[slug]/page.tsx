import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { stacks, getStackBySlug } from '@/data/stacks';
import { getPeptideByName } from '@/data/peptides';
import { BookOpen, ChevronRight, Layers, ShoppingBag, ArrowRight, Beaker, Quote } from 'lucide-react';
import { AuthorByline } from '@/components/shared/AuthorByline';
import { MedicalDisclaimer } from '@/components/medical-disclaimer';
import { getAuthorBySlug, getAuthorSlug, getPersonSchema } from '@/lib/authors';
import { buildBreadcrumbSchema, buildArticleSchema, buildFAQPageSchema } from '@/lib/seo/schema';
import './stack-detail-redesign.css';

export function generateStaticParams() {
  return stacks.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const stack = getStackBySlug(slug);
    if (!stack) return { title: 'Not Found' };

    const goalName = stack.stack_name.replace(' Stack', '');
    const title = `Best Peptides for ${goalName}: Research Stack Guide | PeptiDex`;
    const descTokens = stack.peptides.map(p => p.name).join(', ');
    const rawDesc = `Explore the best research peptides for ${goalName.toLowerCase()}. Comprehensive guide covering stack protocols, synergy rationale, and studies for ${descTokens}. Educational use only.`;
    const description = rawDesc.substring(0, 160);

    return {
      title,
      description,
      alternates: {
        canonical: `https://peptidex.app/stacks/${slug}`,
      },
      openGraph: {
        title,
        description,
        url: `https://peptidex.app/stacks/${slug}`,
        type: 'article',
        images: [{ url: '/og-image.png', width: 1200, height: 630 }],
      },
    };
  });
}

export default async function StackSeoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const stack = getStackBySlug(slug);
  if (!stack) notFound();

  const DATE_MOD = stack.reviewedDate ?? '2026-04-01';
  const goalName = stack.stack_name.replace(' Stack', '');

  const authorSlug = stack.author ?? getAuthorSlug('PeptiDex Editorial');
  const authorRecord = getAuthorBySlug(authorSlug);
  const reviewerRecord = stack.medicallyReviewedBy ? getAuthorBySlug(stack.medicallyReviewedBy) : undefined;

  // --- JSON-LD SCHEMAS ---
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: 'https://peptidex.app/' },
    { name: 'Stacks', url: 'https://peptidex.app/stacks' },
    { name: stack.stack_name, url: `https://peptidex.app/stacks/${slug}` }
  ]);

  const articleSchema = {
    ...buildArticleSchema({
      headline: `Best Peptide Stack for ${goalName}, Research-Backed Protocols`,
      description: `Explore the optimal peptide combinations for ${goalName.toLowerCase()}, with synergy rationale and preclinical study data.`,
      datePublished: '2026-03-31',
      dateModified: DATE_MOD,
      author: { name: authorRecord?.name || 'PeptiDex Educational Team', url: authorRecord ? `https://peptidex.app/team/${authorSlug}` : 'https://peptidex.app' },
      url: `https://peptidex.app/stacks/${slug}`
    }),
    author: authorRecord
      ? getPersonSchema(authorRecord)
      : {
          '@type': 'Organization',
          name: 'PeptiDex Editorial Team',
          url: 'https://peptidex.app/team',
        },
    ...(reviewerRecord ? { reviewedBy: getPersonSchema(reviewerRecord) } : {}),
    ...(stack.reviewedDate ? { lastReviewed: stack.reviewedDate } : {}),
    publisher: {
      '@type': 'Organization',
      name: 'PeptiDex',
      logo: { '@type': 'ImageObject', url: 'https://peptidex.app/logo.png' },
    },
  };

  const faqSchema = buildFAQPageSchema([
    {
      q: `What peptides are in the ${stack.stack_name}?`,
      a: `This research stack primarily utilizes ${stack.peptides.map(p => p.name).join(' and ')} to target ${goalName.toLowerCase()}.`
    },
    {
      q: `How do these peptides work synergistically for ${goalName.toLowerCase()}?`,
      a: stack.synergy_rationale
    },
    {
      q: `Are these peptides safe to stack?`,
      a: `All compound combinations carry cumulative experimental risks. These protocols are derived strictly from controlled preclinical literature and are not intended for human medical application. Researchers should evaluate the safety profiles of each individual peptide.`
    }
  ]);

  return (
    <div className="stack-detail-wrap">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

        {/* ═══ BREADCRUMBS ═══ */}
        <nav aria-label="Breadcrumb" className="stack-breadcrumbs">
          <ul className="stack-breadcrumb-list">
            <li><Link href="/" className="stack-breadcrumb-link">Home</Link></li>
            <ChevronRight className="stack-breadcrumb-sep" />
            <li><Link href="/stacks" className="stack-breadcrumb-link">Stacks</Link></li>
            <ChevronRight className="stack-breadcrumb-sep" />
            <li className="stack-breadcrumb-current" aria-current="page">{stack.stack_name}</li>
          </ul>
        </nav>

        {/* ═══ DISCLAIMER ═══ */}
        <MedicalDisclaimer variant="callout" />

        {/* ═══ HEADER ═══ */}
        <h1 className="stack-detail-title">
          Best Peptide Stack for {goalName}, Research-Backed Protocols
        </h1>
        <p className="stack-detail-date">Last Updated: April 2026</p>
        <AuthorByline 
          name={authorRecord?.name ?? 'PeptiDex Editorial'} 
          date={DATE_MOD}
          variant="compact" 
          className="mt-4 mb-8"
        />

        {/* ═══ SECTION 1: COMPONENTS ═══ */}
        <section className="stack-section">
          <div className="stack-section-header">
            <Layers />
            <h2 className="stack-section-heading">What Peptides Are Used in {goalName} Research?</h2>
          </div>
          <p className="stack-section-desc">
            {stack.goal} To achieve these targeted research outcomes, this specific combination
            relies on the synergistic interactions of the following compounds:
          </p>
          <ul className="stack-pep-list">
            {stack.peptides.map((p) => {
              const pepSlug = p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
              return (
                <li key={p.name} className="stack-pep-item">
                  <div className="stack-pep-item-header">
                    <span className="stack-pep-item-name">{p.name}</span>
                    <Link href={`/peptides/${pepSlug}`} className="stack-pep-item-link">
                      View Profile <ArrowRight />
                    </Link>
                  </div>
                  <p className="stack-pep-item-role">{p.role_in_stack}</p>
                </li>
              );
            })}
          </ul>
        </section>

        {/* ═══ SECTION 2: SYNERGY ═══ */}
        <section className="stack-section">
          <div className="stack-section-header">
            <Beaker />
            <h2 className="stack-section-heading">How This Stack Is Used in Research</h2>
          </div>
          <div className="stack-synergy-box">
            <p>{stack.synergy_rationale}</p>
          </div>
        </section>

        {/* ═══ SECTION 3: STUDIES ═══ */}
        <section className="stack-section">
          <div className="stack-section-header">
            <BookOpen />
            <h2 className="stack-section-heading">Study References</h2>
          </div>
          <div className="stack-study-list">
            {stack.supporting_studies?.map((study, idx) => (
              <a key={idx} href={study.pubmed_url} target="_blank" rel="noopener noreferrer" className="stack-study-card">
                <p className="stack-study-text">
                  <Quote className="stack-study-icon" />
                  {study.description}
                </p>
                <ChevronRight className="stack-study-arrow" />
              </a>
            ))}
          </div>
        </section>

        {/* ═══ SECTION 4: SOURCE (AFFILIATE) ═══ */}
        <section className="stack-section">
          <div className="stack-source-heading">
            <ShoppingBag />
            <h2>Source This Stack</h2>
            <span className="stack-source-badge">Amino Club — Editor&apos;s Choice</span>
          </div>

          <div className="stack-source-items">
            {stack.peptides.map((p) => {
              const pepData = getPeptideByName(p.name);
              const pepSlug = p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
              
              let dosageDisplay = "Research protocol";
              if (pepData?.dosing) {
                const dose = pepData.dosing.typical_dose_mcg;
                dosageDisplay = `${dose[0]}${dose[0] !== dose[1] ? `-${dose[1]}` : ''}mcg / ${pepData.dosing.frequency.toLowerCase()}`;
              }
              const vialDisplay = pepData?.dosing?.typical_vial_mg ? `${pepData.dosing.typical_vial_mg}mg vial` : "Varies by vendor";

              const aminoUrl = `https://www.aminoclub.com/us/products/${pepSlug}?utm_source=affiliate_marketing&code=PEPTIDEX`;

              return (
                <div key={p.name} className="stack-source-item">
                  <div className="stack-source-info">
                    <h3>{p.name}</h3>
                    <div className="stack-source-meta">
                      <div className="stack-source-meta-item">
                        <div className="stack-source-dot blue" />
                        {dosageDisplay}
                      </div>
                      <div className="stack-source-meta-item">
                        <div className="stack-source-dot purple" />
                        {vialDisplay}
                      </div>
                    </div>
                  </div>
                  <a href={aminoUrl} target="_blank" rel="noopener noreferrer" className="stack-source-btn">
                    Buy from Amino Club <ArrowRight />
                  </a>
                </div>
              );
            })}
          </div>

          <div className="stack-promo-box">
            <a 
              href="https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX"
              target="_blank"
              rel="noopener noreferrer"
              className="stack-promo-main-btn"
            >
              Order Full Stack <ArrowRight />
            </a>
            <div className="stack-promo-features">
              <span className="stack-promo-feature">✓ Third-party COA tested</span>
              <span className="stack-promo-sep">•</span>
              <span className="stack-promo-feature">✓ &ge;99% purity</span>
              <span className="stack-promo-sep">•</span>
              <span className="stack-promo-feature">✓ US shipping</span>
              <span className="stack-promo-sep">•</span>
              <span className="stack-promo-feature">✓ Editor&apos;s Choice 2026</span>
            </div>
            <p className="stack-promo-disclaimer">
              <strong>Disclosure:</strong> PeptiDex is reader-supported. When you purchase
              through links on our site, we may earn an affiliate commission at no additional
              cost to you. We only recommend vendors that provide verifiable third-party testing
              for purity.
            </p>
          </div>
        </section>

        {/* ═══ FAQ ═══ */}
        <section className="stack-section">
          <h2 className="stack-section-heading" style={{marginBottom: '24px'}}>Frequently Asked Questions</h2>
          <div className="stack-faq-list">
            {faqSchema?.mainEntity.map((faq, i) => (
              <div key={i} className="stack-faq-item">
                <h3>{faq.name}</h3>
                <p>{faq.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ EXPLORE ═══ */}
        <section className="stack-section" style={{borderTop: '1px solid var(--line)', paddingTop: '40px'}}>
          <h2 className="stack-section-heading" style={{marginBottom: '24px'}}>Explore Other Goal Stacks</h2>
          <div className="stack-explore-grid">
            {stacks.filter(s => s.slug !== stack.slug).map(s => (
              <Link key={s.slug} href={`/stacks/${s.slug}`} className="stack-explore-card">
                <p>{s.stack_name}</p>
              </Link>
            ))}
          </div>
        </section>



        {/* Bottom Disclaimer */}
        <div className="stack-bottom-disclaimer">
          <p>
            <strong>DISCLAIMER:</strong> The information provided in this research guide is intended
            exclusively for educational, informational, and academic purposes. The compounds discussed
            are experimental tools not approved by the Food and Drug Administration (FDA) for human
            diagnosis, treatment, or cure of any disease. Polypharmacy compounding and stacking introduces
            significant exponential experimental variables. Always consult a licensed medical professional
            before interacting with any novel biological compounds.
          </p>
        </div>

      </div>
  );
}
