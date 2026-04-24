import { useEffect, useState, lazy, Suspense } from "react";
import { X, ChevronLeft } from "lucide-react";
import { LEAD_FORM_OPEN_EVENT } from "@/lib/openLeadForm";

const MultiStepFormSection = lazy(() => import("@/components/MultiStepFormSection"));

const FormModal = () => {
  const [open, setOpen] = useState(false);

  // Listen for global open events from any CTA
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener(LEAD_FORM_OPEN_EVENT, handler);
    return () => window.removeEventListener(LEAD_FORM_OPEN_EVENT, handler);
  }, []);

  // Close on Escape; lock body scroll while open
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        // Backdrop click closes
        if (e.target === e.currentTarget) setOpen(false);
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Check shower availability"
    >
      <div
        className="relative w-full min-h-full sm:min-h-0 sm:my-8 sm:max-w-2xl sm:rounded-xl bg-background shadow-2xl animate-in slide-in-from-bottom-4 sm:zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky close bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-background/95 backdrop-blur-sm border-b border-border rounded-t-xl">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-1 -ml-2 rounded touch-manipulation"
            aria-label="Back to browsing"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to browsing
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors touch-manipulation"
            aria-label="Close form"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form content — MultiStepFormSection renders its own <section> with padding */}
        <Suspense
          fallback={
            <div className="py-20 text-center text-sm text-muted-foreground">Loading…</div>
          }
        >
          <MultiStepFormSection />
        </Suspense>

        {/* Bottom escape hatch */}
        <div className="px-6 pb-6 pt-2 text-center">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors"
          >
            ← Back to browsing the page
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
