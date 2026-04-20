import { ClipboardList, Users, Calendar, Shield } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "Tell Us About Your Project",
    description: "Answer a few quick questions about your bathroom — takes about 60 seconds.",
  },
  {
    icon: Users,
    title: "Get Matched With a Vetted Local Installer",
    description: "We connect you with a top-rated local installer who serves your zip code and can provide real project pricing.",
  },
  {
    icon: Calendar,
    title: "Choose Your Next Step",
    description: "See availability and decide whether you'd like to book a no-obligation in-home consultation.",
  },
];

const scrollToForm = () => {
  document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
};

const ProcessSection = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-secondary">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-3">
            How It Works
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4 text-balance">
            Get Matched in 60 Seconds. Get Real Pricing Fast.
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg lg:text-xl text-balance">
            No obligation. No spam. You decide whether to move forward.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {steps.map((step, i) => (
            <div key={i} className="text-center">
              <div className="relative mx-auto mb-5">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                  <step.icon className="w-7 h-7 text-accent" />
                </div>
                <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </div>
              </div>
              <h3 className="font-serif font-semibold text-foreground text-lg mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
            <Shield className="w-4 h-4 text-accent" />
            Free · No obligation · No spam
          </div>
          <button
            onClick={scrollToForm}
            className="bg-cta text-cta-foreground font-semibold px-8 py-4 rounded-sm text-sm uppercase tracking-wider hover:opacity-90 active:opacity-80 transition-opacity touch-manipulation"
          >
            See My Local Installer Options
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
