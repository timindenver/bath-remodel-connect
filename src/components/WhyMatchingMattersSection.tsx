import { ShieldCheck, MapPin, Star, Wrench } from "lucide-react";

const trustPoints = [
  { icon: ShieldCheck, label: "Licensed & insured" },
  { icon: MapPin, label: "Serves your area" },
  { icon: Star, label: "Strong local reputation" },
  { icon: Wrench, label: "Fit for your project type" },
];

const WhyMatchingMattersSection = () => {
  return (
    <section className="py-10 sm:py-14 px-4 sm:px-6 bg-secondary/40 border-y border-border">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-3 text-balance">
          Why Matching Matters
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed text-balance max-w-2xl mx-auto">
          We don't just pass your request to random contractors. We review key trust factors first
          so your project is routed to a qualified local installer who serves your area and fits
          your shower project.
        </p>

        <ul className="mt-6 sm:mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {trustPoints.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex flex-col items-center gap-2 bg-background border border-border rounded-lg px-3 py-4 shadow-sm"
            >
              <Icon className="w-5 h-5 text-accent" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-medium text-foreground leading-tight">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default WhyMatchingMattersSection;
