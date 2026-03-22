const scrollToForm = () => {
  document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
};

const FinalCTASection = () => {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 bg-primary text-primary-foreground">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold mb-4">
          Availability for In-Home Estimates Is Limited
        </h2>
        <p className="opacity-80 max-w-xl mx-auto mb-8 text-sm sm:text-base">
          Our certified contractors book up fast, especially during peak remodeling season.
          Check availability now to lock in your free estimate.
        </p>
        <button
          onClick={scrollToForm}
          className="bg-accent text-accent-foreground font-semibold px-10 py-4 rounded-sm text-base uppercase tracking-wider hover:opacity-90 active:opacity-80 transition-opacity touch-manipulation shadow-lg"
        >
          Check Availability Now
        </button>
      </div>
    </section>
  );
};

export default FinalCTASection;
