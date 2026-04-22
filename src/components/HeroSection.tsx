import heroImage from "@/assets/hero-static.webp";

const scrollToForm = () => {
  const el = document.getElementById("lead-form");
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 20;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
};

const HeroSection = () => {
  return (
    <>
      <section className="relative min-h-[85svh] lg:min-h-[90svh] bg-black">
        {/* Static image background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={heroImage}
            alt="Woman enjoying a solid surface shower"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-hero-overlay/10" />
        </div>

        {/* Content overlay */}
        <div className="relative z-10 min-h-[85svh] lg:min-h-[90svh] flex flex-col">
          <div className="flex-1 flex items-center px-6 sm:px-12 lg:px-24 xl:px-32 py-8 sm:py-12">
            <div className="w-full max-w-7xl mx-auto">
              <div className="max-w-2xl text-primary-foreground text-center sm:text-left mx-auto sm:mx-0">
                {/* Headline - control version */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold leading-tight">
                  Get Matched With a Trusted Local Shower Installer
                </h1>
                
                {/* Offer line - prominent but premium */}
                <p className="mt-4 text-xl sm:text-2xl lg:text-3xl font-semibold text-accent drop-shadow-sm">
                  Free Quote + 1-Year Price Guarantee
                </p>
                
                {/* Subheadline */}
                <p className="mt-5 text-base sm:text-lg lg:text-xl opacity-90 leading-relaxed text-balance">
                  Check local availability, compare your options, and request real pricing in about 60 seconds. No obligation.
                </p>
                
                {/* Value props */}
                <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 justify-center sm:justify-start text-sm sm:text-base opacity-90">
                  <li>✓ Installed in 2–3 days</li>
                  <li>✓ No grout</li>
                  <li>✓ No mold</li>
                  <li>✓ No scrubbing</li>
                </ul>

                {/* Primary CTA - moved above the fold */}
                <div className="mt-8">
                  <button
                    onClick={scrollToForm}
                    className="bg-cta text-cta-foreground font-semibold px-8 py-4 rounded-sm text-base sm:text-lg uppercase tracking-wider hover:opacity-90 active:opacity-80 transition-opacity touch-manipulation shadow-lg"
                  >
                    Check My Shower Options
                  </button>
                  {/* Trust line */}
                  <p className="mt-3 text-sm opacity-80">
                    Free quote • 1-year price guarantee • No obligation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
