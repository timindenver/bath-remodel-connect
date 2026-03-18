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
    <section className="py-20 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-12">
          What Our Customers Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-secondary rounded-lg p-8 border border-border"
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
