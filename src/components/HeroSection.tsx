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
      <section className="relative min-h-[75svh] lg:min-h-[80svh] bg-black">
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
        <div className="relative z-10 min-h-[75svh] lg:min-h-[80svh] flex flex-col">
          <div className="flex-1 flex items-start pt-8 sm:pt-12 lg:pt-16 px-8 sm:px-12 lg:px-24 xl:px-32">
            <div className="w-full max-w-7xl mx-auto">
              <div className="max-w-2xl text-primary-foreground text-center sm:text-left mx-auto sm:mx-0">
                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-serif font-bold leading-tight">
                  Get Matched With a Trusted Local Shower Installer
                </h1>
                <p className="mt-6 text-base sm:text-lg lg:text-xl opacity-90 leading-relaxed text-balance">
                  Check local availability, compare your options, and request real pricing in about 60 seconds. No obligation.
                </p>
                <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 justify-center sm:justify-start text-sm sm:text-base opacity-90">
                  <li>✓ Installed in 2–3 days</li>
                  <li>✓ No grout</li>
                  <li>✓ No mold</li>
                  <li>✓ No scrubbing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section below hero */}
      <section className="bg-foreground text-primary-foreground py-8 sm:py-10 px-6 sm:px-12 lg:px-24">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <p className="text-sm sm:text-base lg:text-lg opacity-90 leading-relaxed max-w-xl mx-auto text-balance">
            Trusted local installers serve your area. Check availability in about 60 seconds.
          </p>

          <button
            onClick={scrollToForm}
            className="bg-cta text-cta-foreground font-semibold px-8 py-4 rounded-sm text-base sm:text-lg uppercase tracking-wider hover:opacity-90 active:opacity-80 transition-opacity touch-manipulation shadow-lg"
          >
            See My Local Installer Options
          </button>
          <p className="text-xs opacity-60">🔒 No obligation · 60 seconds · No spam</p>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
