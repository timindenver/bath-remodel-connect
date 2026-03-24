import { Star } from "lucide-react";
import testimonialsBgDesktop from "@/assets/testimonials-bg-desktop.png";
import testimonialsBgMobile from "@/assets/testimonials-bg-mobile.png";

const testimonials = [
  {
    quote: "It feels like real stone — I can't stop touching the walls.",
    text: "We wanted something that looked and felt luxurious without the price tag of natural marble. Our solid surface shower exceeded every expectation. Guests think it cost twice what we paid.",
    author: "Sarah M.",
    location: "Philadelphia, PA",
    stars: 5,
  },
  {
    quote: "Luxury look without the luxury price.",
    text: "We got the high-end bathroom we always dreamed of at a price that actually fit our budget. Three years in and it still looks brand new — no grout, no mold, no regrets.",
    author: "James R.",
    location: "Brooklyn, NY",
    stars: 5,
  },
  {
    quote: "The quality speaks for itself.",
    text: "The natural stone feel is incredible. It's warm to the touch, easy to clean, and looks absolutely stunning. Best home investment we've made — and it was more affordable than we expected.",
    author: "Linda K.",
    location: "Charlotte, NC",
    stars: 5,
  },
  {
    quote: "Better than tile and half the hassle.",
    text: "We renovated two bathrooms and chose solid surface for both. No grout lines to scrub, no sealing to worry about — and the marble look is absolutely gorgeous. It was surprisingly affordable too.",
    author: "Michael T.",
    location: "Bucks County, PA",
    stars: 5,
  },
  {
    quote: "Our contractor said it's the best value upgrade.",
    text: "We were torn between tile and solid surface. Our contractor recommended solid surface for the natural look without the maintenance headaches. He was right — it's beautiful and effortless to keep clean.",
    author: "Angela D.",
    location: "Montgomery County, PA",
    stars: 5,
  },
  {
    quote: "Feels like a spa every single day.",
    text: "Walking into our bathroom now feels like stepping into a high-end hotel. The solid surface panels have this beautiful warmth and depth that photos don't do justice. Worth every penny.",
    author: "Robert & Karen W.",
    location: "Cherry Hill, NJ",
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground text-balance">
            Why Homeowners Choose Solid Surface
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4 sm:gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-background/60 backdrop-blur-sm rounded-lg p-5 sm:p-8 border border-border"
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
