import { useRef, useEffect } from "react";

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure video plays on mobile (some browsers need programmatic play)
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // Autoplay blocked — video will show poster instead
      });
    }
  }, []);

  return (
    <section className="relative min-h-[100svh] flex items-center">
      {/* Background video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          aria-hidden="true"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-hero-overlay/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
        {/* Left text */}
        <div className="flex-1 text-primary-foreground pt-8 sm:pt-12 lg:pt-24 text-center lg:text-left">
          <p className="uppercase tracking-[0.3em] text-xs sm:text-sm font-sans font-light mb-4 opacity-80">
            Floor to Ceiling Slabs
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold leading-tight">
            Natural Surface
            <br />
            <span className="border-l-4 border-accent pl-4">Walls</span>
          </h1>
        </div>

        {/* Lead capture form */}
        <div className="w-full max-w-md bg-card/95 backdrop-blur-sm rounded-lg p-6 sm:p-8 shadow-2xl">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-card-foreground mb-2">
            Don't Settle for a One Day Plastic Shower
          </h2>
          <p className="text-accent font-medium mb-4 sm:mb-5 text-sm sm:text-base">
            Get Natural Solid Surface for the same price!
          </p>

          <ul className="space-y-2 mb-5 sm:mb-6 text-sm text-card-foreground">
            <li>• Lifetime Warranty</li>
            <li>• 3 Day Installation</li>
            <li>• No Interest Financing</li>
          </ul>

          <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Full Name" className="w-full px-4 py-3 border border-input rounded-sm bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
            <input type="text" placeholder="Zip Code" inputMode="numeric" className="w-full px-4 py-3 border border-input rounded-sm bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
            <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 border border-input rounded-sm bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
            <input type="email" placeholder="Email" className="w-full px-4 py-3 border border-input rounded-sm bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
            <select className="w-full px-4 py-3 border border-input rounded-sm bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent">
              <option>Shower</option>
              <option>Bathtub</option>
              <option>Full Bathroom</option>
              <option>Other</option>
            </select>
            <textarea placeholder="Notes (leave blank if none)" rows={3} className="w-full px-4 py-3 border border-input rounded-sm bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent resize-none" />
            <button type="submit" className="w-full py-3.5 bg-accent text-accent-foreground font-semibold rounded-sm hover:opacity-90 active:opacity-80 transition-opacity text-sm uppercase tracking-wider touch-manipulation">
              Get Your Free Quote
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
