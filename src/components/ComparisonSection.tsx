import { Check, X, AlertTriangle } from "lucide-react";
import comparisonSolid from "@/assets/comparison-solid-surface.png";
import comparisonAcrylic from "@/assets/comparison-acrylic.jpeg";

const rows = [
  {
    feature: "Material Feel",
    acrylic: "Hollow, plastic-like",
    solid: "Stone-like, substantial",
    acrylicBad: true,
  },
  {
    feature: "Durability",
    acrylic: "Scratches & yellows over time",
    solid: "Scratch-resistant, color-through",
    acrylicBad: true,
  },
  {
    feature: "Lifespan",
    acrylic: "10–15 years typical",
    solid: "25–30+ years",
    acrylicBad: true,
  },
  {
    feature: "Appearance",
    acrylic: "Looks like plastic panels",
    solid: "Looks like natural stone or porcelain",
    acrylicBad: true,
  },
  {
    feature: "Installation Time",
    acrylic: "1 day",
    solid: "2–3 days",
    acrylicBad: false,
  },
  {
    feature: "Long-Term Value",
    acrylic: "Replace sooner, costs more over time",
    solid: "Lasts decades, one-time investment",
    acrylicBad: true,
  },
  {
    feature: "Maintenance",
    acrylic: "No grout, but stains easily",
    solid: "No grout, easy to clean",
    acrylicBad: true,
  },
];

const scrollToForm = () => {
  document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
};

const ComparisonSection = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-3">
            The Comparison They Hope You Never See
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4">
            Acrylic "One-Day" Shower vs. Solid Surface
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Same bathroom. Vastly different outcomes. Here's what 10 years of installs have taught us.
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
            Check Solid Surface Options Near Me
          </button>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
