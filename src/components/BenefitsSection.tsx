import { Shield, Clock, Droplets, Gem } from "lucide-react";

const benefits = [
  {
    icon: Gem,
    title: "Stone-Like Feel",
    description: "Made from real minerals, solid surface has the weight and texture of natural stone — not hollow plastic.",
  },
  {
    icon: Shield,
    title: "25–30+ Year Lifespan",
    description: "Color goes all the way through. Scratches buff out. Built to last decades, not just a warranty period.",
  },
  {
    icon: Droplets,
    title: "Zero Grout, Zero Mold",
    description: "Seamless walls mean no grout lines to scrub. No crevices where mold and mildew can hide.",
  },
  {
    icon: Clock,
    title: "2–3 Day Installation",
    description: "A slightly longer install means a dramatically better result. Your contractor takes the time to do it right.",
  },
];

const BenefitsSection = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-3">
          The Smarter Investment
        </p>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4">
          For ~20% More, You Get a Shower That Lasts 2–3x Longer
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-14">
          Most homeowners who compare both options side-by-side choose solid surface. Here's why.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((b, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <b.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-serif font-semibold text-foreground text-lg mb-2">{b.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
