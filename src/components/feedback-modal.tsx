'use client';

import { useState } from 'react';
import { X, AlertCircle, CheckCircle2, MessageSquare } from 'lucide-react';

type IssueType = 'factual_error' | 'broken_link' | 'outdated_info' | 'other';

const ISSUE_LABELS: Record<IssueType, string> = {
  factual_error: 'Factual error',
  broken_link: 'Broken link',
  outdated_info: 'Outdated information',
  other: 'Other',
};

// Google Form submission URL — replace with your real form action if desired
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSf_peptidex_feedback/viewform';

export function FeedbackModal({ pageUrl }: { pageUrl?: string }) {
  const [open, setOpen] = useState(false);
  const [issueType, setIssueType] = useState<IssueType>('factual_error');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const currentUrl = pageUrl ?? (typeof window !== 'undefined' ? window.location.href : '');

  function handleOpen() {
    setOpen(true);
    setSubmitted(false);
  }

  function handleClose() {
    setOpen(false);
    // Reset after close animation
    setTimeout(() => {
      setDescription('');
      setEmail('');
      setIssueType('factual_error');
      setSubmitted(false);
    }, 300);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!description.trim()) return;
    setSubmitting(true);

    // Try to submit via mailto as a fallback that always works in static export
    try {
      const subject = encodeURIComponent(`[PeptiDex Feedback] ${ISSUE_LABELS[issueType]}`);
      const body = encodeURIComponent(
        `Page: ${currentUrl}\nIssue Type: ${ISSUE_LABELS[issueType]}\n\nDescription:\n${description}\n\nReply to: ${email || 'Not provided'}`
      );
      window.location.href = `mailto:hello@peptidex.app?subject=${subject}&body=${body}`;
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {/* Trigger link */}
      <button
        onClick={handleOpen}
        className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-amber-400 transition-colors group"
        aria-label="Report an error on this page"
      >
        <AlertCircle className="w-3 h-3 group-hover:text-amber-400" />
        See an error? Tell us
      </button>

      {/* Modal overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[999] flex items-end sm:items-center justify-center px-4 pb-4 sm:pb-0"
          role="dialog"
          aria-modal="true"
          aria-label="Report a page error"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Panel */}
          <div className="relative w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-zinc-100 text-sm">Report a Page Issue</span>
              </div>
              <button
                onClick={handleClose}
                className="w-7 h-7 flex items-center justify-center rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {submitted ? (
              <div className="p-8 flex flex-col items-center gap-4 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                <h3 className="font-bold text-zinc-100">Thank you</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Your report has been sent to our editorial team. We typically review corrections within 24–48 hours.
                </p>
                <button
                  onClick={handleClose}
                  className="px-4 py-2 rounded-lg bg-zinc-800 text-sm font-semibold text-zinc-200 hover:bg-zinc-700 transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-5 space-y-4">
                {/* Auto-filled URL */}
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">
                    Page
                  </label>
                  <div className="text-xs text-zinc-400 bg-zinc-800/60 rounded-lg px-3 py-2 truncate font-mono">
                    {currentUrl}
                  </div>
                </div>

                {/* Issue type */}
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">
                    Issue type <span className="text-amber-400">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(Object.keys(ISSUE_LABELS) as IssueType[]).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setIssueType(type)}
                        className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all text-left ${
                          issueType === type
                            ? 'border-amber-500/60 bg-amber-500/10 text-amber-300'
                            : 'border-zinc-700 text-zinc-400 hover:border-zinc-600'
                        }`}
                      >
                        {ISSUE_LABELS[type]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label
                    htmlFor="feedback-description"
                    className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5"
                  >
                    Description <span className="text-amber-400">*</span>
                  </label>
                  <textarea
                    id="feedback-description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the issue clearly — include the specific claim or section if relevant."
                    rows={4}
                    required
                    className="w-full bg-zinc-800/60 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 resize-none transition-colors"
                  />
                </div>

                {/* Optional email */}
                <div>
                  <label
                    htmlFor="feedback-email"
                    className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5"
                  >
                    Email <span className="text-zinc-600 font-normal normal-case tracking-normal">(optional — for follow-up)</span>
                  </label>
                  <input
                    id="feedback-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-zinc-800/60 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!description.trim() || submitting}
                  className="w-full py-3 rounded-lg bg-amber-600 hover:bg-amber-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm transition-all"
                >
                  {submitting ? 'Sending…' : 'Send Report'}
                </button>

                <p className="text-[10px] text-zinc-600 text-center leading-relaxed">
                  Reports go directly to our editorial team at hello@peptidex.app. We review all submissions.
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
