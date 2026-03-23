import { useRef, useEffect, useState } from "react";
import { useGeo } from "@/contexts/GeoContext";

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
    <>
      <section className="relative min-h-[75svh] lg:min-h-[80svh] bg-black">
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
          <div className="flex-1 flex items-start pt-8 sm:pt-12 lg:pt-16 px-8 sm:px-12 lg:px-24 xl:px-32">
            <div className="w-full max-w-7xl mx-auto">
              <div className="max-w-2xl text-primary-foreground text-center sm:text-left mx-auto sm:mx-0">
                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-serif font-bold leading-tight">
                  If You Love Your
                  <br />
                  Quartz Countertops…
                  <br />
                  <br />
                  <span className="border-l-4 border-accent pl-4">Let's Talk About Your Shower</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section below hero */}
      <section className="bg-foreground text-primary-foreground py-8 sm:py-10 px-6 sm:px-12 lg:px-24">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <p className="text-sm sm:text-base lg:text-lg opacity-90 leading-relaxed max-w-xl mx-auto text-balance">
            Most "one-day showers" use acrylic panels. Our grout-free solid surface showers add lasting value to your home. Installed in as little as 2–3 days—without the plastic look or feel.
          </p>

          <button
            onClick={scrollToForm}
            className="bg-accent text-accent-foreground font-semibold px-8 py-4 rounded-sm text-base sm:text-lg uppercase tracking-wider hover:opacity-90 active:opacity-80 transition-opacity touch-manipulation shadow-lg"
          >
            Request a Solid Surface Shower Estimate
          </button>
          <p className="text-xs opacity-60">🔒 We will never share your info</p>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
