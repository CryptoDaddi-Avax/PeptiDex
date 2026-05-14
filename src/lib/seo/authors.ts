export interface AuthorProfile {
  name: string;
  jobTitle?: string;
  url: string;
  sameAs: string[];
}

export const authors: Record<string, AuthorProfile> = {
  vance: {
    name: "Dr. E. Vance",
    jobTitle: "Clinical Research Director",
    url: "https://peptidex.app/authors/dr-e-vance",
    sameAs: [],
  },
  researchTeam: {
    name: "PEPTIDEX Research Team",
    jobTitle: "Editorial Team",
    url: "https://peptidex.app/authors/research-team",
    sameAs: ["https://peptidex.app"],
  },
  cryptoDaddi: {
    name: "The Crypto Daddi",
    jobTitle: "Founder & Lead Researcher",
    url: "https://peptidex.app/authors/the-crypto-daddi",
    sameAs: ["https://x.com/TheCryptoDaddi"],
  },
};

/**
 * Builds a schema.org/Person or schema.org/Organization for the author.
 */
export function buildAuthorSchema(authorKey: keyof typeof authors): Record<string, unknown> {
  const author = authors[authorKey];
  return {
    "@type": authorKey === "researchTeam" ? "Organization" : "Person",
    name: author.name,
    url: author.url,
    ...(author.jobTitle && { jobTitle: author.jobTitle }),
    ...(author.sameAs.length > 0 && { sameAs: author.sameAs }),
  };
}
