import { useRef, useEffect, useState } from "react";

const ROTATING_PHRASES = [
  { top: "Floor to Ceiling Slabs", headline: "Natural Surface", accent: "Walls" },
  { top: "Lifetime Warranty", headline: "Solid Surface", accent: "Showers" },
  { top: "3 Day Installation", headline: "Transform Your", accent: "Bathroom" },
  { top: "No Interest Financing", headline: "Premium Quality", accent: "Design" },
];

function getVideoSrc() {
  const w = window.innerWidth;
  if (w < 768) return "/hero-mobile.mp4";
  if (w < 1024) return "/hero-tablet.mp4";
  return "/hero.mp4";
}

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [videoSrc, setVideoSrc] = useState(getVideoSrc);

  useEffect(() => {
    const onResize = () => {
      const newSrc = getVideoSrc();
      setVideoSrc((prev) => (prev !== newSrc ? newSrc : prev));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {});
    }
  }, [videoSrc]);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setPhraseIndex((prev) => (prev + 1) % ROTATING_PHRASES.length);
        setVisible(true);
      }, 400);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const phrase = ROTATING_PHRASES[phraseIndex];

  return (
    <section className="relative">
      {/* Video area */}
      <div className="relative min-h-[60svh] lg:min-h-[100svh]">
        <div className="absolute inset-0 z-0">
          <video
            key={videoSrc}
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
            aria-hidden="true"
            src={videoSrc}
          />
          <div className="absolute inset-0 bg-hero-overlay/50" />
        </div>

        {/* Rotating text — top-left on desktop, hidden on mobile/tablet */}
        <div className="relative z-10 hidden lg:flex items-start pt-32 min-h-[100svh]">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
            <div
              className={`max-w-xl text-primary-foreground transition-opacity duration-400 ${
                visible ? "opacity-100" : "opacity-0"
              }`}
            >
              <p className="uppercase tracking-[0.3em] text-sm font-sans font-light mb-4 opacity-80">
                {phrase.top}
              </p>
              <h1 className="text-7xl font-serif font-bold leading-tight">
                {phrase.headline}
                <br />
                <span className="border-l-4 border-accent pl-4">{phrase.accent}</span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile/tablet: static text above form */}
      <div className="lg:hidden bg-background px-4 pt-8 pb-4 text-center">
        <p className="uppercase tracking-[0.3em] text-xs sm:text-sm font-sans font-light mb-3 text-muted-foreground">
          {phrase.top}
        </p>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold leading-tight text-foreground">
          {phrase.headline}
          <br />
          <span className="border-l-4 border-accent pl-4">{phrase.accent}</span>
        </h1>
      </div>

      {/* Form — overlaps video on desktop, flows naturally on mobile */}
      <div className="relative z-20 lg:-mt-[50svh] flex justify-center lg:justify-end max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
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
