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
    <section className="py-12 sm:py-20 px-4 sm:px-6 bg-primary text-primary-foreground">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-5xl font-serif font-bold mb-4">
          You've Done the Research. Now Get the Real Numbers.
        </h2>
        <p className="opacity-90 max-w-xl mx-auto mb-8 text-base sm:text-lg lg:text-xl">
          Get your free, no-pressure quote that's guaranteed for one year.
        </p>

        <div className="flex items-center justify-center gap-3 sm:gap-6 mb-8">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <s.icon className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
              </div>
              <span className="text-sm sm:text-base font-medium opacity-90">{s.label}</span>
              {i < steps.length - 1 && <span className="text-accent/50 ml-1 sm:ml-2">→</span>}
            </div>
          ))}
        </div>

        <button
          onClick={scrollToForm}
          className="bg-accent text-accent-foreground font-semibold px-10 py-4 rounded-sm text-sm sm:text-base uppercase tracking-wider hover:opacity-90 active:opacity-80 transition-opacity touch-manipulation shadow-lg"
        >
          Request a Solid Surface Shower Estimate
        </button>
        <p className="mt-4 text-sm sm:text-base lg:text-lg opacity-70 flex items-center justify-center gap-1.5">
          <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
          Fully licensed &amp; insured · Estimates Guaranteed for 1 Year
        </p>
        <p className="text-sm sm:text-base opacity-50 mt-2">🔒 We will never share your info</p>
      </div>
    </section>
  );
};

export default BridgeCTASection;
