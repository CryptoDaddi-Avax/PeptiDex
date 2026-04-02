import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
            <div className="text-6xl mb-4">🧬</div>
            <h1 className="text-3xl font-bold text-zinc-100 mb-2">Page Not Found</h1>
            <p className="text-zinc-400 mb-6 max-w-md">
                This peptide sequence doesn&apos;t exist in our database. It may have been moved or the URL might be incorrect.
            </p>
            <div className="flex gap-3">
                <Link
                    href="/"
                    className="px-5 py-2.5 rounded-xl bg-violet-500/20 border border-violet-500/30 text-sm font-medium text-violet-300 hover:bg-violet-500/30 transition-colors"
                >
                    ← Back Home
                </Link>
                <Link
                    href="/library"
                    className="px-5 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-sm font-medium text-zinc-300 hover:bg-zinc-700 transition-colors"
                >
                    Browse Library
                </Link>
            </div>
        </div>
    );
}
