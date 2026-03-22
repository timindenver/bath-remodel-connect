import { AlertTriangle, ArrowRight } from "lucide-react";
import solidCloseup from "@/assets/solid-surface-closeup.png";

const acylicTruths = [
  "Acrylic panels feel hollow when you tap them — because they are.",
  "Scratches and wear show quickly, especially in high-use areas.",
  "\"One-day install\" is designed for the contractor's speed — not your longevity.",
  "Most acrylic showers need replacing within 10–15 years.",
  "The \"luxury\" finish is a thin gel coat that degrades over time.",
];

const solidSurfaceReasons = [
  "Feels like natural stone — because it's made from real minerals.",
  "Color goes all the way through, so scratches can be buffed out.",
  "Lasts 25–30+ years with virtually zero maintenance.",
  "No grout lines means no mold, no scrubbing, no resealing.",
  "Looks premium from day one — and stays that way for decades.",
];

const EducationSection = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-secondary">
      <div className="max-w-5xl mx-auto">
        {/* What they don't tell you */}
        <div className="mb-16">
          <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-3">
            The Fine Print
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4">
            What Most "One-Day Shower" Companies Don't Tell You
          </h2>
          <p className="text-muted-foreground max-w-2xl mb-8">
            They sell speed. But here's what gets left out of the pitch:
          </p>

          <div className="space-y-4">
            {acylicTruths.map((truth, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-card border border-border rounded-lg p-4 sm:p-5"
              >
                <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                <p className="text-foreground text-sm sm:text-base">{truth}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why solid surface instead */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <ArrowRight className="w-5 h-5 text-accent" />
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-foreground">
              Why More Homeowners Are Choosing Solid Surface Instead
            </h3>
          </div>

          <div className="mb-8 rounded-lg overflow-hidden border border-border">
            <img src={solidCloseup} alt="Close-up of calacatta solid surface material showing stone-like texture with water droplets" className="w-full aspect-video object-cover" />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {solidSurfaceReasons.map((reason, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-card border border-border rounded-lg p-4 sm:p-5"
              >
                <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-accent text-xs font-bold">{i + 1}</span>
                </div>
                <p className="text-foreground text-sm sm:text-base">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
