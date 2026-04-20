import { ClipboardList, Users, Calendar, Shield } from "lucide-react";

const scrollToForm = () => {
  document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
};

const steps = [
  { icon: ClipboardList, title: "Match", desc: "60-sec quiz" },
  { icon: Users, title: "Connect", desc: "Local installer" },
  { icon: Calendar, title: "Book", desc: "In-home visit" },
];

const BridgeCTASection = () => {
  return (
    <section className="py-14 sm:py-24 px-4 sm:px-6 bg-primary text-primary-foreground">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-6 text-balance">
          Stop Guessing. Get Real Numbers From a Real Local Installer.
        </h2>
        <p className="opacity-90 max-w-2xl mx-auto mb-10 text-base sm:text-lg lg:text-xl text-balance">
          Reserve a free in-home consultation. Lock in your 1-year price guarantee. Walk away anytime.
        </p>

        <div className="flex items-center justify-center gap-4 sm:gap-8 mb-10">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-2 sm:gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <s.icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
              </div>
              <span className="text-base sm:text-lg font-medium opacity-90">{s.title}</span>
              {i < steps.length - 1 && <span className="text-accent/50 ml-2 sm:ml-3 text-lg">→</span>}
            </div>
          ))}
        </div>

        <button
          onClick={scrollToForm}
          className="bg-cta text-cta-foreground font-semibold px-12 py-5 rounded-sm text-base sm:text-lg uppercase tracking-wider hover:opacity-90 active:opacity-80 transition-opacity touch-manipulation shadow-lg"
        >
          Get Matched With a Local Installer
        </button>
        <p className="mt-5 text-base sm:text-lg lg:text-xl opacity-80 flex items-center justify-center gap-2">
          <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
          Fully licensed &amp; insured · 1-Year Price Guarantee
        </p>
        <p className="text-base sm:text-lg opacity-60 mt-3">🔒 Free · No obligation · 60 seconds</p>
      </div>
    </section>
  );
};

export default BridgeCTASection;
