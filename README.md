# PeptiDex — Your All-in-One Peptide Companion

A production-ready, mobile-first educational web app for peptide research education. Built with Next.js 15, TypeScript, Tailwind CSS, shadcn/ui, and Supabase.

> ⚠️ **Disclaimer**: This app is for educational and research purposes only. It does not constitute medical advice. Always consult a licensed physician.

## Features

- 🎯 **Goal-Based Stack Recommendations** — Select your health goals and get research-backed peptide stack suggestions
- 📚 **Peptide Library** — 18 peptides with searchable grid, detailed mechanism explanations, and study citations
- 🔬 **Research Hub** — 40+ cited studies with PubMed links, filterable by evidence level
- 🔖 **Saved Stacks** — Bookmark stacks locally (Supabase sync available)
- 📱 **PWA Ready** — Installable on mobile devices
- 🌙 **Dark Mode** — Beautiful dark-first design with glassmorphism effects

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Animations**: Framer Motion
- **Auth & DB**: Supabase (optional)
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

Create a `.env.local` file:

```env
# Supabase (optional — app works without these)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Deploy to Vercel

### One-Click Deploy

1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Add environment variables (if using Supabase)
5. Click **Deploy**

### CLI Deploy

```bash
npm i -g vercel
vercel
```

## Connect Supabase (Free Tier)

1. Create a free project at [supabase.com](https://supabase.com)
2. Go to **Settings → API** and copy the URL and anon key
3. Add them as environment variables in Vercel (or `.env.local`)
4. (Optional) Create a `saved_stacks` table:

```sql
create table saved_stacks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id),
  stack_name text not null,
  stack_data jsonb not null,
  created_at timestamptz default now()
);

alter table saved_stacks enable row level security;

create policy "Users can manage their own stacks"
  on saved_stacks for all
  using (auth.uid() = user_id);
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (dark mode, nav, disclaimer)
│   ├── page.tsx            # Home — goal selector
│   ├── results/            # Stack recommendations
│   ├── library/            # Peptide library + detail pages
│   ├── research/           # Research hub
│   └── saved/              # Saved stacks
├── components/             # Reusable UI components
│   ├── ui/                 # shadcn/ui primitives
│   ├── goal-chip.tsx       # Goal selector chips
│   ├── peptide-card.tsx    # Peptide grid cards
│   ├── stack-card.tsx      # Expandable stack cards
│   └── ...
├── data/                   # Peptide database & types
│   ├── peptides.ts         # 18 peptides
│   ├── stacks.ts           # 10 goal-based stacks
│   ├── goals.ts            # Goal definitions
│   └── types.ts            # TypeScript types
├── hooks/                  # Custom hooks
└── lib/                    # Utilities
```

## License

MIT
