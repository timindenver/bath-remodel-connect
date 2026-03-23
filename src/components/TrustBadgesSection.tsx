import { useGeo } from "@/contexts/GeoContext";
import { Star, Shield } from "lucide-react";
import guildQuality from "@/assets/trust-guildquality.png";
import greenguard from "@/assets/trust-greenguard.png";
import houzz from "@/assets/trust-houzz.jpg";
import nari from "@/assets/trust-nari.jpg";
import google5star from "@/assets/trust-google5star.png";
import bbb from "@/assets/trust-bbb.png";
import ntca from "@/assets/trust-ntca.jpg";

const badges = [
  { src: google5star, alt: "Google 5-Star Rating" },
  { src: bbb, alt: "BBB Accredited Business A+" },
  { src: guildQuality, alt: "GuildQuality Member" },
  { src: nari, alt: "NARI - Remodeling Done Right" },
  { src: greenguard, alt: "UL Greenguard Certified" },
  { src: houzz, alt: "Houzz" },
  { src: ntca, alt: "National Tile Contractors Association" },
];

const TrustBadgesSection = () => {
  const { geo } = useGeo();

  const regionText = geo.region_name
    ? `You'll be matched with a top-rated contractor serving the ${geo.region_name}, with hundreds of 5-star reviews from local homeowners.`
    : "You'll be matched with a top-rated local contractor with hundreds of 5-star reviews from homeowners like you.";

  return (
    <section className="py-10 sm:py-14 px-4 sm:px-6 bg-card border-y border-border overflow-hidden">
      <div className="max-w-6xl mx-auto">

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-card to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-card to-transparent z-10 pointer-events-none" />
          <div className="flex animate-scroll-badges gap-12 w-max">
            {[...badges, ...badges].map((badge, i) => (
              <img
                key={`${badge.alt}-${i}`}
                src={badge.src}
                alt={badge.alt}
                className="h-14 sm:h-16 w-auto object-contain flex-shrink-0"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBadgesSection;
