/**
 * Privacy-Safe Session Token
 * ─────────────────────────────────────────────────────────────
 * Generates a daily-rotating, browser-local session identifier.
 *
 * Design decisions:
 *  - No IP, no user-agent, no cookies, no PII.
 *  - Token = SHA-256(stable_browser_noise + UTC_date_string)
 *  - Stable browser noise: a random UUID stored in localStorage
 *    under key `_pdx_sid_seed`. It never leaves the browser.
 *  - The noise seed + today's UTC date are hashed → the session
 *    ID rotates at UTC midnight automatically.
 *  - If localStorage is unavailable (SSR, private browsing),
 *    falls back to a random ephemeral ID (not persisted).
 */

const SEED_KEY = "_pdx_sid_seed";

function utcDateString(): string {
  const d = new Date();
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
}

function randomHex(len = 16): string {
  const arr = new Uint8Array(len);
  crypto.getRandomValues(arr);
  return Array.from(arr)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function sha256(input: string): Promise<string> {
  const encoded = new TextEncoder().encode(input);
  const buf = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

let _cachedSessionId: string | null = null;
let _cachedDate: string | null = null;

export async function getSessionId(): Promise<string> {
  if (typeof window === "undefined") {
    // SSR — no session tracking
    return "server";
  }

  const today = utcDateString();

  // Return cached value if the date hasn't changed since last call
  if (_cachedSessionId && _cachedDate === today) {
    return _cachedSessionId;
  }

  let seed: string;
  try {
    seed = localStorage.getItem(SEED_KEY) ?? "";
    if (!seed) {
      seed = randomHex(16);
      localStorage.setItem(SEED_KEY, seed);
    }
  } catch {
    // Private browsing / storage blocked — ephemeral
    seed = randomHex(16);
  }

  const id = await sha256(`${seed}:${today}`);
  _cachedSessionId = id.slice(0, 32); // 128-bit truncation — more than sufficient
  _cachedDate = today;
  return _cachedSessionId;
}
