import { Star, MapPin, Shield, Award, CheckCircle } from "lucide-react";

// Dynamic variables — swap per ad region
const AREA_CONFIG = {
  region: "Dallas–Fort Worth",
  contractorCount: 3,
  avgRating: 4.9,
  totalReviews: 127,
};

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < Math.floor(rating)
            ? "fill-accent text-accent"
            : "fill-muted text-muted"
        }`}
      />
    ))}
  </div>
);

const ServiceAreaSection = () => {
  const { region, contractorCount, avgRating, totalReviews } = AREA_CONFIG;

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            <MapPin className="w-4 h-4" />
            Serving the {region} Area
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Your Local Solid Surface Experts
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
            We have{" "}
            <span className="font-bold text-foreground">{contractorCount} certified local contractors</span>{" "}
            in the {region} area — each with{" "}
            <span className="font-bold text-foreground">5-Star Google Reviews</span>.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Map placeholder */}
          <div className="relative rounded-lg overflow-hidden border border-border shadow-sm bg-muted aspect-[4/3]">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
              <MapPin className="w-12 h-12 mb-3 text-accent" />
              <p className="font-serif font-semibold text-lg text-foreground">{region}</p>
              <p className="text-sm">Service Area Map</p>
            </div>
            {/* Pin markers for visual effect */}
            <div className="absolute top-[30%] left-[40%] w-3 h-3 bg-accent rounded-full animate-pulse" />
            <div className="absolute top-[50%] left-[60%] w-3 h-3 bg-accent rounded-full animate-pulse delay-300" />
            <div className="absolute top-[45%] left-[35%] w-3 h-3 bg-accent rounded-full animate-pulse delay-700" />
          </div>

          {/* Credibility content */}
          <div className="space-y-6">
            {/* Rating card */}
            <div className="bg-card border border-border rounded-lg p-5 sm:p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <Star className="w-5 h-5 text-accent fill-accent" />
                </div>
                <div>
                  <p className="font-serif font-bold text-foreground text-lg">{avgRating} Average Rating</p>
                  <p className="text-sm text-muted-foreground">Based on {totalReviews} verified Google reviews</p>
                </div>
              </div>
              <StarRating rating={avgRating} />
            </div>

            {/* Trust signals */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 bg-card border border-border rounded-lg p-4">
                <Shield className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-foreground text-sm">Licensed &amp; Insured</p>
                  <p className="text-xs text-muted-foreground">All contractors fully vetted</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-card border border-border rounded-lg p-4">
                <Award className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-foreground text-sm">Factory Certified</p>
                  <p className="text-xs text-muted-foreground">Trained by the manufacturer</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-card border border-border rounded-lg p-4">
                <CheckCircle className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-foreground text-sm">Background Checked</p>
                  <p className="text-xs text-muted-foreground">Your safety is our priority</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-card border border-border rounded-lg p-4">
                <MapPin className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-foreground text-sm">Locally Owned</p>
                  <p className="text-xs text-muted-foreground">Your neighbors, not a franchise</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreaSection;
