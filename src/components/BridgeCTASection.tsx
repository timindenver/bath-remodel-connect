const scrollToForm = () => {
  document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
};

const BridgeCTASection = () => {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 bg-primary text-primary-foreground">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold mb-4">
          Already Comparing Shower Options?
        </h2>
        <p className="text-lg sm:text-xl opacity-90 mb-3">
          Your next step is simple.
        </p>
        <p className="opacity-80 max-w-xl mx-auto mb-8">
          See what solid surface options are available in your area, what they cost, 
          and whether a local certified contractor can install one for you.
        </p>
        <button
          onClick={scrollToForm}
          className="bg-accent text-accent-foreground font-semibold px-10 py-4 rounded-sm text-base uppercase tracking-wider hover:opacity-90 active:opacity-80 transition-opacity touch-manipulation shadow-lg"
        >
          Check Solid Surface Options Near Me
        </button>
        <p className="mt-4 text-sm opacity-60">
          No obligation. No pressure. Just honest information.
        </p>
      </div>
    </section>
  );
};

export default BridgeCTASection;
