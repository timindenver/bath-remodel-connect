const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-hero-overlay/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center lg:items-start gap-12">
        {/* Left text */}
        <div className="flex-1 text-primary-foreground pt-12 lg:pt-24">
          <p className="uppercase tracking-[0.3em] text-sm font-sans font-light mb-4 opacity-80">
            Floor to Ceiling Slabs
          </p>
          <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight">
            Natural Surface
            <br />
            <span className="border-l-4 border-accent pl-4">Walls</span>
          </h1>
        </div>

        {/* Lead capture form */}
        <div className="w-full max-w-md bg-card/95 backdrop-blur-sm rounded-lg p-8 shadow-2xl">
          <h2 className="text-2xl font-serif font-bold text-card-foreground mb-2">
            Don't Settle for a One Day Plastic Shower
          </h2>
          <p className="text-accent font-medium mb-5">
            Get Natural Solid Surface for the same price!
          </p>

          <ul className="space-y-2 mb-6 text-sm text-card-foreground">
            <li>• Lifetime Warranty</li>
            <li>• 3 Day Installation</li>
            <li>• No Interest Financing</li>
          </ul>

          <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Full Name" className="w-full px-4 py-3 border border-input rounded-sm bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
            <input type="text" placeholder="Zip Code" className="w-full px-4 py-3 border border-input rounded-sm bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
            <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 border border-input rounded-sm bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
            <input type="email" placeholder="Email" className="w-full px-4 py-3 border border-input rounded-sm bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
            <select className="w-full px-4 py-3 border border-input rounded-sm bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent">
              <option>Shower</option>
              <option>Bathtub</option>
              <option>Full Bathroom</option>
              <option>Other</option>
            </select>
            <textarea placeholder="Notes (leave blank if none)" rows={3} className="w-full px-4 py-3 border border-input rounded-sm bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent resize-none" />
            <button type="submit" className="w-full py-3 bg-accent text-accent-foreground font-semibold rounded-sm hover:opacity-90 transition-opacity text-sm uppercase tracking-wider">
              Get Your Free Quote
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
