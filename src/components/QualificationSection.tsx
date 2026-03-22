import { Check, X } from "lucide-react";

const isForItems = [
  "Planning a remodel in the next 3–6 months",
  "Budget of $10k+ for a quality result",
  "Care about long-term durability over speed",
  "Open to a 2–3 day professional installation",
  "Want a shower that looks and feels premium",
];

const notForItems = [
  "Looking for the absolute cheapest option",
  "Need it done in a single day no matter what",
  "Just browsing with no timeline",
  "Prefer DIY installation",
];

const QualificationSection = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4">
            Is This Right for You?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're not for everyone — and that's by design. Here's how to know if solid surface is your best option.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {/* Who it IS for */}
          <div className="bg-card border border-border rounded-lg p-6 sm:p-8">
            <h3 className="font-serif font-bold text-foreground text-xl mb-6 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                <Check className="w-4 h-4 text-accent" />
              </div>
              This Is For You If…
            </h3>
            <ul className="space-y-4">
              {isForItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-foreground text-sm sm:text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Who it is NOT for */}
          <div className="bg-muted/50 border border-border rounded-lg p-6 sm:p-8">
            <h3 className="font-serif font-bold text-foreground text-xl mb-6 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center">
                <X className="w-4 h-4 text-destructive" />
              </div>
              This Is NOT For You If…
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
