const scrollToForm = () => {
  document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
};

const FinalCTASection = () => {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 bg-primary text-primary-foreground">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-3">
          Limited Local Availability
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-4 text-balance">
          See If a Trusted Local Installer Is Available in Your Area
        </h2>
        <p className="opacity-80 max-w-xl mx-auto mb-3 text-base sm:text-lg lg:text-xl text-balance">
          Local installers are booking 3–5 weeks out in most areas. Check availability in about 60 seconds.
        </p>
        <p className="opacity-60 text-base sm:text-lg mb-8 text-balance">
          No obligation. No spam. You decide whether to move forward.
        </p>
        <button
          onClick={scrollToForm}
          className="bg-cta text-cta-foreground font-semibold px-10 py-4 rounded-sm text-base uppercase tracking-wider hover:opacity-90 active:opacity-80 transition-opacity touch-manipulation shadow-lg"
        >
          Check Local Availability
        </button>
        <p className="text-xs opacity-40 mt-2">🔒 Takes 60 seconds · We will never share your info</p>
      </div>
    </section>
  );
};

export default FinalCTASection;
