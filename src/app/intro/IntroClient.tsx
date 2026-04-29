'use client';

import Link from 'next/link';
import './intro-redesign.css';

const tracks = [
  {
    num: '01',
    title: 'The Beginner Track',
    desc: "You've heard about peptides but don't know where to start. We cover the basics: what peptides are, how they work in the body, key terminology, and the regulatory landscape you need to understand before going further.",
    lessons: 5,
    time: '30 min',
    anchor: '#beginner',
  },
  {
    num: '02',
    title: 'The Practical Track',
    desc: 'You understand the basics and want to know how peptides are actually used in research and protocols. Dosing reference, route of administration, cycle structure, common stacks, and what published trials actually showed.',
    lessons: 7,
    time: '50 min',
    anchor: '#intermediate',
  },
  {
    num: '03',
    title: 'The Sourcing Track',
    desc: "You're ready to source. Learn what to look for in a Certificate of Analysis, how to spot vendor red flags, what reconstitution looks like, and the legal landscape around purchasing research compounds.",
    lessons: 6,
    time: '40 min',
    anchor: '#advanced',
  },
];

const beginnerLessons = [
  { num: '§ Lesson 01', title: 'What are peptides?', desc: 'Amino acid chains, biology, and what makes a peptide different from a protein.', href: '/blog/are-peptides-safe' },
  { num: '§ Lesson 02', title: 'How peptides work', desc: 'Receptor binding, signaling cascades, and what "selectivity" actually means.', href: '#' },
  { num: '§ Lesson 03', title: 'The regulatory landscape', desc: "FDA-approved vs research-only. Understanding what's legal and what isn't.", href: '#' },
  { num: '§ Lesson 04', title: 'Key terminology', desc: 'SubQ, IM, reconstitution, BAC water, lyophilized — the vocab you need.', href: '#' },
  { num: '§ Lesson 05', title: 'Categories of peptides', desc: 'Healing, GH, fat loss, cognitive, immune — the 6 families explained.', href: '/library' },
];

const practicalLessons = [
  { num: '§ Lesson 01', title: 'Routes of administration', desc: 'Subcutaneous, intramuscular, intranasal, oral — when to use what.', href: '#' },
  { num: '§ Lesson 02', title: 'Dosing fundamentals', desc: 'mcg vs mg, titration protocols, and why "more" is rarely better.', href: '#' },
  { num: '§ Lesson 03', title: 'Cycle structure', desc: 'On/off cycles, continuous protocols, and desensitization risks.', href: '#' },
  { num: '§ Lesson 04', title: 'Common stacks', desc: 'CJC+Ipa, BPC+TB-500, healing combos — evidence-based synergies.', href: '/stacks' },
  { num: '§ Lesson 05', title: 'Reading clinical trials', desc: 'Phase I vs III, endpoints, n=, and how to assess trial quality.', href: '/tools/evidence' },
  { num: '§ Lesson 06', title: 'Bloodwork markers', desc: 'IGF-1, GH serum, CBC, CMP — what to test and when.', href: '#' },
  { num: '§ Lesson 07', title: 'Side effects & risks', desc: 'Realistic assessment of risk profiles across peptide categories.', href: '#' },
];

const sourcingLessons = [
  { num: '§ Lesson 01', title: 'What is a COA?', desc: 'Certificate of Analysis explained — HPLC, Mass Spec, what purity means.', href: '#' },
  { num: '§ Lesson 02', title: 'Vendor red flags', desc: 'Fake COAs, rebranded generics, and the warning signs.', href: '#' },
  { num: '§ Lesson 03', title: 'Reconstitution guide', desc: 'BAC water, insulin syringes, storage — the practical how-to.', href: '/tools/calculator' },
  { num: '§ Lesson 04', title: 'Verified vendors', desc: 'Our independently verified vendor index with COA and pricing data.', href: '/vendors' },
  { num: '§ Lesson 05', title: 'Legal status (US)', desc: 'Research chemicals vs scheduled substances — the regulatory reality.', href: '#' },
  { num: '§ Lesson 06', title: 'International shipping', desc: 'Customs, import laws, and jurisdiction-specific considerations.', href: '#' },
];

export default function IntroClient() {
  return (
    <main id="main-content">
      <header className="page-header">
        <div className="page-header-grid"></div>
        <div className="page-header-wrap">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <span className="current">Peptide 101</span>
          </div>
          <div className="section-label">§ Start Here</div>
          <h1 className="page-title">
            Peptide research,<br /><em>from the start</em>.
          </h1>
          <p className="page-subtitle">
            A structured introduction to peptide therapy: the science, the regulation, the sourcing,
            and the practical considerations. No prior knowledge assumed.
          </p>
        </div>
      </header>

      <div className="container">
        <div className="section-label" style={{ marginTop: 60 }}>§ Choose your path</div>
        <h2 className="serif" style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1.05 }}>
          Three <em className="text-gold italic">tracks</em>.
        </h2>
        <p style={{ color: 'var(--ink-dim)', fontSize: 17, maxWidth: 680, marginTop: 16, lineHeight: 1.6 }}>
          Pick the path that matches where you are. Each track is a structured sequence of articles, profiles, and tools.
        </p>

        <div className="intro-tracks reveal">
          {tracks.map((t) => (
            <Link href={t.anchor} key={t.num} className="track-card">
              <div className="num-large">{t.num}</div>
              <h3>{t.title}</h3>
              <p>{t.desc}</p>
              <div className="track-meta">
                <span>{t.lessons} lessons</span>
                <span>{t.time} →</span>
              </div>
            </Link>
          ))}
        </div>

        {/* ── Beginner Track ── */}
        <div className="reveal" id="beginner">
          <div className="section-label">§ Beginner — The Basics</div>
          <h2 className="serif" style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Start with the <em className="text-gold italic">fundamentals</em>.
          </h2>
          <div className="lesson-grid">
            {beginnerLessons.map((l) => (
              <Link href={l.href} key={l.num} className="lesson-card">
                <div className="num">{l.num}</div>
                <h4>{l.title}</h4>
                <p>{l.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Practical Track ── */}
        <div className="reveal" id="intermediate" style={{ marginTop: 80 }}>
          <div className="section-label">§ Practical — Protocols & Research</div>
          <h2 className="serif" style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            From theory to <em className="text-gold italic">practice</em>.
          </h2>
          <div className="lesson-grid">
            {practicalLessons.map((l) => (
              <Link href={l.href} key={l.num} className="lesson-card">
                <div className="num">{l.num}</div>
                <h4>{l.title}</h4>
                <p>{l.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Sourcing Track ── */}
        <div className="reveal" id="advanced" style={{ marginTop: 80 }}>
          <div className="section-label">§ Sourcing — Verification & Procurement</div>
          <h2 className="serif" style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Source with <em className="text-gold italic">confidence</em>.
          </h2>
          <div className="lesson-grid">
            {sourcingLessons.map((l) => (
              <Link href={l.href} key={l.num} className="lesson-card">
                <div className="num">{l.num}</div>
                <h4>{l.title}</h4>
                <p>{l.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="disclaimer-strip">
        ⚠ Educational only · Not medical advice · Most peptides are research-only / not FDA-approved
      </div>
    </main>
  );
}
