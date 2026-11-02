#!/usr/bin/env node
/**
 * Vendor link label check — fails the build when a link's visible vendor name
 * is not the vendor the link actually goes to (e.g. "Visit Amino Club" pointing
 * at elyriabio.com, or "Elyria Bio review" pointing at /vendors/amino-club).
 *
 *   node scripts/check-vendor-link-labels.mjs --source   (prebuild: TSX/MD source)
 *   node scripts/check-vendor-link-labels.mjs --html     (postbuild: rendered .next HTML)
 *
 * Vendors (name, slug, domain) are read from src/data/vendors.ts so the check
 * follows the registry. A link "names" a vendor when its text, aria-label or
 * title contains that vendor's name.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const mode = process.argv.includes("--html") ? "html" : "source";

// ── Vendor registry ──────────────────────────────────────────────────────────
const registry = fs.readFileSync(path.join(ROOT, "src/data/vendors.ts"), "utf8").replace(/\r\n/g, "\n");
const VENDORS = [];
for (const block of registry.split(/\n  \{\n/).slice(1)) {
  const slug = block.match(/\bslug: "([^"]+)"/)?.[1];
  const name = block.match(/\bname: "([^"]+)"/)?.[1];
  const domain = block.match(/\bdomainMatch: "([^"]+)"/)?.[1];
  if (slug && name && domain) VENDORS.push({ slug, name, domains: [domain] });
}
// Extra destination domains used by some links
const EXTRA = { "bio-longevity-labs": ["biolongevitylabs.com"], "limitless-life": ["limitlesslife"] };
for (const v of VENDORS) v.domains.push(...(EXTRA[v.slug] ?? []));
if (VENDORS.length < 5) {
  console.error(`check-vendor-link-labels: parsed only ${VENDORS.length} vendors from vendors.ts`);
  process.exit(1);
}

function destinationVendor(href) {
  const h = href.toLowerCase();
  const byDomain = VENDORS.find((v) => v.domains.some((d) => h.includes(d.toLowerCase())));
  if (byDomain) return byDomain;
  // Internal vendor pages: /vendors/<slug>, /peptides/<p>/at/<slug>, /coupon-codes/<slug>
  const m = h.match(/^(?:https:\/\/peptidex\.app)?\/(?:vendors|coupon-codes|peptides\/[^/]+\/at)\/([a-z0-9-]+)(?:[/?#]|$)/);
  return m ? VENDORS.find((v) => v.slug === m[1]) : undefined;
}

function namedVendors(text) {
  const t = text.toLowerCase();
  return VENDORS.filter((v) => t.includes(v.name.toLowerCase()));
}

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");

const errors = [];
function check(file, href, label, where) {
  const dest = destinationVendor(href);
  if (!dest) return;
  const wrong = namedVendors(label).filter((v) => v.slug !== dest.slug);
  if (wrong.length) {
    errors.push(`${file}${where ? `:${where}` : ""}\n    label names ${wrong.map((v) => v.name).join(", ")} but link goes to ${dest.name}\n    href:  ${href.slice(0, 140)}\n    label: ${label.replace(/\s+/g, " ").trim().slice(0, 160)}`);
  }
}

function walk(dir, exts, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === "node_modules" || e.name === "__tests__") continue;
      walk(p, exts, out);
    } else if (exts.some((x) => e.name.endsWith(x))) out.push(p);
  }
  return out;
}

// ── HTML mode: every prerendered page ────────────────────────────────────────
if (mode === "html") {
  const appDir = path.join(ROOT, ".next/server/app");
  if (!fs.existsSync(appDir)) {
    console.error("check-vendor-link-labels --html: .next/server/app not found (run after next build)");
    process.exit(1);
  }
  const files = walk(appDir, [".html"]);
  const A = /<a\b([^>]*)>([\s\S]*?)<\/a>/gi;
  for (const f of files) {
    const html = fs.readFileSync(f, "utf8");
    for (const m of html.matchAll(A)) {
      const attrs = m[1];
      const href = decode(attrs.match(/\bhref="([^"]*)"/i)?.[1] ?? "");
      if (!href) continue;
      const aria = decode(attrs.match(/\baria-label="([^"]*)"/i)?.[1] ?? "");
      const title = decode(attrs.match(/\btitle="([^"]*)"/i)?.[1] ?? "");
      // Visible text; the founder-ownership note inside a link only ever names its own destination
      const text = decode(m[2].replace(/<[^>]+>/g, " "));
      check(path.relative(appDir, f), href, `${text} ${aria} ${title}`);
    }
  }
  report(`${files.length} HTML pages`);
}

// ── Source mode: links rendered only in the browser (popups, quiz, banners) ──
if (mode === "source") {
  const files = walk(path.join(ROOT, "src"), [".tsx", ".md"]);
  // JSX/HTML link elements; href may be a literal or an expression
  const EL = /<(AffiliateLink|TrackedOutboundLink|VendorOutboundLink|Link|a)\b([\s\S]*?)>([\s\S]*?)<\/\1>/g;
  let checked = 0;
  for (const f of files) {
    const src = fs.readFileSync(f, "utf8");
    for (const m of src.matchAll(EL)) {
      const attrs = m[2];
      const inner = m[3];
      const line = src.slice(0, m.index).split("\n").length;
      const hrefLit = attrs.match(/\bhref=(?:"([^"]*)"|\{\s*["'`]([^"'`$]*)["'`]\s*\})/);
      const hrefExpr = attrs.match(/\bhref=\{([^}]*)\}/)?.[1] ?? "";
      // Only literal text counts as a label in source; {expressions} are data-driven
      const aria = attrs.match(/\baria-label=(?:"([^"]*)"|\{`([^`]*)`\})/);
      const label = `${inner.replace(/\{[^{}]*\}/g, " ").replace(/<[^>]+>/g, " ")} ${aria ? (aria[1] ?? aria[2] ?? "").replace(/\$\{[^}]*\}/g, " ") : ""}`;
      if (hrefLit) {
        checked++;
        check(path.relative(ROOT, f), hrefLit[1] ?? hrefLit[2], label, line);
      } else if (/_PROMO\b|[A-Za-z_]*(?:Url|URL)\b/.test(hrefExpr)) {
        // Destination is data-driven, so a hard-coded vendor name in the label can drift from it
        checked++;
        const named = namedVendors(label);
        if (named.length) {
          errors.push(`${path.relative(ROOT, f)}:${line}\n    data-driven link (href={${hrefExpr.trim().slice(0, 80)}}) hard-codes vendor name ${named.map((v) => v.name).join(", ")} — derive the label from the destination (vendorLinkName / promo.vendorName)`);
        }
      }
    }
  }
  report(`${checked} vendor-capable links in ${files.length} source files`);
}

function report(scope) {
  if (errors.length) {
    console.error(`\n✗ Vendor link label check FAILED (${errors.length}) — ${scope}\n`);
    for (const e of errors) console.error("  " + e + "\n");
    process.exit(1);
  }
  console.log(`✓ Vendor link label check passed (${mode}) — ${scope}; vendors: ${VENDORS.map((v) => v.name).join(", ")}`);
}
