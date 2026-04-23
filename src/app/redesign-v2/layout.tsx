import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PeptiDex — The Research Index (Preview)",
  description: "Preview of the redesigned PeptiDex homepage.",
};

export default function RedesignLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* 
        Hide the root layout's shell elements so the redesign page has full control.
        This overrides the root layout's Header, Footer, BottomNav, etc.
      */}
      <style>{`
        #site-header-container,
        #site-footer-container,
        #site-bottomnav-container,
        #site-lead-container,
        #site-mobilesource-container,
        #site-first-visit-container,
        #site-pwa-container,
        #site-disclaimer-container {
          display: none !important;
        }
        #main-content {
          padding-bottom: 0 !important;
          min-height: 100vh !important;
        }
        body {
          background: #0a0a0b !important;
        }
      `}</style>
      {children}
    </>
  );
}
