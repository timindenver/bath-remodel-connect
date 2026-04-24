import { CheckCircle2 } from "lucide-react";

const matchingPoints = [
  "We only work with installers who are trained and certified for solid surface.",
  "Different home layouts will require different installation equipment.",
  "Some situations may require a master plumber be present.",
  "Our partners all have experienced design consultants who will bring samples and give you advice for a great project.",
];

const WhyMatchingMattersSection = () => {
  return (
    <section className="py-10 sm:py-14 px-4 sm:px-6 bg-secondary/40 border-y border-border">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-6 text-balance text-center">
          Why Matching Matters
        </h2>

        <ul className="space-y-3 sm:space-y-4 max-w-2xl mx-auto">
          {matchingPoints.map((point) => (
            <li
              key={point}
              className="flex items-start gap-3 bg-background border border-border rounded-lg px-4 py-3 sm:px-5 sm:py-4 shadow-sm"
            >
              <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span className="text-sm sm:text-base text-foreground leading-relaxed">
                {point}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default WhyMatchingMattersSection;
