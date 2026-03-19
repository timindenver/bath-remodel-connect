import testimonialsBgDesktop from "@/assets/testimonials-bg-desktop.png";
import testimonialsBgMobile from "@/assets/testimonials-bg-mobile.png";

const testimonials = [
  {
    quote: "Amazing craftsmanship!",
    text: "The quality of the solid surface walls exceeded our expectations. It looks like natural stone but without the maintenance headaches.",
    author: "Sarah M.",
    location: "Philadelphia, PA",
  },
  {
    quote: "Quick and professional.",
    text: "From consultation to completion in just 3 days. The team was respectful of our home and the result is stunning.",
    author: "James R.",
    location: "Brooklyn, NY",
  },
  {
    quote: "I love my new shower!",
    text: "No more scrubbing grout lines. The seamless walls are beautiful and so easy to clean. Best home improvement decision we've made.",
    author: "Linda K.",
    location: "Charlotte, NC",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="relative py-20 px-6 overflow-hidden">
      {/* Desktop/Tablet background */}
      <div
        className="absolute inset-0 hidden md:block bg-cover bg-center"
        style={{ backgroundImage: `url(${testimonialsBgDesktop})` }}
      />
      {/* Mobile background */}
      <div
        className="absolute inset-0 md:hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${testimonialsBgMobile})` }}
      />
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-background/20" />

      <div className="relative max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-12">
          What Our Customers Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-background/60 backdrop-blur-sm rounded-lg p-8 border border-border"
            >
              <p className="text-lg font-serif font-semibold text-accent mb-3">
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
