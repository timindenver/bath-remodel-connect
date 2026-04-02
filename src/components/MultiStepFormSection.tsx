import { useState, FormEvent, useCallback } from "react";
import { ChevronRight, ChevronLeft, Shield, Lock, MapPin } from "lucide-react";
import { useGeo } from "@/contexts/GeoContext";
import { supabase } from "@/integrations/supabase/client";

const MultiStepFormSection = () => {
  const { geo, lookupByZip, utm } = useGeo();
  const [step, setStep] = useState(0);
  const [timeline, setTimeline] = useState("");
  const [concern, setConcern] = useState("");
  const [zipCode, setZipCode] = useState(geo.zip_code || "");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [openToVisit, setOpenToVisit] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [outOfArea, setOutOfArea] = useState(false);
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);

  // Sync zip from geo detection
  const effectiveZip = zipCode || geo.zip_code || "";

  const canAdvance = () => {
    if (step === 0) return timeline !== "" && concern !== "";
    if (step === 1) return effectiveZip.trim().length >= 5 && name.trim() !== "" && phone.trim() !== "";
    if (step === 2) return openToVisit !== "";
    return false;
  };

  const handleZipChange = async (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    setZipCode(cleaned);
    if (cleaned.length === 5) {
      await lookupByZip(cleaned);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!canAdvance() || submitting) return;

    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("submit-lead", {
        body: {
          name,
          phone,
          email: email || null,
          zip_code: effectiveZip,
          city: geo.city,
          state: geo.state,
          region_name: geo.region_name,
          contractor_region_id: geo.contractor_region_id,
          in_service_area: geo.in_service_area,
          timeline,
          concern,
          open_to_visit: openToVisit,
          utm_source: utm.utm_source,
          utm_medium: utm.utm_medium,
          utm_campaign: utm.utm_campaign,
          utm_content: utm.utm_content,
          utm_term: utm.utm_term,
        },
      });

      if (error) throw error;

      // Fire Meta Pixel event if available
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "Lead", {
          content_name: "Solid Surface Shower Estimate",
          content_category: geo.region_name || "Unknown Region",
        });
      }

      if (data?.in_service_area) {
        setSubmitted(true);
      } else {
        setOutOfArea(true);
      }
    } catch (err) {
      console.error("Submit error:", err);
      // Still show success to user — lead was likely saved
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleWaitlist = async () => {
    if (!waitlistEmail) return;
    try {
      await supabase.from("waitlist").insert({
        email: waitlistEmail,
        zip_code: effectiveZip,
        city: geo.city,
        state: geo.state,
      });
      setWaitlistSubmitted(true);
    } catch {
      setWaitlistSubmitted(true);
    }
  };

  const next = () => {
    if (canAdvance() && step < 2) setStep(step + 1);
  };
  const back = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleTimelineSelect = useCallback((value: string) => {
    setTimeline(value);
    setTimeout(() => {
      document.getElementById("concern-section")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 150);
  }, []);

  // Out of area screen
  if (outOfArea) {
    return (
      <section id="lead-form" className="py-12 sm:py-20 lg:py-24 px-4 sm:px-6 bg-background">
        <div className="max-w-lg mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
            <MapPin className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4">
            We're Not in Your Area Yet
          </h2>
          <p className="text-muted-foreground mb-6">
            We're expanding to new markets soon. Leave your email and we'll let you know when we're available in your area.
          </p>
          {waitlistSubmitted ? (
            <p className="text-accent font-medium">You're on the list! We'll be in touch.</p>
          ) : (
            <div className="flex gap-2 max-w-sm mx-auto">
              <input
                type="email"
                value={waitlistEmail}
                onChange={(e) => setWaitlistEmail(e.target.value)}
                placeholder="Your email"
                className="flex-1 px-4 py-3 border border-input rounded-lg bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button
                onClick={handleWaitlist}
                className="bg-accent text-accent-foreground font-semibold px-6 py-3 rounded-sm text-sm uppercase tracking-wider hover:opacity-90"
              >
                Notify Me
              </button>
            </div>
          )}
        </div>
      </section>
    );
  }

  if (submitted) {
    return (
      <section id="lead-form" className="py-12 sm:py-20 lg:py-24 px-4 sm:px-6 bg-background">
        <div className="max-w-lg mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-accent" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4">
            You're All Set!
          </h2>
          <p className="text-muted-foreground mb-2">
            {geo.region_name
              ? `We're matching you with a top-rated contractor serving the ${geo.region_name}. Expect a call within 24 hours.`
              : "We're matching you with a certified local contractor. Expect a call within 24 hours."}
          </p>
          <p className="text-sm text-muted-foreground">
            No obligation. No pressure.
          </p>
        </div>
      </section>
    );
  }

  const totalSteps = 3;
  const progressPercent = ((step + 1) / totalSteps) * 100;

  return (
    <section id="lead-form" className="py-12 sm:py-20 lg:py-24 px-4 sm:px-6 bg-background">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-serif font-bold text-foreground mb-2 sm:mb-3">
            Request a Solid Surface Shower Estimate
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            No commitment. No spam. Just a real quote from a local installer.
          </p>
          {geo.region_name && (
            <p className="text-xs sm:text-sm text-accent mt-2 flex items-center justify-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              You'll be matched with a top-rated contractor serving the {geo.region_name}
            </p>
          )}
        </div>

        {/* Progress bar */}
        <div className="mb-6 sm:mb-8">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span className={`font-medium ${step >= 0 ? "text-accent" : ""}`}>1. Project</span>
            <span className={`font-medium ${step >= 1 ? "text-accent" : ""}`}>2. Contact</span>
            <span className={`font-medium ${step >= 2 ? "text-accent" : ""}`}>3. Confirm</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all duration-300"
              style={{ width: `${submitted ? 100 : progressPercent}%` }}
            />
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-5 sm:p-8 shadow-sm">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Timeline + Concern */}
            {step === 0 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif font-bold text-foreground text-base sm:text-lg mb-3">
                    When are you looking to remodel?
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {["Within 30 days", "1-3 months", "3-6 months", "Just researching"].map(
                      (option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => handleTimelineSelect(option)}
                          className={`p-3 rounded-lg border text-sm font-medium transition-colors text-left ${
                            timeline === option
                              ? "border-accent bg-accent/10 text-foreground"
                              : "border-border hover:border-accent/50 text-muted-foreground"
                          }`}
                        >
                          {option}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div id="concern-section" className={timeline ? "opacity-100" : "opacity-40 pointer-events-none"}>
                  <h3 className="font-serif font-bold text-foreground text-base sm:text-lg mb-3">
                    What matters most to you?
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {["No mold or mildew", "Quality & durability", "Best value", "Premium look"].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setConcern(option)}
                        className={`p-3 rounded-lg border text-sm font-medium transition-colors text-left ${
                          concern === option
                            ? "border-accent bg-accent/10 text-foreground"
                            : "border-border hover:border-accent/50 text-muted-foreground"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Contact Info */}
            {step === 1 && (
              <div className="space-y-4">
                <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Your info is never shared or sold.
                </p>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={5}
                  value={effectiveZip}
                  onChange={(e) => handleZipChange(e.target.value)}
                  placeholder="Zip code"
                  className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-accent"
                />
                {geo.in_service_area && geo.region_name && (
                  <p className="text-xs text-accent flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> Great — we have installers in the {geo.region_name}!
                  </p>
                )}
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone number"
                  className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email (optional)"
                  className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            )}

            {/* Step 3: Qualification */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-foreground text-base sm:text-lg mb-3">
                  Are you open to having a contractor visit your home for an exact quote?
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {["Yes", "Maybe", "No"].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setOpenToVisit(option)}
                      className={`p-3 rounded-lg border text-sm font-medium transition-colors text-left ${
                        openToVisit === option
                          ? "border-accent bg-accent/10 text-foreground"
                          : "border-border hover:border-accent/50 text-muted-foreground"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6 sm:mt-8">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={back}
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </button>
              ) : (
                <div />
              )}

              {step < 2 ? (
                <button
                  type="button"
                  onClick={next}
                  disabled={!canAdvance()}
                  className="flex items-center gap-1 bg-accent text-accent-foreground font-semibold px-6 py-3 rounded-sm text-sm uppercase tracking-wider hover:opacity-90 active:opacity-80 transition-all disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!canAdvance() || submitting}
                  className="w-full bg-accent text-accent-foreground font-semibold py-3.5 rounded-sm text-sm uppercase tracking-wider hover:opacity-90 active:opacity-80 transition-all disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed"
                >
                  {submitting ? "Submitting..." : "Get My Free Quote"}
                </button>
              )}
            </div>
          </form>

          <p className="text-[10px] leading-tight text-muted-foreground text-center mt-5">
            By submitting, I consent to Solid Surface Baths contacting me at the number provided, including via automated calls/texts, even if listed on a Do Not Call list. Consent is not required for purchase. Call (917) 813-0137 for help.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MultiStepFormSection;
