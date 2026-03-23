import { Star, Shield, MapPin, Award, CheckCircle } from "lucide-react";
import { useGeo } from "@/contexts/GeoContext";

const scrollToForm = () => {
  document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
};

const LocalContractorSection = () => {
  const { geo } = useGeo();

  const rating = geo.rating ?? 4.9;
  const reviewCount = geo.review_count ?? 127;
  const regionName = geo.region_name || null;
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  return (
    <section className="py-10 sm:py-14 px-4 sm:px-6 bg-background">
      <div className="max-w-3xl mx-auto">
        <div className="bg-card border border-border rounded-xl p-6 sm:p-10 shadow-sm">
          {/* Header */}
          <div className="flex items-center gap-2 mb-1">
            <Award className="w-5 h-5 text-accent" />
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
              Your Local Installer
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-foreground mb-3">
            {regionName
              ? `Serving Homeowners in the ${regionName}`
              : "A Certified Installer Near You"}
          </h2>

          {/* Stars row */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: fullStars }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-accent text-accent" />
              ))}
              {hasHalf && (
                <Star className="w-5 h-5 text-accent" style={{ clipPath: "inset(0 50% 0 0)" }} />
              )}
            </div>
            <span className="text-sm font-semibold text-foreground">{rating}</span>
            <span className="text-sm text-muted-foreground">· {reviewCount}+ Google Reviews</span>
          </div>

          {/* Trust points */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            {[
              { icon: Shield, text: "Fully Licensed & Insured" },
              { icon: CheckCircle, text: "Estimates Guaranteed for 1 Year" },
              { icon: MapPin, text: regionName ? `Serving the ${regionName}` : "Local to Your Area" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon className="w-4 h-4 text-accent flex-shrink-0" />
                {text}
              </div>
            ))}
          </div>

          {/* Personalized message */}
          <p className="text-sm sm:text-base text-muted-foreground mb-6 leading-relaxed">
            {regionName
              ? `You'll be matched with a top-rated contractor serving the ${regionName}, with hundreds of 5-star reviews from local homeowners. No obligation — just a real quote.`
              : "You'll be matched with a top-rated local contractor with hundreds of 5-star reviews from homeowners like you. No obligation — just a real quote."}
          </p>

          {/* CTA */}
          <button
            onClick={scrollToForm}
            className="w-full sm:w-auto bg-accent text-accent-foreground font-semibold px-8 py-4 rounded-sm text-sm sm:text-base uppercase tracking-wider hover:opacity-90 active:opacity-80 transition-opacity touch-manipulation shadow-lg"
          >
            Request a Solid Surface Shower Estimate
          </button>
          <p className="text-xs text-muted-foreground mt-2">🔒 We will never share your info</p>
        </div>
      </div>
    </section>
  );
};

export default LocalContractorSection;
