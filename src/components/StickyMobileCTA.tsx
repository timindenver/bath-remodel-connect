import { useEffect, useState } from "react";


const scrollToForm = () => {
  document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
};

const StickyMobileCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden p-3 bg-background/95 backdrop-blur-sm border-t border-border shadow-lg">
      <button
        onClick={scrollToForm}
        className="w-full bg-accent text-accent-foreground font-semibold py-3.5 rounded-sm text-sm uppercase tracking-wider hover:opacity-90 active:opacity-80 transition-opacity touch-manipulation"
      >
        Request a Solid Surface Shower Estimate
      </button>
      <p className="text-[10px] text-muted-foreground text-center mt-1">🔒 We will never share your info</p>
    </div>
  );
};

export default StickyMobileCTA;
