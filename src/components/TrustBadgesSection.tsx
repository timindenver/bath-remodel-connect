import guildQuality from "@/assets/trust-guildquality.webp";
import greenguard from "@/assets/trust-greenguard.webp";
import houzz from "@/assets/trust-houzz.webp";
import nari from "@/assets/trust-nari.webp";
import google5star from "@/assets/trust-google5star.webp";
import bbb from "@/assets/trust-bbb.webp";
import ntca from "@/assets/trust-ntca.webp";

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
  return (
    <section className="py-8 sm:py-10 px-4 sm:px-6 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          <div className="flex animate-scroll-badges gap-16 sm:gap-20 w-max items-center">
            {[...badges, ...badges].map((badge, i) => (
              <img
                key={`${badge.alt}-${i}`}
                src={badge.src}
                alt={badge.alt}
                className="h-16 sm:h-20 w-auto max-w-[140px] sm:max-w-[180px] object-contain flex-shrink-0"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBadgesSection;
