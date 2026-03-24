const scrollToForm = () => {
  document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
};

const FinalCTASection = () => {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 bg-primary text-primary-foreground">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-3">
          Limited Availability
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-4 text-balance">
          Spring Remodel Season Is Here — Schedules Are Filling Up
        </h2>
        <p className="opacity-80 max-w-xl mx-auto mb-3 text-base sm:text-lg lg:text-xl text-balance">
          Our contractors are currently booking 3–5 weeks out in most areas.
          Homeowners who request a quote now get priority scheduling.
        </p>
        <p className="opacity-60 text-base sm:text-lg mb-8 text-balance">
          There's zero cost and zero obligation — but the calendar won't stay open forever.
        </p>
        <button
          onClick={scrollToForm}
          className="bg-accent text-accent-foreground font-semibold px-10 py-4 rounded-sm text-base uppercase tracking-wider hover:opacity-90 active:opacity-80 transition-opacity touch-manipulation shadow-lg"
        >
          Request a Solid Surface Shower Estimate
        </button>
        <p className="text-xs opacity-40 mt-2">🔒 We will never share your info</p>
      </div>
    </section>
  );
};

export default FinalCTASection;
