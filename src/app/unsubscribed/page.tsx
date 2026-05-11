export default function UnsubscribedPage() {
  return (
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0a0a0b" }}>
      <div style={{ textAlign: "center", maxWidth: 480, padding: "0 24px" }}>
        <div style={{ fontSize: 48, marginBottom: 24 }}>✓</div>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#e8e4de", marginBottom: 16 }}>
          You&apos;ve been unsubscribed
        </h1>
        <p style={{ fontSize: 15, color: "#a8a196", lineHeight: 1.6, marginBottom: 32 }}>
          You won&apos;t receive any more emails from The Peptide Brief. If this was a mistake, you can re-subscribe from the homepage.
        </p>
        <a
          href="/"
          style={{
            display: "inline-block",
            padding: "12px 28px",
            background: "#16a34a",
            color: "#ffffff",
            borderRadius: 8,
            fontWeight: 600,
            textDecoration: "none",
            fontSize: 14,
          }}
        >
          Back to PeptiDex
        </a>
      </div>
    </main>
  );
}
