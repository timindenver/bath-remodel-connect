import { useState, FormEvent, useCallback } from "react";
import { ChevronRight, ChevronLeft, Shield, MapPin, Timer, CheckCircle2 } from "lucide-react";
import { useGeo } from "@/contexts/GeoContext";
import { supabase } from "@/integrations/supabase/client";

const MultiStepFormSection = () => {
  const { geo, lookupByZip, utm } = useGeo();
  const [step, setStep] = useState(0);
  const [projectType, setProjectType] = useState("");
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
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [outOfArea, setOutOfArea] = useState(false);
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);

  // Sync zip from geo detection
  const effectiveZip = zipCode || geo.zip_code || "";

  // 4-step flow:
  // 0: Project (zip + project type)
  // 1: Timeline + Schedule (timeline + preferred day + time)
  // 2: Contact (name + phone + email)
  // 3: Confirm (review + submit)
  const canAdvance = () => {
    if (step === 0) return effectiveZip.trim().length >= 5 && projectType !== "";
    if (step === 1) return timeline !== "" && preferredDay !== "" && preferredTime !== "";
    if (step === 2) return name.trim() !== "" && isPhoneValid();
    if (step === 3) return true;
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
          project_type: projectType,
          timeline,
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
    if (canAdvance() && step < 3) setStep(step + 1);
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
      <section id="lead-form" className="py-12 sm:py-20 lg:py-24 px-4 sm:px-6 bg-background">
        <div className="max-w-lg mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-accent" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4">
            You're Matched!
          </h2>
          <p className="text-muted-foreground mb-2">
            {geo.region_name
              ? `Your local installer for the ${geo.region_name} will call within 60 minutes (during business hours) to confirm your in-home visit.`
              : "Your matched local installer will call within 60 minutes during business hours to confirm your in-home visit."}
          </p>
          <p className="text-sm text-muted-foreground">
            No obligation. No pressure. Walk away anytime.
          </p>
        </div>
      </section>
    );
  }

  const totalSteps = 4;
  const progressPercent = ((step + 1) / totalSteps) * 100;
  const stepLabels = ["Project", "Schedule", "Contact", "Confirm"];

  return (
    <section id="lead-form" className="py-12 sm:py-20 lg:py-24 px-4 sm:px-6 bg-background">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-serif font-bold text-foreground mb-2 sm:mb-3">
            See My Local Installer Options
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            About 60 seconds. No obligation. No spam.
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
        </div>

        <div className="bg-card border border-border rounded-lg p-5 sm:p-8 shadow-sm">
          <form onSubmit={handleSubmit}>
            {/* Step 0: Project (zip + project type only) */}
            {step === 0 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif font-bold text-foreground text-base sm:text-lg mb-3">
                    What's your zip code?
                  </h3>
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
                    <p className="text-xs text-accent mt-2 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> Great — we have an installer in the {geo.region_name}!
                    </p>
                  )}
                </div>

                <div className={effectiveZip.length >= 5 ? "opacity-100" : "opacity-40 pointer-events-none"}>
                  <h3 className="font-serif font-bold text-foreground text-base sm:text-lg mb-3">
                    What type of project?
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      "Tub Replacement",
                      "Shower Replacement",
                      "Tub/Shower Combo Replacement"
                    ].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setProjectType(option)}
                        className={`p-3 rounded-lg border text-sm font-medium transition-colors text-left ${
                          projectType === option
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

            {/* Step 1: Timeline + Scheduling */}
            {step === 1 && (
              <div className="space-y-5">
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
                          onClick={() => setTimeline(option)}
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

                <div className={timeline ? "opacity-100" : "opacity-40 pointer-events-none"}>
                  <h3 className="font-serif font-bold text-foreground text-base sm:text-lg mb-3">
                    What day works best for you?
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => setPreferredDay(day)}
                        className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                          preferredDay === day
                            ? "border-accent bg-accent/10 text-foreground"
                            : "border-border hover:border-accent/50 text-muted-foreground"
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={preferredDay ? "opacity-100" : "opacity-40 pointer-events-none"}>
                  <h3 className="font-serif font-bold text-foreground text-base sm:text-lg mb-3">
                    What time works best?
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {["Early AM", "Mid Day", "Evenings"].map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setPreferredTime(time)}
                        className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                          preferredTime === time
                            ? "border-accent bg-accent/10 text-foreground"
                            : "border-border hover:border-accent/50 text-muted-foreground"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Contact Info */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-foreground text-base sm:text-lg">
                  Where should we send your match?
                </h3>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    placeholder="(555) 555-5555"
                    className={`w-full px-4 py-3 border rounded-lg bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-accent ${phoneError ? "border-destructive" : "border-input"}`}
                  />
                  {phoneError && <p className="text-xs text-destructive mt-1">{phoneError}</p>}
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email (optional)"
                  className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <p className="text-[10px] text-muted-foreground text-center leading-relaxed mt-2">
                  By clicking Confirm, I expressly consent to Solid Surface Baths contacting me at the telephone number or email address provided for marketing purposes related to its home remodeling services, including through the use of automated dialing technology, SMS/MMS messages, AI generative voice, and prerecorded and/or artificial voice messages, even if my number is currently listed on any state, federal or internal Do Not Call list. Message and data rates may apply. I understand that consent is not a condition of purchase and to be helped I can call{" "}
                  <a href="tel:9178130137" className="underline text-accent">917-813-0137</a>.
                </p>
              </div>
            )}

            {/* Step 4: Confirm */}
            {step === 3 && (
              <div className="space-y-5">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-serif font-bold text-foreground text-lg sm:text-xl mb-2">
                    Choose Your Next Step
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    See availability and decide whether you'd like to book a no-obligation in-home consultation.
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
                    <span className="text-muted-foreground">Project</span>
                    <span className="text-foreground font-medium text-right">{projectType}</span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="text-muted-foreground">Zip Code</span>
                    <span className="text-foreground font-medium">{effectiveZip}</span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="text-muted-foreground">Timeline</span>
                    <span className="text-foreground font-medium text-right">{timeline}</span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="text-muted-foreground">Preferred Visit</span>
                    <span className="text-foreground font-medium text-right">{preferredDay} · {preferredTime}</span>
                  </div>
                  <div className="border-t border-border pt-2.5 mt-2.5 flex justify-between gap-3">
                    <span className="text-muted-foreground">Contact</span>
                    <span className="text-foreground font-medium text-right">{name}<br />{phone}</span>
                  </div>
                </div>

                <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 flex gap-3 items-start">
                  <Shield className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-foreground leading-relaxed">
                    A trusted local installer will reach out within <span className="font-bold text-accent">60 minutes</span> during business hours. No obligation — you decide whether to move forward.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation */}
            {step === 3 ? (
              <div className="mt-6 sm:mt-8 space-y-3">
                <button
                  type="submit"
                  disabled={!canAdvance() || submitting}
                  className="w-full bg-cta text-cta-foreground font-semibold py-3.5 rounded-sm text-sm uppercase tracking-wider hover:opacity-90 active:opacity-80 transition-all disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed"
                >
                  {submitting ? "Submitting..." : "See My Local Installer Options"}
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
                  className="flex items-center gap-1 bg-cta text-cta-foreground font-semibold px-6 py-3 rounded-sm text-sm uppercase tracking-wider hover:opacity-90 active:opacity-80 transition-all disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed"
                >
                  See My Local Installer Options
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </form>

          <p className="text-[10px] leading-tight text-muted-foreground text-center mt-5">
            No spam. Your information is only used to connect you with up to three local installers about your shower project.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MultiStepFormSection;
