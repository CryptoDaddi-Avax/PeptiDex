import Link from "next/link";
import { ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";

export function BlogVendorCallout() {
    return (
        <div style={{
            margin: '40px 0',
            padding: 32,
            background: 'rgba(201,169,97,0.04)',
            border: '1px solid rgba(201,169,97,0.2)',
            position: 'relative',
            overflow: 'hidden',
        }}>
            <div style={{
                display: 'flex', flexDirection: 'column', gap: 24,
                position: 'relative', zIndex: 10,
            }}>
                <div>
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12,
                    }}>
                        <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: 6,
                            padding: '4px 10px',
                            background: 'rgba(201,169,97,0.08)',
                            border: '1px solid rgba(201,169,97,0.2)',
                            fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.15em',
                            textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500,
                        }}>
                            <ShieldCheck style={{ width: 12, height: 12 }} /> Trusted Vendor
                        </span>
                    </div>

                    <h3 style={{
                        fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 400,
                        color: 'var(--ink)', marginBottom: 8, letterSpacing: '-0.02em',
                    }}>
                        Amino Club &mdash; COA-Verified Research Peptides
                    </h3>
                    
                    <div style={{
                        display: 'flex', flexWrap: 'wrap', alignItems: 'center',
                        gap: 16, marginBottom: 16,
                        fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em',
                        textTransform: 'uppercase', color: 'var(--gold)',
                    }}>
                        {['Third-party tested', '99%+ purity', 'US shipping', 'Batch-specific COAs'].map(item => (
                            <span key={item} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                <CheckCircle2 style={{ width: 12, height: 12 }} /> {item}
                            </span>
                        ))}
                    </div>

                    <p style={{
                        fontFamily: 'var(--sans)', fontSize: 11, color: 'var(--ink-mute)',
                        maxWidth: 560,
                    }}>
                        PeptiDex may earn a commission from purchases made through affiliate links. This does not affect our editorial independence or rigorous vetting standards.
                    </p>
                </div>

                <div>
                    <a
                        href="https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: 8,
                            padding: '14px 24px',
                            background: 'transparent',
                            color: 'var(--gold)',
                            fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 500,
                            letterSpacing: '0.15em', textTransform: 'uppercase',
                            border: '1px solid var(--gold)',
                            textDecoration: 'none', transition: 'all 0.3s',
                        }}
                    >
                        Shop Research Peptides <ArrowRight style={{ width: 14, height: 14 }} />
                    </a>
                </div>
            </div>
        </div>
    );
}
