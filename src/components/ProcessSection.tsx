import { ClipboardList, Users, Calendar, Shield } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "Answer a Few Quick Questions",
    description: "Tell us about your project, timeline, and what matters most to you.",
  },
  {
    icon: Users,
    title: "Get Matched with a Local Contractor",
    description: "We connect you with a certified, 5-star rated installer in your area.",
  },
  {
    icon: Calendar,
    title: "Schedule Your In-Home Estimate",
    description: "Your contractor visits your home, takes measurements, and gives you an exact quote — free.",
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
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4">
            What Happens Next?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Getting started is simple. Here's exactly what to expect.
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
            No obligation. No pressure. No sales gimmicks.
          </div>
          <button
            onClick={scrollToForm}
            className="bg-accent text-accent-foreground font-semibold px-8 py-4 rounded-sm text-sm uppercase tracking-wider hover:opacity-90 active:opacity-80 transition-opacity touch-manipulation"
          >
            Get Started — Check Availability
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
