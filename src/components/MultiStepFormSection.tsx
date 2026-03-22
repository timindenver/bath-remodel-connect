import { useState, FormEvent, useCallback } from "react";
import { ChevronRight, ChevronLeft, Shield, Lock } from "lucide-react";

const STEPS = ["About Your Project", "Your Info", "Get Quote"];

const MultiStepFormSection = () => {
  const [step, setStep] = useState(0);
  const [timeline, setTimeline] = useState("");
  const [concern, setConcern] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const canAdvance = () => {
    if (step === 0) return timeline !== "" && concern !== "";
    if (step === 1) return zipCode.trim().length >= 5 && name.trim() !== "" && phone.trim() !== "";
    return false;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!canAdvance()) return;
    setSubmitted(true);
  };

  const next = () => {
    if (canAdvance() && step < 1) setStep(step + 1);
  };
  const back = () => {
    if (step > 0) setStep(step - 1);
  };

  // Auto-scroll concern into view when timeline is selected
  const handleTimelineSelect = useCallback((value: string) => {
    setTimeline(value);
    // Small delay so the UI updates first
    setTimeout(() => {
      document.getElementById("concern-section")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 150);
  }, []);

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
            We're matching you with a certified local contractor. Expect a call within 24 hours.
          </p>
          <p className="text-sm text-muted-foreground">
            No obligation. No pressure.
          </p>
        </div>
      </section>
    );
  }

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
        </div>

        {/* Progress bar — simplified */}
        <div className="mb-6 sm:mb-8">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span className={`font-medium ${step >= 0 ? "text-accent" : ""}`}>1. Project</span>
            <span className={`font-medium ${step >= 1 ? "text-accent" : ""}`}>2. Contact</span>
            <span className={`font-medium ${submitted ? "text-accent" : ""}`}>3. Done ✓</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all duration-300"
              style={{ width: `${submitted ? 100 : ((step + 1) / 2) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-5 sm:p-8 shadow-sm">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Timeline + Concern (combined, tap-to-select) */}
            {step === 0 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif font-bold text-foreground text-base sm:text-lg mb-3">
                    When are you looking to remodel?
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {["Within 30 days", "1–3 months", "3–6 months", "Just researching"].map(
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

                {/* Show concern only after timeline selected for progressive disclosure */}
                <div id="concern-section" className={timeline ? "opacity-100" : "opacity-40 pointer-events-none"}>
                  <h3 className="font-serif font-bold text-foreground text-base sm:text-lg mb-3">
                    What matters most to you?
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "No mold or mildew",
                      "Quality & durability",
                      "Best value",
                      "Premium look",
                    ].map((option) => (
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

            {/* Step 2: Zip + Name + Phone (email optional) */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-foreground text-base sm:text-lg mb-1">
                  Almost done — where should we send your quote?
                </h3>
                <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Your info is never shared or sold.
                </p>
                <div>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={5}
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value.replace(/\D/g, ""))}
                    placeholder="Zip code"
                    className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone number"
                    className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email (optional)"
                    className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-accent"
                  />
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

              {step === 0 ? (
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
                  disabled={!canAdvance()}
                  className="w-full bg-accent text-accent-foreground font-semibold py-3.5 rounded-sm text-sm uppercase tracking-wider hover:opacity-90 active:opacity-80 transition-all disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed"
                >
                  Get My Free Quote
                </button>
              )}
            </div>
          </form>

          <p className="text-[10px] leading-tight text-muted-foreground text-center mt-5">
            By submitting, I consent to Solid Surface Baths contacting me at the number provided, including via automated calls/texts, even if listed on a Do Not Call list. Consent is not required for purchase. Call 1-720-807-3626 for help.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MultiStepFormSection;
