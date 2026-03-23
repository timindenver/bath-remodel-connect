import { Star, Shield, MapPin, Award, CheckCircle, ImageIcon } from "lucide-react";
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
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Contractor Card — Google Maps-inspired */}
        <div className="bg-white border border-border rounded-xl overflow-hidden shadow-md">
          {/* Top accent bar */}
          <div className="h-1.5 bg-accent" />

          <div className="p-6 sm:p-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
              <Award className="w-3.5 h-3.5" />
              Your Local Installer
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-foreground mb-3">
              {regionName
                ? `Serving Homeowners in the ${regionName}`
                : "Our Nearest Certified Installer Serves Your Area"}
            </h2>

            {/* Stars row — Google-style */}
            <div className="flex items-center gap-2 mb-5">
              <span className="text-lg font-bold text-foreground">{rating}</span>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: fullStars }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
                {hasHalf && (
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" style={{ clipPath: "inset(0 50% 0 0)" }} />
                )}
              </div>
              <span className="text-sm text-muted-foreground">({reviewCount}+ Google Reviews)</span>
            </div>

            {/* Trust chips */}
            <div className="flex flex-wrap gap-2 mb-5">
              {[
                { icon: Shield, text: "Licensed & Insured" },
                { icon: CheckCircle, text: "1-Year Estimate Guarantee" },
                { icon: MapPin, text: regionName ? `${regionName}` : "Local to Your Area" },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-1.5 bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium"
                >
                  <Icon className="w-3.5 h-3.5 text-accent flex-shrink-0" />
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

        {/* Service Area Map Placeholder */}
        <div className="bg-white border border-border rounded-xl overflow-hidden shadow-md">
          <div className="flex items-center gap-2 px-6 pt-5 pb-2">
            <MapPin className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold text-foreground">
              {regionName ? `${regionName} Service Area` : "Our Service Area"}
            </span>
          </div>
          <div className="px-6 pb-6">
            <div className="w-full aspect-[16/9] bg-secondary rounded-lg border border-border flex flex-col items-center justify-center text-muted-foreground">
              <ImageIcon className="w-10 h-10 mb-2 opacity-40" />
              <span className="text-sm font-medium opacity-60">Service Area Map</span>
              <span className="text-xs opacity-40 mt-1">
                {regionName || "Region map coming soon"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocalContractorSection;
