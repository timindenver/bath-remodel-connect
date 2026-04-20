const scrollToForm = () => {
  document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
};

const FinalCTASection = () => {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 bg-primary text-primary-foreground">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-3">
          Limited Installer Availability
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-4 text-balance">
          Spots Are Filling Up — Reserve Your In-Home Visit Today
        </h2>
        <p className="opacity-80 max-w-xl mx-auto mb-3 text-base sm:text-lg lg:text-xl text-balance">
          Our local installers are booking 3–5 weeks out in most areas. Match now to claim a priority appointment slot.
        </p>
        <p className="opacity-60 text-base sm:text-lg mb-8 text-balance">
          Free, no obligation, no pressure — just real availability and real pricing.
        </p>
        <button
          onClick={scrollToForm}
          className="bg-cta text-cta-foreground font-semibold px-10 py-4 rounded-sm text-base uppercase tracking-wider hover:opacity-90 active:opacity-80 transition-opacity touch-manipulation shadow-lg"
        >
          Get Matched With a Local Installer
        </button>
        <p className="text-xs opacity-40 mt-2">🔒 Takes 60 seconds · We will never share your info</p>
      </div>
    </section>
  );
};

export default FinalCTASection;
