// ─── AUTHORS — re-export shim ────────────────────────────────────
// Source of truth has moved to src/content/authors/*.json,
// loaded via src/lib/authors.ts. This module remains as a stable
// import path for the ~23 call sites that import from '@/data/authors'.

export type { Author, AuthorRole } from '@/lib/authors';
export {
  getAllAuthors as _getAllAuthors,
  getAuthorBySlug,
  getAllAuthorSlugs,
  getAuthorsByRole,
  getAuthorSlug,
  getAuthorByName,
  getCanonicalSlug,
  getPersonSchema,
} from '@/lib/authors';

import { getAllAuthors } from '@/lib/authors';

/** Legacy export used by older call sites — eagerly evaluates the collection. */
export const authors = getAllAuthors();
