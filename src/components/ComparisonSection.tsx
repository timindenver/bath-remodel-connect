import { Check } from "lucide-react";
import comparisonSolid from "@/assets/comparison-solid-surface.webp";
import comparisonAcrylic from "@/assets/comparison-acrylic.webp";

const rows = [
  {
    feature: "Material Feel",
    acrylic: "Lightweight, plastic",
    solid: "Quartz Solid Surface",
  },
  {
    feature: "Durability",
    acrylic: "Durable for everyday use",
    solid: "Enhanced durability and impact resistance",
  },
  {
    feature: "Lifespan",
    acrylic: "10-15 years typical",
    solid: "25-30+ years",
  },
  {
    feature: "Appearance",
    acrylic: "Clean, simple panel look",
    solid: "Striking look of natural solid surface",
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
];


const ComparisonSection = () => {
  return (
    <section className="py-12 sm:py-20 lg:py-24 px-4 sm:px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-3">Compare Your Options</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4 text-balance">
            One-Day Shower vs. Solid Surface
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg lg:text-xl text-balance">
            Both are great alternatives to tile. Here's how they compare so you can choose the right fit for your home.
          </p>
        </div>

        {/* Comparison image placeholder */}
        <div className="mb-10 grid grid-cols-2 gap-1 rounded-lg overflow-hidden border border-border">
          <div className="relative">
            <img
              src={comparisonAcrylic}
              alt="Acrylic one-day shower install — plastic panels being caulked into place"
              className="w-full h-64 sm:h-80 lg:h-96 object-cover"
            />
            <span className="absolute bottom-0 inset-x-0 bg-muted/80 text-foreground text-xs sm:text-sm font-semibold text-center py-2 px-2">
              Acrylic (One-Day Systems)
            </span>
          </div>
          <div className="relative">
            <img
              src={comparisonSolid}
              alt="Solid surface shower panel installation showing stone-like finish"
              className="w-full h-64 sm:h-80 lg:h-96 object-cover"
            />
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
                  Acrylic (One-Day Systems)
                </th>
                <th className="py-4 pl-4 text-sm font-semibold text-accent uppercase tracking-wider w-[37.5%]">
                  Solid Surface Walls
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b border-border">
                  <td className="py-4 pr-4 font-semibold text-foreground text-sm">{row.feature}</td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">{row.acrylic}</td>
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

      </div>
    </section>
  );
};

export default ComparisonSection;
