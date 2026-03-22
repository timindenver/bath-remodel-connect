import { useRef, useEffect, useState } from "react";
import { Star, Shield, CheckCircle } from "lucide-react";

const VIDEO_VERSION = "6";

function getVideoSrc() {
  const w = window.innerWidth;
  if (w < 768) return `/hero-mobile.mp4?v=${VIDEO_VERSION}`;
  if (w < 1024) return `/hero-tablet.mp4?v=${VIDEO_VERSION}`;
  return `/hero.mp4?v=${VIDEO_VERSION}`;
}

const scrollToForm = () => {
  document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
};

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
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

  return (
    <section className="relative min-h-[75svh] lg:min-h-[80svh]">
      {/* Video background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          key={videoSrc}
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-contain sm:object-contain object-top"
          aria-hidden="true"
          src={videoSrc}
        />
        <div className="absolute inset-0 bg-hero-overlay/10" />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 min-h-[75svh] lg:min-h-[80svh] flex flex-col">
        {/* Headline */}
        <div className="flex-1 flex items-start pt-8 sm:pt-12 lg:pt-16 px-6 sm:px-10 lg:px-16">
          <div className="w-full max-w-7xl mx-auto">
            <div className="max-w-2xl text-primary-foreground text-center sm:text-left mx-auto sm:mx-0">
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-serif font-bold leading-tight mb-4 sm:mb-6">
                Thinking About a
                <br />
                One-Day Shower?
                <br />
                <span className="border-l-4 border-accent pl-4">Read This First.</span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2">
                Thousands of homeowners wish they had.
              </p>
              <p className="text-sm sm:text-base lg:text-lg opacity-90 leading-relaxed mb-6">
                See the side-by-side comparison most contractors don't want you to see — before you sign anything.
              </p>

              <button
                onClick={scrollToForm}
                className="bg-accent text-accent-foreground font-semibold px-8 py-4 rounded-sm text-base sm:text-lg uppercase tracking-wider hover:opacity-90 active:opacity-80 transition-opacity touch-manipulation shadow-lg"
              >
                Get Your Free Quote
              </button>

              {/* Trust indicators */}
              <div className="flex flex-wrap items-center gap-4 mt-6 text-xs sm:text-sm opacity-80">
                <span className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  4.9 Stars · 127+ Reviews
                </span>
                <span className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4" />
                  Licensed & Insured
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4" />
                  Serving Your Area
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
