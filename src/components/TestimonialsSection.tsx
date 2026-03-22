import { Star } from "lucide-react";
import testimonialsBgDesktop from "@/assets/testimonials-bg-desktop.png";
import testimonialsBgMobile from "@/assets/testimonials-bg-mobile.png";

const testimonials = [
  {
    quote: "We almost went with a one-day shower — so glad we didn't.",
    text: "The acrylic felt cheap when we saw it in person. Our solid surface shower looks like natural stone and the installer was done in 2 days. Worth every penny.",
    author: "Sarah M.",
    location: "Philadelphia, PA",
    stars: 5,
  },
  {
    quote: "Night and day compared to acrylic.",
    text: "Our neighbors got an acrylic system and it already shows scratches after a year. Ours still looks brand new after three years. No grout, no mold, no regrets.",
    author: "James R.",
    location: "Brooklyn, NY",
    stars: 5,
  },
  {
    quote: "The quality speaks for itself.",
    text: "I was comparing quotes and the solid surface option was only 20% more than the plastic panels. For something that lasts 3x longer? Easy decision.",
    author: "Linda K.",
    location: "Charlotte, NC",
    stars: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="relative py-12 sm:py-20 px-4 sm:px-6 overflow-hidden">
      <div
        className="absolute inset-0 hidden md:block bg-cover bg-center"
        style={{ backgroundImage: `url(${testimonialsBgDesktop})` }}
      />
      <div
        className="absolute inset-0 md:hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${testimonialsBgMobile})` }}
      />
      <div className="absolute inset-0 bg-background/20" />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-3">
            Real Homeowners, Real Results
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
            Why Homeowners Choose Solid Surface Over Acrylic
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4 sm:gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-background/60 backdrop-blur-sm rounded-lg p-8 border border-border"
            >
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-lg font-serif font-semibold text-foreground mb-3">
                "{t.quote}"
              </p>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                {t.text}
              </p>
              <div>
                <p className="text-sm font-semibold text-foreground">{t.author}</p>
                <p className="text-xs text-muted-foreground">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
