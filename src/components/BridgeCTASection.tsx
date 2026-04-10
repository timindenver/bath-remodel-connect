import { ClipboardList, Users, Calendar, Shield } from "lucide-react";
import { useGeo } from "@/contexts/GeoContext";

const scrollToForm = () => {
  document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
};

const steps = [
  { icon: ClipboardList, label: "60-sec form" },
  { icon: Users, label: "Local match" },
  { icon: Calendar, label: "Free quote" },
];

const BridgeCTASection = () => {
  const { geo } = useGeo();

  return (
    <section className="py-14 sm:py-24 px-4 sm:px-6 bg-primary text-primary-foreground">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-6 text-balance">
          You've Done the Research. Now Get the Real Numbers.
        </h2>
        <p className="opacity-90 max-w-2xl mx-auto mb-10 text-base sm:text-lg lg:text-xl text-balance">
          Get your free, no-pressure quote that's guaranteed for one year.
        </p>

        <div className="flex items-center justify-center gap-4 sm:gap-8 mb-10">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-2 sm:gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <s.icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
              </div>
              <span className="text-base sm:text-lg font-medium opacity-90">{s.label}</span>
              {i < steps.length - 1 && <span className="text-accent/50 ml-2 sm:ml-3 text-lg">→</span>}
            </div>
          ))}
        </div>

        <button
          onClick={scrollToForm}
          className="bg-cta text-cta-foreground font-semibold px-12 py-5 rounded-sm text-base sm:text-lg uppercase tracking-wider hover:opacity-90 active:opacity-80 transition-opacity touch-manipulation shadow-lg"
        >
          Request a Solid Surface Shower Estimate
        </button>
        <p className="mt-5 text-base sm:text-lg lg:text-xl opacity-80 flex items-center justify-center gap-2">
          <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
          Fully licensed &amp; insured · Estimates Guaranteed for 1 Year
        </p>
        <p className="text-base sm:text-lg opacity-60 mt-3">🔒 We will never share your info</p>
      </div>
    </section>
  );
};

export default BridgeCTASection;
