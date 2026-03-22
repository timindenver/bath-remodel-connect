import { useState, FormEvent } from "react";
import { ChevronRight, ChevronLeft, Shield } from "lucide-react";

const STEPS = ["Timeline", "Priorities", "Location", "Contact"];

const scrollToForm = () => {
  document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
};

const MultiStepFormSection = () => {
  const [step, setStep] = useState(0);
  const [timeline, setTimeline] = useState("");
  const [concern, setConcern] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [openToVisit, setOpenToVisit] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const canAdvance = () => {
    if (step === 0) return timeline !== "";
    if (step === 1) return concern !== "";
    if (step === 2) return zipCode.trim().length >= 5;
    if (step === 3)
      return (
        firstName.trim() !== "" &&
        lastName.trim() !== "" &&
        email.trim() !== "" &&
        phone.trim() !== "" &&
        openToVisit !== ""
      );
    return false;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!canAdvance()) return;
    setSubmitted(true);
  };

  const next = () => {
    if (canAdvance() && step < 3) setStep(step + 1);
  };
  const back = () => {
    if (step > 0) setStep(step - 1);
  };

  if (submitted) {
    return (
      <section id="lead-form" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-background">
        <div className="max-w-lg mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-accent" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4">
            You're All Set!
          </h2>
          <p className="text-muted-foreground mb-2">
            We're matching you with a certified local contractor. Expect a call or email within 24 hours.
          </p>
          <p className="text-sm text-muted-foreground">
            No obligation. No pressure.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="lead-form" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-background">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-foreground mb-3">
            Get Your Free Quote in 60 Seconds
          </h2>
          <p className="text-muted-foreground">
            See if a certified solid surface installer is available in your area — no commitment required.
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            {STEPS.map((label, i) => (
              <span
                key={label}
                className={`font-medium ${i <= step ? "text-accent" : ""}`}
              >
                {label}
              </span>
            ))}
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all duration-300"
              style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 sm:p-8 shadow-sm">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Timeline */}
            {step === 0 && (
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-foreground text-lg mb-1">
                  When are you planning your remodel?
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  This helps us match you with contractors who have availability.
                </p>
                {["Within 30 days", "1–3 months", "3–6 months", "Just researching"].map(
                  (option) => (
                    <label
                      key={option}
                      className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                        timeline === option
                          ? "border-accent bg-accent/5"
                          : "border-border hover:border-accent/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="timeline"
                        value={option}
                        checked={timeline === option}
                        onChange={(e) => setTimeline(e.target.value)}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          timeline === option
                            ? "border-accent"
                            : "border-muted-foreground/30"
                        }`}
                      >
                        {timeline === option && (
                          <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                        )}
                      </div>
                      <span className="text-foreground text-sm">{option}</span>
                    </label>
                  )
                )}
              </div>
            )}

            {/* Step 2: Concern */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-foreground text-lg mb-1">
                  What matters most to you?
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Choose the biggest factor in your decision.
                </p>
                {[
                  "Eliminating mold & mildew",
                  "Material quality & durability",
                  "Getting the best value",
                  "A premium, modern look",
                ].map((option) => (
                  <label
                    key={option}
                    className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                      concern === option
                        ? "border-accent bg-accent/5"
                        : "border-border hover:border-accent/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="concern"
                      value={option}
                      checked={concern === option}
                      onChange={(e) => setConcern(e.target.value)}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        concern === option
                          ? "border-accent"
                          : "border-muted-foreground/30"
                      }`}
                    >
                      {concern === option && (
                        <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                      )}
                    </div>
                    <span className="text-foreground text-sm">{option}</span>
                  </label>
                ))}
              </div>
            )}

            {/* Step 3: Zip */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-foreground text-lg mb-1">
                  What's your zip code?
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  We'll check if there's a certified installer in your area.
                </p>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={5}
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value.replace(/\D/g, ""))}
                  placeholder="Enter your zip code"
                  className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            )}

            {/* Step 4: Contact */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-foreground text-lg mb-1">
                  Last step — how can we reach you?
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Your information is never shared with other companies.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-card-foreground mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-card-foreground mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-card-foreground mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-card-foreground mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-card-foreground mb-1">
                    Are you open to having a contractor visit your home for an exact quote?
                  </label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {["Yes, absolutely", "Maybe — tell me more"].map((option) => (
                      <label
                        key={option}
                        className={`flex items-center justify-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors text-sm ${
                          openToVisit === option
                            ? "border-accent bg-accent/5 text-foreground"
                            : "border-border hover:border-accent/50 text-muted-foreground"
                        }`}
                      >
                        <input
                          type="radio"
                          name="openToVisit"
                          value={option}
                          checked={openToVisit === option}
                          onChange={(e) => setOpenToVisit(e.target.value)}
                          className="sr-only"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
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

              {step < 3 ? (
                <button
                  type="button"
                  onClick={next}
                  disabled={!canAdvance()}
                  className="flex items-center gap-1 bg-accent text-accent-foreground font-semibold px-6 py-3 rounded-sm text-sm uppercase tracking-wider hover:opacity-90 active:opacity-80 transition-all disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed"
                >
                  Continue
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!canAdvance()}
                  className="bg-accent text-accent-foreground font-semibold px-8 py-3 rounded-sm text-sm uppercase tracking-wider hover:opacity-90 active:opacity-80 transition-all disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed"
                >
                  Submit — Check Availability
                </button>
              )}
            </div>
          </form>

          <p className="text-[10px] leading-tight text-muted-foreground text-center mt-6">
            By clicking Submit, I expressly consent to Solid Surface Baths contacting me at the telephone number or email address provided for marketing purposes related to its home remodeling services, including through the use of automated dialing technology, SMS/MMS messages, AI generative voice, and prerecorded and/or artificial voice messages, even if my number is currently listed on any state, federal or internal Do Not Call list. Message and data rates may apply. I understand that consent is not a condition of purchase and to be helped I can call 1-720-807-3626
          </p>
        </div>
      </div>
    </section>
  );
};

export default MultiStepFormSection;
