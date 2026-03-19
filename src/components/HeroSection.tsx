import { useRef, useEffect, useState, FormEvent } from "react";

const VIDEO_VERSION = "4";

function getVideoSrc() {
  const w = window.innerWidth;
  if (w < 768) return `/hero-mobile.mp4?v=${VIDEO_VERSION}`;
  if (w < 1024) return `/hero-tablet.mp4?v=${VIDEO_VERSION}`;
  return `/hero.mp4?v=${VIDEO_VERSION}`;
}

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState(getVideoSrc);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phone, setPhone] = useState("");
  const [projectType, setProjectType] = useState("");

  const isFormComplete = fullName.trim() !== "" && email.trim() !== "" && zipCode.trim() !== "" && phone.trim() !== "" && projectType !== "";

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isFormComplete) return;
  };

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
    <section className="relative min-h-[100svh]">
      {/* Video background */}
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
        <div className="absolute inset-0 bg-hero-overlay/10" />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 min-h-[100svh] flex flex-col">
        {/* Static headline */}
        <div className="flex-1 flex items-start pt-24 sm:pt-28 lg:pt-32 px-4 sm:px-6">
          <div className="w-full max-w-7xl mx-auto">
            <div className="max-w-2xl text-primary-foreground text-center lg:text-left mx-auto lg:mx-0">
              <h1 className="text-3xl sm:text-4xl lg:text-7xl font-serif font-bold leading-tight mb-4 sm:mb-6">
                The Solid Surface Shower
                <br />
                <span className="border-l-4 border-accent pl-4">of Your Dreams</span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2">
                No Grout · No Plastic Panels
              </p>
              <p className="text-sm sm:text-base lg:text-lg opacity-90 leading-relaxed">
                Installed in just <span className="font-bold">3 Days</span> for usually just <span className="font-bold">20% more</span>
                <br />
                than the one day plastic systems.
              </p>
            </div>
          </div>
        </div>

        {/* Form — overlaid on video on all sizes */}
        <div className="mt-[30svh] sm:mt-[50svh] lg:mt-[20svh] flex justify-center lg:justify-end max-w-7xl mx-auto w-full px-4 sm:px-6 pb-8 sm:pb-12 lg:pb-16">
          <div className="w-full max-w-md bg-card/95 backdrop-blur-sm rounded-lg p-5 sm:p-6 lg:p-8 shadow-2xl">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-serif font-bold text-card-foreground mb-2">
              Lock in your price for 1 year – All Labor and Materials Included
            </h2>
            <p className="text-accent font-medium mb-3 sm:mb-4 lg:mb-5 text-sm sm:text-base">
              Our Local Certified Contractors can often install real solid surface for just 20% more!
            </p>

            <ul className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-5 lg:mb-6 text-sm text-card-foreground">
              <li>• Full Turnkey Demo and Installation</li>
              <li>• 3 Day Installation</li>
              <li>• No Interest Financing</li>
            </ul>

            <form className="space-y-2.5 sm:space-y-3" onSubmit={handleSubmit}>
              <button type="button" className="w-full py-3 sm:py-3.5 bg-accent text-accent-foreground font-semibold rounded-sm hover:opacity-90 active:opacity-80 transition-opacity text-sm uppercase tracking-wider touch-manipulation">
                Get Your Free Quote
              </button>
              <p className="text-xs text-center text-card-foreground font-medium">
                We DO NOT Share your Info with any other companies.
              </p>

              <div className="relative">
                <label className="absolute left-4 top-1 text-[10px] text-muted-foreground pointer-events-none">Full Name</label>
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full px-4 pt-4 pb-1.5 border border-input rounded-sm bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
              </div>
              <div className="relative">
                <label className="absolute left-4 top-1 text-[10px] text-muted-foreground pointer-events-none">Email Address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 pt-4 pb-1.5 border border-input rounded-sm bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
              </div>
              <div className="relative">
                <label className="absolute left-4 top-1 text-[10px] text-muted-foreground pointer-events-none">Zip Code</label>
                <input type="text" inputMode="numeric" value={zipCode} onChange={(e) => setZipCode(e.target.value)} className="w-full px-4 pt-4 pb-1.5 border border-input rounded-sm bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
              </div>
              <div className="relative">
                <label className="absolute left-4 top-1 text-[10px] text-muted-foreground pointer-events-none">Phone Number</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 pt-4 pb-1.5 border border-input rounded-sm bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
              </div>
              <div className="relative">
                <label className="absolute left-4 top-1 text-[10px] text-muted-foreground pointer-events-none">Project Type</label>
                <select value={projectType} onChange={(e) => setProjectType(e.target.value)} className="w-full px-4 pt-4 pb-1.5 border border-input rounded-sm bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent">
                  <option value="" disabled></option>
                  <option>Shower</option>
                  <option>Bathtub</option>
                  <option>Full Bathroom</option>
                  <option>Other</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={!isFormComplete}
                className="w-full py-3 sm:py-3.5 font-semibold rounded-sm text-sm uppercase tracking-wider touch-manipulation transition-all bg-accent text-accent-foreground hover:opacity-90 active:opacity-80 disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-70"
              >
                Submit
              </button>
            </form>
            <p className="text-[10px] leading-tight text-muted-foreground text-center mt-3">
              By clicking Submit, I expressly consent to Solid Surface Baths contacting me at the telephone number or email address provided for marketing purposes related to its home remodeling services, including through the use of automated dialing technology, SMS/MMS messages, AI generative voice, and prerecorded and/or artificial voice messages, even if my number is currently listed on any state, federal or internal Do Not Call list. Message and data rates may apply. I understand that consent is not a condition of purchase and to be helped I can call 1-720-807-3626
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
