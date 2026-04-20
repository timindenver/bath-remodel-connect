import before1 from "@/assets/before-after/before-1.webp";
import after1 from "@/assets/before-after/after-1.webp";

const PAIRS = [
  {
    before: before1,
    after: after1,
    caption: "From Hard-to-Clean Tile to a Modern Grout-Free Shower",
    tag: "2–3 day install",
  },
];

const BeforeAfterSection = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground text-balance">
            Real Before & After Transformations
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg lg:text-xl text-balance">
            See how local installers turn dated bathrooms into clean, modern, grout-free showers — often in just 2–3 days.
          </p>
        </div>

        <div className="space-y-12 sm:space-y-16">
          {PAIRS.map((pair, idx) => (
            <div key={idx}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Before */}
                <figure className="relative overflow-hidden rounded-xl shadow-lg bg-muted">
                  <div className="absolute top-3 left-3 z-10">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-foreground/85 text-background text-xs sm:text-sm font-semibold uppercase tracking-wider backdrop-blur-sm">
                      Before
                    </span>
                  </div>
                  <img
                    src={pair.before}
                    alt={`Before remodel: ${pair.caption}`}
                    className="w-full h-72 sm:h-96 lg:h-[28rem] object-cover"
                    loading="lazy"
                  />
                </figure>

                {/* After */}
                <figure className="relative overflow-hidden rounded-xl shadow-lg bg-muted">
                  <div className="absolute top-3 left-3 z-10">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-md">
                      After
                    </span>
                  </div>
                  <img
                    src={pair.after}
                    alt={`After remodel: ${pair.caption}`}
                    className="w-full h-72 sm:h-96 lg:h-[28rem] object-cover"
                    loading="lazy"
                  />
                </figure>
              </div>
              {pair.caption && (
                <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
                  <p className="text-center text-sm sm:text-base text-muted-foreground font-medium">
                    {pair.caption}
                  </p>
                  {pair.tag && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                      {pair.tag}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
