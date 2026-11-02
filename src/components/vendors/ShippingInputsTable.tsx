/**
 * ShippingInputsTable — every vendor's Shipping-criterion inputs, with the
 * vendor page each one was read from and the date it was read.
 * Server-safe (no hooks). Formula: src/lib/vendor-criteria.ts.
 */
import type { Vendor } from "@/data/vendors";
import { SHIPPING_CARTS, shippingCostAt } from "@/lib/vendor-criteria";
import { FounderOwnershipDisclosure } from "@/components/disclosures/FounderOwnershipDisclosure";

const cell: React.CSSProperties = { padding: "6px 10px", borderBottom: "1px solid var(--line, rgba(255,255,255,0.08))", verticalAlign: "top" };
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-11-02" → "Nov 2, 2026" (fixed format, no locale) */
function day(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

const UNVERIFIED = <em style={{ opacity: 0.7 }}>unverified</em>;

function money(n: number | null) {
  if (n === null) return UNVERIFIED;
  return n === 0 ? "Free" : `$${n % 1 ? n.toFixed(2) : n}`;
}

export function ShippingInputsTable({ vendors }: { vendors: Vendor[] }) {
  return (
    <div data-shipping-inputs style={{ margin: "12px 0 20px", overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <caption style={{ textAlign: "left", fontWeight: 600, padding: "0 0 6px" }}>
          Shipping inputs — standard US shipping, before discount codes
        </caption>
        <thead>
          <tr>
            <th scope="col" style={{ ...cell, textAlign: "left" }}>Vendor</th>
            {SHIPPING_CARTS.map((c) => (
              <th scope="col" key={c.cartUsd} style={{ ...cell, textAlign: "right", whiteSpace: "nowrap" }}>
                ${c.cartUsd} order
              </th>
            ))}
            <th scope="col" style={{ ...cell, textAlign: "left" }}>Dispatch</th>
            <th scope="col" style={{ ...cell, textAlign: "left" }}>Outside US</th>
            <th scope="col" style={{ ...cell, textAlign: "right", whiteSpace: "nowrap" }}>Points</th>
            <th scope="col" style={{ ...cell, textAlign: "left" }}>Source (checked)</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((v) => {
            const p = v.shipping;
            const pts = v.criteria.parts.find((x) => x.key === "shipping");
            return (
              <tr key={v.slug}>
                <td style={cell}>
                  {v.name}
                  {v.category === "oral" && " (oral)"}
                  <FounderOwnershipDisclosure vendorSlug={v.slug} variant="inline" />
                </td>
                {SHIPPING_CARTS.map((c) => (
                  <td key={c.cartUsd} style={{ ...cell, textAlign: "right", whiteSpace: "nowrap" }}>
                    {money(shippingCostAt(p, c.cartUsd))}
                  </td>
                ))}
                <td style={cell}>
                  {p.dispatchBusinessDays === null ? UNVERIFIED : `≤ ${p.dispatchBusinessDays} business day${p.dispatchBusinessDays === 1 ? "" : "s"}`}
                </td>
                <td style={cell}>{p.international === null ? UNVERIFIED : p.international ? "Yes" : "No"}</td>
                <td style={{ ...cell, textAlign: "right", whiteSpace: "nowrap" }}>
                  {pts ? `${pts.points}/${pts.max}` : "—"}
                </td>
                <td style={{ ...cell, opacity: 0.85 }}>
                  {p.sources.map((s) => (
                    <div key={s.url}>
                      <a href={s.url} target="_blank" rel="nofollow noopener noreferrer" style={{ textDecoration: "underline" }}>
                        {s.label}
                      </a>{" "}
                      ({day(s.checked)})
                    </div>
                  ))}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
