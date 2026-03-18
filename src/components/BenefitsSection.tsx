import { Shield, Clock, DollarSign, Droplets } from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "Lifetime Warranty",
    description: "Our solid surface products are backed by a lifetime warranty. Built to last, guaranteed to perform.",
  },
  {
    icon: Clock,
    title: "3-Day Installation",
    description: "Most projects completed in just 3 days. Minimal disruption to your daily routine.",
  },
  {
    icon: DollarSign,
    title: "No Interest Financing",
    description: "Affordable monthly payments with zero interest financing options available.",
  },
  {
    icon: Droplets,
    title: "Zero Grout Lines",
    description: "Seamless solid surface walls mean no grout to scrub, no mold to worry about.",
  },
];

const BenefitsSection = () => {
  return (
    <section className="py-20 px-6 bg-secondary">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
          Why Solid Surface?
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-14">
          Replace outdated tile and plastic surrounds with beautiful, durable solid surface walls.
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
