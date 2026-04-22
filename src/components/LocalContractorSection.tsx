import { Star, Shield, MapPin, CheckCircle, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGeo } from "@/contexts/GeoContext";

interface LocalContractorSectionProps {
  onCheckAvailability?: () => void;
}

const LocalContractorSection = ({ onCheckAvailability }: LocalContractorSectionProps) => {
  const { geo } = useGeo();
  const regionName = geo.region_name || null;

  return (
    <section className="py-10 sm:py-14 px-4 sm:px-6 bg-background">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Availability check card — neutral, multi-installer focus */}
        <div className="bg-white border border-border rounded-xl overflow-hidden shadow-md">
          {/* Top accent bar */}
          <div className="h-1.5 bg-accent" />

          <div className="p-6 sm:p-8">
            {/* Network badge */}
            <div className="inline-flex items-center gap-1.5 bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
              <Users className="w-3.5 h-3.5" />
              Certified Installer Network
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-foreground mb-3">
              Check Availability of Certified Installers in Your Area
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground mb-4">
              Find out if qualified, vetted installers are available near you in under 60 seconds.
            </p>

            {/* Aggregate rating — network-level, not tied to one contractor */}
            <div className="flex items-center gap-2 mb-5">
              <span className="text-lg font-bold text-foreground">4.9</span>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                average homeowner rating across our installer network
              </span>
            </div>

            {/* Trust badges — neutral vetting markers */}
            <div className="flex flex-wrap gap-2 mb-5">
              {[
                { icon: Shield, text: "Licensed & Insured" },
                { icon: CheckCircle, text: "Vetted & Background-Checked" },
                { icon: MapPin, text: regionName ? `Serving ${regionName}` : "Serving Your Area" },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-1.5 bg-secondary text-foreground px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium"
                >
                  <Icon className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                  {text}
                </div>
              ))}
            </div>

            {/* Body copy — matching/availability framing */}
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
              Answer a few quick questions and we'll check availability and match you with qualified local installers based on your project.
            </p>

            {/* Low-commitment CTA */}
            <Button
              onClick={onCheckAvailability}
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3 rounded-lg"
            >
              Check My Shower Options
            </Button>

            {/* Microcopy — subtle personalization signal */}
            <p className="mt-4 text-xs text-muted-foreground/80">
              Availability and matching based on your home and project details
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocalContractorSection;
