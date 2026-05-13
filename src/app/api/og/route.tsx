import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // ?title=...&type=...(default, article)
    const title = searchParams.get('title');
    const type = searchParams.get('type') || 'article'; // 'default' or 'article'

    // PeptiDex Brand Accent Colors
    const VIOLET = '#8b5cf6';
    const EMERALD = '#34d399';

    if (type === 'default' || !title) {
      return new ImageResponse(
        (
          <div
            style={{
              height: '100%',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#09090b', // zinc-950
              backgroundImage: 'radial-gradient(circle at 50% 50%, #18181b 0%, #09090b 100%)',
            }}
          >
            {/* Hexagon Background Pattern */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                opacity: 0.05,
                backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\\"24\\" height=\\"40\\" viewBox=\\"0 0 24 40\\" xmlns=\\"http://www.w3.org/2000/svg\\"%3E%3Cpath d=\\"M0 40c5.523 0 10-4.477 10-10V10C10 4.477 5.523 0 0 0h24c-5.523 0-10 4.477-10 10v20c0 5.523 5.523 10 10 10H0z\\" fill=\\"%238b5cf6\\" fill-rule=\\"evenodd\\"%/>%3C/svg%3E")',
              }}
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div 
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '96px', 
                  height: '96px', 
                  backgroundColor: 'rgba(139, 92, 246, 0.1)', 
                  border: '2px solid rgba(139, 92, 246, 0.3)',
                  borderRadius: '24px' 
                }}
              >
                {/* SVG DNA/Helix abstract icon */}
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={VIOLET} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m10 22 5-20" />
                  <path d="m14 2 5 20" />
                  <path d="M12.5 12h-1" />
                  <path d="M13.5 17h-3" />
                  <path d="M11.5 7h4" />
                </svg>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h1 style={{ fontSize: '84px', fontWeight: 800, color: '#f4f4f5', margin: 0, lineHeight: 1 }}>
                  PeptiDex
                </h1>
                <p style={{ fontSize: '32px', color: '#a1a1aa', margin: 0, marginTop: '8px', fontWeight: 600, letterSpacing: '0.05em' }}>
                  Evidence-Based Peptide Science
                </p>
              </div>
            </div>

            <div style={{ position: 'absolute', bottom: '48px', color: EMERALD, fontSize: '28px', fontWeight: 700, letterSpacing: '0.1em' }}>
              PEPTIDEX.APP
            </div>
          </div>
        ),
        {
          width: 1200,
          height: 630,
        }
      );
    }

    // ARTICLE OR PROFILE OG IMAGE
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#09090b',
            backgroundImage: 'radial-gradient(circle at top left, #18181b 0%, #09090b 100%)',
            padding: '80px',
            position: 'relative',
          }}
        >
          {/* Top Left Branding */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div 
              style={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '48px', 
                height: '48px', 
                backgroundColor: 'rgba(139, 92, 246, 0.1)', 
                border: '1px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '12px' 
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={VIOLET} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m10 22 5-20" />
                <path d="m14 2 5 20" />
              </svg>
            </div>
            <span style={{ fontSize: '32px', fontWeight: 800, color: '#f4f4f5' }}>
              PeptiDex
            </span>
          </div>

          {/* Center Main Title */}
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: 'auto', marginBottom: 'auto' }}>
            <h1 
              style={{
                fontSize: title.length > 60 ? '64px' : '84px',
                fontWeight: 800, 
                color: '#ffffff',
                lineHeight: 1.1,
                marginBottom: '24px',
                maxWidth: '1000px',
              }}
            >
              {title}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ height: '4px', width: '48px', backgroundColor: EMERALD, borderRadius: '2px' }} />
              <span style={{ fontSize: '28px', color: '#a1a1aa', fontWeight: 600 }}>
                {type === 'profile' ? 'Clinical Peptide Profile' : 'Research & Analysis'}
              </span>
            </div>
          </div>

          {/* Bottom Right Attribution */}
          <div style={{ position: 'absolute', bottom: '80px', right: '80px', display: 'flex', alignItems: 'center', gap: '12px' }}>
             <span style={{ fontSize: '24px', color: '#71717a', fontWeight: 600, letterSpacing: '0.05em' }}>
              peptidex.app
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );

  } catch (e: any) {
    console.error('OG Image Generation Error:', e);
    return new Response(`Failed to generate image`, {
      status: 500,
    });
  }
}
