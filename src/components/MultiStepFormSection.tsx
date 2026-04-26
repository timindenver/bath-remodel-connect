import { useState, FormEvent, useCallback, useEffect, useRef, useMemo } from "react";
import { ChevronRight, ChevronLeft, Shield, MapPin, Timer, CheckCircle2, Search, ShieldCheck, Users, Gift, Sparkles, Monitor, Smartphone } from "lucide-react";
import { useGeo } from "@/contexts/GeoContext";
import { supabase } from "@/integrations/supabase/client";
import designToolLaptop from "@/assets/design-tool-laptop.png";
import designToolPhone from "@/assets/design-tool-phone.png";

const MultiStepFormSection = () => {
  const { geo, lookupByZip, utm } = useGeo();
  // step: -1 = availability check (ZIP), -0.5 = matching animation, 0..3 = original flow
  const [step, setStep] = useState<number>(-1);
  const [zipError, setZipError] = useState("");
  const [matchingProgress, setMatchingProgress] = useState(0);
  const [matchingMessageIdx, setMatchingMessageIdx] = useState(0);
  const zipInputRef = useRef<HTMLInputElement>(null);
  const [bathroomLevel, setBathroomLevel] = useState("");
  const [showerSetup, setShowerSetup] = useState("");
  const [projectType, setProjectType] = useState("");
  const [shutoffAccess, setShutoffAccess] = useState("");
  const [timeline, setTimeline] = useState("");
  const [zipCode, setZipCode] = useState(geo.zip_code || "");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhone(value);
    setPhone(formatted);
    const digits = formatted.replace(/\D/g, "");
    if (digits.length > 0 && digits.length < 10) {
      setPhoneError("Please enter a valid 10-digit phone number");
    } else {
      setPhoneError("");
    }
  };

  const isPhoneValid = () => phone.replace(/\D/g, "").length === 10;
  const [email, setEmail] = useState("");
  const [preferredDay, setPreferredDay] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [priority, setPriority] = useState("");
  const [followUpPref, setFollowUpPref] = useState("Either");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [outOfArea, setOutOfArea] = useState(false);
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);

  // Sync zip from geo detection
  const effectiveZip = zipCode || geo.zip_code || "";

  // 5-step flow (after ZIP availability check):
  // 0: Bathroom level + Shower setup
  // 1: Project goal + Water shut-off
  // 2: Timeline + Priority
  // 3: Contact (name + phone + email)
  // 4: Confirm
  const canAdvance = () => {
    if (step === 0) return bathroomLevel !== "" && showerSetup !== "";
    if (step === 1) return projectType !== "" && shutoffAccess !== "";
    if (step === 2) return timeline !== "" && priority !== "";
    if (step === 3) return name.trim() !== "" && isPhoneValid();
    return false;
  };

  const isZipValid = (z: string) => /^\d{5}$/.test(z);

  const handleZipChange = async (value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 5);
    setZipCode(cleaned);
    if (zipError) setZipError("");
    if (cleaned.length === 5) {
      await lookupByZip(cleaned);
    }
  };

  // Auto-focus ZIP input only after user interaction (not on initial page load)
  const hasInteractedRef = useRef(false);
  useEffect(() => {
    if (step === -1 && hasInteractedRef.current) {
      const t = setTimeout(() => {
        zipInputRef.current?.focus({ preventScroll: true });
      }, 50);
      return () => clearTimeout(t);
    }
    if (step !== -1) {
      hasInteractedRef.current = true;
    }
  }, [step]);

  // Matching animation: 1.8s total, then advance to project step (0)
  useEffect(() => {
    if (step !== -0.5) return;
    setMatchingProgress(25);
    setMatchingMessageIdx(0);

    const t1 = setTimeout(() => setMatchingProgress(75), 200);
    const tMsg1 = setTimeout(() => setMatchingMessageIdx(1), 500);
    const tMsg2 = setTimeout(() => setMatchingMessageIdx(2), 1000);
    const t2 = setTimeout(() => setMatchingProgress(100), 1400);
    const tDone = setTimeout(() => setStep(0), 1800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(tMsg1);
      clearTimeout(tMsg2);
      clearTimeout(tDone);
    };
  }, [step]);

  const handleAvailabilityCheck = async () => {
    if (!isZipValid(effectiveZip)) {
      setZipError("Please enter a valid ZIP code");
      return;
    }
    await lookupByZip(effectiveZip);
    setStep(-0.5);
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
          project_type: projectType,
          bathroom_level: bathroomLevel,
          shower_setup: showerSetup,
          shutoff_access: shutoffAccess,
          timeline,
          priority,
          follow_up_preference: followUpPref,
          preferred_day: preferredDay,
          preferred_time: preferredTime,
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
          content_name: "Solid Surface Shower — Local Installer Match",
          content_category: geo.region_name || "Unknown Region",
        });
      }

      setSubmitted(true);
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
    if (canAdvance() && step < 4) setStep(step + 1);
  };
  const back = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleTimelineSelect = useCallback((value: string) => {
    setTimeline(value);
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
                className="bg-cta text-cta-foreground font-semibold px-6 py-3 rounded-sm text-sm uppercase tracking-wider hover:opacity-90"
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
      <section
        id="lead-form"
        className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-12 sm:py-16 bg-background"
      >
        <div className="max-w-xl mx-auto text-center w-full">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6 sm:mb-8 ring-8 ring-accent/5">
            <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-accent" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4 sm:mb-5 text-balance">
            Thanks — We've Got Your Info!
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-foreground/80 mb-6 text-balance max-w-lg mx-auto">
            Our team will call to review your project and find the right local installer match within{" "}
            <span className="font-semibold text-foreground">2 hours</span> (during business hours).
          </p>

          <div className="bg-accent/5 border-2 border-accent/20 rounded-2xl p-5 sm:p-6 mb-6 max-w-md mx-auto">
            <p className="text-sm sm:text-base text-foreground/80 mb-2">
              So you know it's us calling — and not a spam call — please save this number in your phone now:
            </p>
            <a
              href="tel:+12157980347"
              className="block text-2xl sm:text-3xl lg:text-4xl font-bold text-accent tracking-tight my-3 hover:underline"
            >
              (215) 798-0347
            </a>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Add it as <span className="font-medium text-foreground">"Shower Match Team"</span> so you'll recognize the call.
            </p>
          </div>

          <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto">
            We truly appreciate your time and look forward to speaking with you soon.
          </p>
        </div>
      </section>
    );
  }

  const totalSteps = 5;
  const progressPercent = step >= 0 ? ((step + 1) / totalSteps) * 100 : 0;
  const stepLabels = ["Bathroom", "Project", "Timing", "Contact", "Confirm"];

  const matchingMessages = [
    "Checking installer availability in your area…",
    "Matching you with certified installers…",
    "Verifying coverage near your ZIP code…",
  ];

  // ---------- Availability check (ZIP entry) ----------
  if (step === -1) {
    const bonusDeadline = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });

    return (
      <section id="lead-form" className="py-12 sm:py-20 lg:py-24 px-4 sm:px-6 bg-background">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-1.5 bg-accent/10 text-accent text-[11px] sm:text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
              <MapPin className="w-3.5 h-3.5" />
              Availability Check
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-foreground mb-3 text-balance">
              Check Availability of Certified Installers in Your Area
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground text-balance">
              Find out if qualified, vetted installers are available near you.
            </p>
          </div>

          {/* Bonus Offer Card — above the availability form */}
          <div className="relative bg-gradient-to-br from-accent/10 via-card to-card border-2 border-accent/30 rounded-lg p-5 sm:p-7 pt-7 sm:pt-9 shadow-md mt-3 mb-6">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cta text-cta-foreground text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm flex items-center gap-1 whitespace-nowrap z-10">
              <Sparkles className="w-3 h-3" /> Limited-Time Bonus
            </div>

            <div className="flex items-center gap-2 mb-3 mt-2">
              <div className="w-9 h-9 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0">
                <Gift className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-foreground leading-tight">
                Submit before <span className="text-success">{bonusDeadline}</span> and receive:
              </h3>
            </div>

            <ul className="space-y-2.5 mb-4">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-foreground">
                  <span className="font-semibold">FREE Design Preview Mockup</span> of your new shower — fully editable so you can tweak finishes, fixtures, and layout.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-foreground">
                  <span className="font-semibold">FREE Kohler Premium Shower Fixture upgrade</span> — a <span className="font-bold text-success">$1,200 value</span>.
                </span>
              </li>
            </ul>

            <div className="flex justify-center">
              <div className="w-full max-w-[220px]">
                <div className="rounded-md overflow-hidden border border-border bg-background">
                  <img
                    src={designToolPhone}
                    alt="Design preview tool on a smartphone"
                    loading="lazy"
                    width={1080}
                    height={1920}
                    className="w-full h-auto object-contain block"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-5 sm:p-8 shadow-sm">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAvailabilityCheck();
              }}
              className="space-y-5"
            >
              <div>
                <label htmlFor="zip-availability" className="block text-sm font-medium text-foreground mb-2">
                  Enter your ZIP Code
                </label>
                <input
                  id="zip-availability"
                  ref={zipInputRef}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoComplete="postal-code"
                  maxLength={5}
                  value={effectiveZip}
                  onChange={(e) => handleZipChange(e.target.value)}
                  placeholder="e.g. 18902"
                  aria-invalid={!!zipError}
                  className={`w-full px-4 py-3.5 border-2 rounded-lg bg-background text-foreground text-lg tracking-wider focus:outline-none focus:ring-2 focus:ring-accent transition-colors ${
                    zipError ? "border-destructive" : "border-input focus:border-accent"
                  }`}
                />
                {zipError && (
                  <p className="text-xs text-destructive mt-1.5">{zipError}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={!isZipValid(effectiveZip)}
                className="w-full bg-cta text-cta-foreground font-semibold py-3.5 rounded-sm text-sm uppercase tracking-wider hover:opacity-90 active:opacity-80 transition-all disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed"
              >
                Check Availability
              </button>

              <div className="flex items-center justify-center gap-3 text-[11px] sm:text-xs text-muted-foreground">
                <span>No spam. No obligation.</span>
              </div>
            </form>

            <div className="mt-6 pt-5 border-t border-border">
              <div className="flex items-center justify-center flex-wrap gap-x-1.5 gap-y-1 mb-3 text-center">
                <span className="text-base font-bold text-foreground">4.9</span>
                <span className="text-amber-500" aria-hidden>★★★★★</span>
                <span className="text-xs text-muted-foreground">avg homeowner rating across our installer network</span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground bg-secondary px-2.5 py-1 rounded-full">
                  <ShieldCheck className="w-3 h-3" /> Licensed & Insured
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground bg-secondary px-2.5 py-1 rounded-full">
                  <CheckCircle2 className="w-3 h-3" /> Vetted & Background-Checked
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground bg-secondary px-2.5 py-1 rounded-full">
                  <Users className="w-3 h-3" /> Local Installers
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ---------- Matching animation (1.8s) ----------
  if (step === -0.5) {
    return (
      <section id="lead-form" className="py-12 sm:py-20 lg:py-24 px-4 sm:px-6 bg-background">
        <div className="max-w-xl mx-auto">
          <div className="bg-card border border-border rounded-lg p-8 sm:p-12 shadow-sm text-center">
            <div className="relative w-16 h-16 mx-auto mb-5">
              <div className="absolute inset-0 rounded-full bg-accent/20 animate-ping" />
              <div className="relative w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                <Search className="w-7 h-7 text-accent" />
              </div>
            </div>
            <p
              key={matchingMessageIdx}
              className="text-base sm:text-lg font-medium text-foreground mb-5 animate-fade-in"
            >
              {matchingMessages[matchingMessageIdx]}
            </p>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden max-w-sm mx-auto">
              <div
                className="h-full bg-accent rounded-full"
                style={{
                  width: `${matchingProgress}%`,
                  transition: "width 600ms cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              />
            </div>
            <p className="text-[11px] text-muted-foreground mt-3">ZIP {effectiveZip}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="lead-form" className="py-12 sm:py-20 lg:py-24 px-4 sm:px-6 bg-background">
      <div className="max-w-xl mx-auto">
        {/* Value header */}
        <div className="text-center mb-6 sm:mb-8">
          <p className="text-accent font-semibold text-sm sm:text-base uppercase tracking-wider mb-2">
            Free Quote + 1-Year Price Guarantee
          </p>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-serif font-bold text-foreground mb-2 sm:mb-3">
            {geo.in_service_area && geo.region_name
              ? `Great — installers available in ${geo.region_name}`
              : "Find Your Local Shower Match"}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Answer a few quick questions so we can match your project to the right local installer. About 60 seconds. No obligation. No spam.
          </p>
          {geo.region_name && (
            <p className="text-xs sm:text-sm text-accent mt-2 flex items-center justify-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              Trusted local installers serve the {geo.region_name}
            </p>
          )}
        </div>

        {/* Progress bar */}
        <div className="mb-6 sm:mb-8">
          <div className="flex justify-between text-[11px] sm:text-xs text-muted-foreground mb-2">
            {stepLabels.map((label, i) => (
              <span key={label} className={`font-medium ${step >= i ? "text-accent" : ""}`}>
                {i + 1}. {label}
              </span>
            ))}
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-[11px] sm:text-xs text-muted-foreground text-center mt-2">
            {step === 0 && "Just getting started — about 60 seconds total."}
            {step === 1 && "Tell us about your project — we're matching as you go."}
            {step === 2 && "Almost there — refining your installer match."}
            {step === 3 && "One last step — your local match is ready."}
            {step === 4 && "You're 100% complete — just confirm to send."}
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-5 sm:p-8 shadow-sm">
          <form onSubmit={handleSubmit}>
            {/* Step 0: Bathroom level + Shower setup */}
            {step === 0 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif font-bold text-foreground text-base sm:text-lg mb-1">
                    What level is your bathroom on?
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    Access and layout can impact installation approach and timeline.
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    {["First floor", "Second floor", "Basement"].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setBathroomLevel(option)}
                        className={`p-3 rounded-lg border-2 text-sm font-medium transition-all text-left ${
                          bathroomLevel === option
                            ? "border-accent bg-accent/15 text-foreground shadow-sm ring-2 ring-accent/30"
                            : "border-border hover:border-accent/50 text-muted-foreground"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={bathroomLevel ? "opacity-100" : "opacity-40 pointer-events-none"}>
                  <h3 className="font-serif font-bold text-foreground text-base sm:text-lg mb-1">
                    What type of shower setup do you currently have?
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    Different setups may require different installation methods.
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    {["Tub + shower combo", "Walk-in shower", "Not sure"].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setShowerSetup(option)}
                        className={`p-3 rounded-lg border-2 text-sm font-medium transition-all text-left ${
                          showerSetup === option
                            ? "border-accent bg-accent/15 text-foreground shadow-sm ring-2 ring-accent/30"
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

            {/* Step 1: Project goal + Water shut-off */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif font-bold text-foreground text-base sm:text-lg mb-1">
                    What are you looking to do with your shower?
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    Helps us match you with installers experienced in your type of project.
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      "Replace existing shower",
                      "Upgrade to something more modern",
                      "Full remodel",
                    ].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setProjectType(option)}
                        className={`p-3 rounded-lg border-2 text-sm font-medium transition-all text-left ${
                          projectType === option
                            ? "border-accent bg-accent/15 text-foreground shadow-sm ring-2 ring-accent/30"
                            : "border-border hover:border-accent/50 text-muted-foreground"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={projectType ? "opacity-100" : "opacity-40 pointer-events-none"}>
                  <h3 className="font-serif font-bold text-foreground text-base sm:text-lg mb-1">
                    Do you know where your home's main water shut-off is located?
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    This can affect installation planning and timing.
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      "Yes, easy to access",
                      "Yes, but not easily accessible",
                      "Not sure",
                    ].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setShutoffAccess(option)}
                        className={`p-3 rounded-lg border-2 text-sm font-medium transition-all text-left ${
                          shutoffAccess === option
                            ? "border-accent bg-accent/15 text-foreground shadow-sm ring-2 ring-accent/30"
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

            {/* Step 2: Timing + Priority */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif font-bold text-foreground text-base sm:text-lg mb-1">
                    When are you looking to complete your project?
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    Installer availability can vary based on schedule.
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {["Within 30 days", "1-3 months", "3-6 months", "Just researching"].map(
                      (option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setTimeline(option)}
                          className={`p-3 rounded-lg border-2 text-sm font-medium transition-all text-left ${
                            timeline === option
                              ? "border-accent bg-accent/15 text-foreground shadow-sm ring-2 ring-accent/30"
                              : "border-border hover:border-accent/50 text-muted-foreground"
                          }`}
                        >
                          {option}
                        </button>
                      )
                    )}
                  </div>
                  {timeline === "Just researching" && (
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                      Just researching is okay — we can still show you your local options.
                    </p>
                  )}
                </div>

                <div className={timeline ? "opacity-100" : "opacity-40 pointer-events-none"}>
                  <h3 className="font-serif font-bold text-foreground text-base sm:text-lg mb-1">
                    What's most important for your new shower?
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    Helps us match you with installers who specialize in what matters most to you.
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "Easy cleaning / low maintenance",
                      "Long-term durability",
                      "Faster installation",
                      "High-end look",
                    ].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setPriority(option)}
                        className={`p-3 rounded-lg border-2 text-sm font-medium transition-all text-left ${
                          priority === option
                            ? "border-accent bg-accent/15 text-foreground shadow-sm ring-2 ring-accent/30"
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

            {/* Step 3: Contact Info — phone call matching */}
            {step === 3 && (
              <div className="space-y-5">
                {/* Match reinforcement */}
                <div className="bg-accent/10 border border-accent/30 rounded-lg p-3 flex gap-2.5 items-start">
                  <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-foreground leading-relaxed">
                    Based on your answers, we'll match you with installers experienced in projects like yours.
                  </p>
                </div>

                {/* Headline + Support text */}
                <div>
                  <h3 className="font-serif font-bold text-foreground text-base sm:text-lg mb-1">
                    What's the best number for your quick installer matching call?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    A short call helps confirm your setup, timeline, and the best installer options for your project.
                  </p>
                </div>

                {/* Name field */}
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                    Your name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={100}
                    placeholder="First and last name"
                    className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                {/* Phone field - primary focus */}
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">
                    Best number for your quick matching call
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    placeholder="(555) 555-5555"
                    className={`w-full px-4 py-3 border-2 rounded-lg bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-accent ${phoneError ? "border-destructive" : "border-accent/40"}`}
                  />
                  {phoneError ? (
                    <p className="text-xs text-destructive mt-1">{phoneError}</p>
                  ) : (
                    <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                      We'll use this to review your project details, confirm installer fit, and discuss next steps.
                    </p>
                  )}
                </div>

                {/* Reassurance section - what to expect */}
                <div className="bg-secondary/60 rounded-lg p-4 border border-border/60">
                  <h4 className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                    What to expect next
                  </h4>
                  <ul className="space-y-1.5">
                    <li className="flex items-start gap-2 text-xs text-muted-foreground">
                      <span className="text-accent mt-0.5">•</span>
                      <span>A quick project review call</span>
                    </li>
                    <li className="flex items-start gap-2 text-xs text-muted-foreground">
                      <span className="text-accent mt-0.5">•</span>
                      <span>Confirmation of your setup and timeline</span>
                    </li>
                    <li className="flex items-start gap-2 text-xs text-muted-foreground">
                      <span className="text-accent mt-0.5">•</span>
                      <span>Your best-fit installer options and next steps</span>
                    </li>
                  </ul>
                  <p className="text-[11px] text-accent mt-2.5 font-medium">
                    Most calls take just a few minutes.
                  </p>
                </div>

                {/* Email field - optional */}
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                    Email <span className="opacity-70">(optional)</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    maxLength={255}
                    placeholder="you@example.com"
                    className="w-full px-4 py-2.5 border border-input rounded-lg bg-muted/30 text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:text-foreground focus:bg-background"
                  />
                  <p className="text-[11px] text-muted-foreground mt-1.5">
                    Receive your installer match details in writing too.
                  </p>
                </div>

                {/* TCPA Disclaimer - updated for call focus */}
                <p className="text-[10px] text-muted-foreground text-center leading-relaxed">
                  By clicking Continue, I consent to Solid Surface Baths contacting me at the number provided — including by autodialer, prerecorded or artificial voice, and SMS — for marketing, even if on a Do Not Call list. Consent is not required to purchase. Call{" "}
                  <a href="tel:9178130137" className="underline text-accent">917-813-0137</a> for help.
                </p>
              </div>
            )}

            {/* Step 4: Confirm */}
            {step === 4 && (
              <div className="space-y-5">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-serif font-bold text-foreground text-lg sm:text-xl mb-2">
                    Confirm Your Local Match
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Review your details below and confirm to connect with your local installer.
                  </p>
                </div>

                <div className="bg-secondary rounded-lg p-4 space-y-2.5 text-sm">
                  {geo.region_name && (
                    <div className="flex justify-between gap-3">
                      <span className="text-muted-foreground">Service Area</span>
                      <span className="text-foreground font-medium text-right">{geo.region_name}</span>
                    </div>
                  )}
                  <div className="flex justify-between gap-3">
                    <span className="text-muted-foreground">Zip Code</span>
                    <span className="text-foreground font-medium">{effectiveZip}</span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="text-muted-foreground">Bathroom Level</span>
                    <span className="text-foreground font-medium text-right">{bathroomLevel}</span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="text-muted-foreground">Current Setup</span>
                    <span className="text-foreground font-medium text-right">{showerSetup}</span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="text-muted-foreground">Project Goal</span>
                    <span className="text-foreground font-medium text-right">{projectType}</span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="text-muted-foreground">Water Shut-off</span>
                    <span className="text-foreground font-medium text-right">{shutoffAccess}</span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="text-muted-foreground">Timeline</span>
                    <span className="text-foreground font-medium text-right">{timeline}</span>
                  </div>
                  {priority && (
                    <div className="flex justify-between gap-3">
                      <span className="text-muted-foreground">Top Priority</span>
                      <span className="text-foreground font-medium text-right">{priority}</span>
                    </div>
                  )}
                  <div className="border-t border-border pt-2.5 mt-2.5 flex justify-between gap-3">
                    <span className="text-muted-foreground">Contact</span>
                    <span className="text-foreground font-medium text-right">{name}<br />{phone}</span>
                  </div>
                  {email && (
                    <div className="flex justify-between gap-3">
                      <span className="text-muted-foreground">Email</span>
                      <span className="text-foreground font-medium text-right">{email}</span>
                    </div>
                  )}
                </div>

                <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 flex gap-3 items-start">
                  <Shield className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-foreground leading-relaxed">
                    A trusted local installer will follow up during business hours to discuss your project and next steps.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation */}
            {step === 4 ? (
              <div className="mt-6 sm:mt-8 space-y-3">
                <button
                  type="submit"
                  disabled={!canAdvance() || submitting}
                  className="w-full bg-cta text-cta-foreground font-semibold py-3.5 rounded-sm text-sm uppercase tracking-wider hover:opacity-90 active:opacity-80 transition-all disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed"
                >
                  {submitting ? "Submitting..." : "Confirm My Local Match"}
                </button>
                <button
                  type="button"
                  onClick={back}
                  className="w-full flex items-center justify-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </button>
              </div>
            ) : (
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
                <button
                  type="button"
                  onClick={next}
                  disabled={!canAdvance()}
                  className={`flex items-center gap-1 font-semibold px-6 py-3 rounded-sm text-sm uppercase tracking-wider transition-all disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed disabled:shadow-none ${
                    canAdvance()
                      ? "bg-cta text-cta-foreground hover:opacity-90 active:opacity-80 shadow-lg shadow-cta/30 ring-2 ring-cta/20"
                      : "bg-cta text-cta-foreground"
                  }`}
                >
                  {step === 2 ? "Check My Shower Options" : "Continue"}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </form>

          <p className="text-[10px] leading-tight text-muted-foreground text-center mt-5">
            No spam. Only used for your shower quote request and local installer follow-up.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MultiStepFormSection;
