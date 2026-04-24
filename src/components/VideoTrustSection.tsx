import { CheckCircle2, ShieldCheck } from "lucide-react";

// Cloudflare Stream — short ~45s "what happens after you submit" video
const SHORT_VIDEO_UID = "4f6b18dd03f15677aeaee62da62c69af";
const CUSTOMER_SUBDOMAIN = "customer-38242opq113ub1y9.cloudflarestream.com";

const scrollToForm = () => {
  const el = document.getElementById("lead-form");
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 20;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
};

const VideoTrustSection = () => {
  const embedSrc = `https://${CUSTOMER_SUBDOMAIN}/${SHORT_VIDEO_UID}/iframe?autoplay=true&muted=true&preload=metadata&poster=https%3A%2F%2F${CUSTOMER_SUBDOMAIN}%2F${SHORT_VIDEO_UID}%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D14s`;

  return (
    <section className="bg-background py-14 sm:py-20 lg:py-24 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        {/* Section eyebrow — desire bridge */}
        <div className="text-center mb-8 lg:mb-12">
          <p className="mt-4 text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            What happens after you submit a request
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* LEFT — Vertical 9:16 video */}
          <div className="order-2 lg:order-1 flex flex-col items-center">
            <div className="w-full max-w-[300px] sm:max-w-[340px]">
              <div className="relative aspect-[9/16] rounded-lg overflow-hidden shadow-2xl bg-black ring-1 ring-border">
                <iframe
                  src={embedSrc}
                  loading="lazy"
                  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                  title="What happens after you submit the form"
                />
              </div>
              <p className="mt-3 text-center text-sm text-muted-foreground">
                Tap the video to unmute • 45 seconds
              </p>
            </div>
          </div>

          {/* RIGHT — Reassurance bullets + CTA */}
          <div className="order-3 lg:order-2">
            <div className="bg-card border-2 border-cta/20 rounded-lg p-6 sm:p-8 shadow-lg">
              <div className="inline-block bg-foreground text-background text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-sm mb-4">
                Our Promise
              </div>
              <p className="text-xl sm:text-2xl font-bold text-foreground mb-2 text-balance">
                We do <span className="text-cta">NOT</span> send your info to multiple contractors.
              </p>
              <h3 className="mt-6 text-lg font-semibold text-foreground">
                What happens after you submit:
              </h3>
              <ul className="mt-4 space-y-3">
                {[
                  "You will NOT be contacted by multiple contractors",
                  "We match you with ONE vetted installer (not multiple companies)",
                  "You'll get a quick call from OUR team first (3–4 minutes)",
                  "We confirm your goals before connecting you",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cta flex-shrink-0 mt-0.5" />
                    <span className="text-base text-foreground leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={scrollToForm}
                className="mt-6 w-full bg-cta text-cta-foreground font-semibold px-6 py-4 rounded-sm text-base uppercase tracking-wider hover:opacity-90 active:opacity-80 transition-opacity touch-manipulation shadow-md"
              >
                Check My Shower Options
              </button>
              <p className="mt-3 text-center text-sm font-medium text-foreground/80">
                No contractor spam. You'll hear from our team first.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoTrustSection;
