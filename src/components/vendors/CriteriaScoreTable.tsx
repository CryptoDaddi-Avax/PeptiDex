/**
 * CriteriaScoreTable — a vendor's points on each published ranking criterion.
 * Server-safe (no hooks). Criteria and rules: src/lib/vendor-criteria.ts.
 */
import Link from "next/link";
import type { VendorCriteriaScore } from "@/lib/vendor-criteria";

const cell: React.CSSProperties = { padding: "6px 10px", borderBottom: "1px solid var(--line, rgba(255,255,255,0.08))", verticalAlign: "top" };

export function CriteriaScoreTable({
  score,
  caption,
  showMethodologyLink = true,
}: {
  score: VendorCriteriaScore;
  caption?: string;
  showMethodologyLink?: boolean;
}) {
  return (
    <div data-criteria-score style={{ margin: "12px 0 20px", overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        {caption && (
          <caption style={{ textAlign: "left", fontWeight: 600, padding: "0 0 6px" }}>{caption}</caption>
        )}
        <thead>
          <tr>
            <th scope="col" style={{ ...cell, textAlign: "left" }}>Criterion</th>
            <th scope="col" style={{ ...cell, textAlign: "right", whiteSpace: "nowrap" }}>Points</th>
            <th scope="col" style={{ ...cell, textAlign: "left" }}>Based on</th>
          </tr>
        </thead>
        <tbody>
          {score.parts.map((p) => (
            <tr key={p.key}>
              <td style={cell}>{p.label}</td>
              <td style={{ ...cell, textAlign: "right", whiteSpace: "nowrap" }}>
                {p.points}/{p.max}
              </td>
              <td style={{ ...cell, opacity: 0.8 }}>{p.basis}</td>
            </tr>
          ))}
          <tr>
            <td style={{ ...cell, fontWeight: 700 }}>Total</td>
            <td style={{ ...cell, textAlign: "right", fontWeight: 700, whiteSpace: "nowrap" }}>
              {score.total}/{score.max}
            </td>
            <td style={cell} />
          </tr>
        </tbody>
      </table>
      {showMethodologyLink && (
        <p style={{ fontSize: 12, opacity: 0.75, marginTop: 6 }}>
          Scores use the vendor&apos;s own published information and our checked list prices. PeptiDex does
          not test products.{" "}
          <Link href="/about/methodology#vendor-ranking">How vendors are ranked →</Link>
        </p>
      )}
    </div>
  );
}
