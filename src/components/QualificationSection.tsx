import { Check, X } from "lucide-react";

const isForItems = [
  "You're planning a remodel in the next 1–6 months",
  "You want something that still looks great in 20 years",
  "You're comparing options and want the real tradeoffs",
  "Your budget is $10k+ and you'd rather invest once",
  "You're open to a quick in-home visit for an exact quote",
];

const notForItems = [
  "You want the absolute cheapest option available",
  "You need it installed today, no exceptions",
  "You're just browsing with no real timeline",
  "You prefer to DIY your shower installation",
];

const scrollToForm = () => {
  document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
};

const QualificationSection = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4">
            Is This Right for You?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We turn down projects that aren't a good fit. That's how we keep our ratings at 4.9 stars.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {/* Who it IS for */}
          <div className="bg-card border border-border rounded-lg p-6 sm:p-8">
            <h3 className="font-serif font-bold text-foreground text-xl mb-6 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                <Check className="w-4 h-4 text-accent" />
              </div>
              You're a Great Fit If…
            </h3>
            <ul className="space-y-4">
              {isForItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-foreground text-sm sm:text-base">{item}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={scrollToForm}
              className="mt-6 w-full bg-cta text-cta-foreground font-semibold py-3 rounded-sm text-sm uppercase tracking-wider hover:opacity-90 active:opacity-80 transition-opacity touch-manipulation"
            >
              Check My Shower Options
            </button>
          </div>

          {/* Who it is NOT for */}
          <div className="bg-muted/50 border border-border rounded-lg p-6 sm:p-8">
            <h3 className="font-serif font-bold text-foreground text-xl mb-6 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center">
                <X className="w-4 h-4 text-destructive" />
              </div>
              This Probably Isn't For You If…
            </h3>
            <ul className="space-y-4">
              {notForItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <X className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                  <span className="text-muted-foreground text-sm sm:text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QualificationSection;
