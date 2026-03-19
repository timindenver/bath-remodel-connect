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

const TrustBadgesSection = () => (
  <section className="py-10 sm:py-14 px-4 sm:px-6 bg-card border-y border-border">
    <div className="max-w-6xl mx-auto">
      <p className="text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-8">
        Trusted &amp; Certified
      </p>
      <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
        {badges.map((badge) => (
          <img
            key={badge.alt}
            src={badge.src}
            alt={badge.alt}
            className="h-14 sm:h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-80 hover:opacity-100"
          />
        ))}
      </div>
    </div>
  </section>
);

export default TrustBadgesSection;
