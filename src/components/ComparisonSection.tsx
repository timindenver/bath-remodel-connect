import { Check } from "lucide-react";
import comparisonSolid from "@/assets/comparison-solid-surface.png";
import comparisonAcrylic from "@/assets/comparison-acrylic.png";

const rows = [
  {
    feature: "Material Feel",
    acrylic: "Lightweight, smooth finish",
    solid: "Heavier, solid, stone-like feel",
  },
  {
    feature: "Durability",
    acrylic: "Durable for everyday use",
    solid: "Enhanced durability and impact resistance",
  },
  {
    feature: "Lifespan",
    acrylic: "10-15 years typical",
    solid: "25-30+ years with proper care",
  },
  {
    feature: "Appearance",
    acrylic: "Clean, simple panel look",
    solid: "High-end look similar to stone or tile",
  },
  {
    feature: "Installation Time",
    acrylic: "Fast installation (often 1 day)",
    solid: "Typically installed in 2-3 days",
  },
  {
    feature: "Long-Term Value",
    acrylic: "Great for quick upgrades and budget-conscious projects",
    solid: "Ideal for long-term investment and premium finishes",
  },
  {
    feature: "Maintenance",
    acrylic: "Low maintenance, easy to wipe clean",
    solid: "Low maintenance, non-porous and easy to clean",
  },
];

const scrollToForm = () => {
  document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
};

const ComparisonSection = () => {
  return (
    <section className="py-12 sm:py-20 lg:py-24 px-4 sm:px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-3">
            Compare Your Options
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4">
            Acrylic (One-Day Systems) vs. Solid Surface Panels
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Both are great alternatives to tile. Here's how they compare so you can choose the right fit for your home.
          </p>
        </div>

        {/* Comparison image placeholder */}
        <div className="mb-10 grid grid-cols-2 gap-1 rounded-lg overflow-hidden border border-border">
          <div className="relative">
            <img src={comparisonAcrylic} alt="Acrylic one-day shower install — plastic panels being caulked into place" className="w-full h-64 sm:h-80 lg:h-96 object-cover" />
            <span className="absolute bottom-0 inset-x-0 bg-destructive/80 text-destructive-foreground text-xs sm:text-sm font-semibold text-center py-2 px-2">
              Acrylic "One-Day" Install
            </span>
          </div>
          <div className="relative">
            <img src={comparisonSolid} alt="Contractor installing solid surface calacatta marble-look shower panels in a luxury bathroom" className="w-full h-64 sm:h-80 lg:h-96 object-cover" />
            <span className="absolute bottom-0 inset-x-0 bg-accent/80 text-accent-foreground text-xs sm:text-sm font-semibold text-center py-2 px-2">
              Solid Surface Install
            </span>
          </div>
        </div>

        {/* Comparison table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="py-4 pr-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider w-1/4">
                  Feature
                </th>
                <th className="py-4 px-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider w-[37.5%]">
                  <span className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-destructive" />
                    Acrylic (One-Day)
                  </span>
                </th>
                <th className="py-4 pl-4 text-sm font-semibold text-accent uppercase tracking-wider w-[37.5%]">
                  <span className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    Solid Surface
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b border-border">
                  <td className="py-4 pr-4 font-semibold text-foreground text-sm">
                    {row.feature}
                  </td>
                  <td className="py-4 px-4 text-sm">
                    <span className="flex items-start gap-2">
                      {row.acrylicBad ? (
                        <X className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                      ) : (
                        <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      )}
                      <span className={row.acrylicBad ? "text-muted-foreground" : "text-foreground"}>
                        {row.acrylic}
                      </span>
                    </span>
                  </td>
                  <td className="py-4 pl-4 text-sm">
                    <span className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span className="text-foreground font-medium">{row.solid}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center mt-10">
          <button
            onClick={scrollToForm}
            className="bg-accent text-accent-foreground font-semibold px-8 py-4 rounded-sm text-sm uppercase tracking-wider hover:opacity-90 active:opacity-80 transition-opacity touch-manipulation"
          >
            See What Solid Surface Costs for Your Bathroom
          </button>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
