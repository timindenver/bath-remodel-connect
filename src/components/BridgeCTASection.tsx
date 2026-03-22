const scrollToForm = () => {
  document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
};

const BridgeCTASection = () => {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 bg-primary text-primary-foreground">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold mb-4">
          You've Done the Research. Now Get the Real Numbers.
        </h2>
        <p className="text-lg sm:text-xl opacity-90 mb-3">
          The only thing left is to see what it actually costs for your bathroom.
        </p>
        <p className="opacity-80 max-w-xl mx-auto mb-8">
          In 60 seconds, find out if a certified solid surface installer is available in your area — and get a free, no-pressure quote for your project.
        </p>
        <button
          onClick={scrollToForm}
          className="bg-accent text-accent-foreground font-semibold px-10 py-4 rounded-sm text-base uppercase tracking-wider hover:opacity-90 active:opacity-80 transition-opacity touch-manipulation shadow-lg"
        >
          See If You Qualify — Free Quote
        </button>
        <p className="mt-4 text-sm opacity-60">
          Takes 60 seconds. No credit card. No obligation.
        </p>
      </div>
    </section>
  );
};

export default BridgeCTASection;
