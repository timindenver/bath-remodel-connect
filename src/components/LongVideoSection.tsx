import { useRef, useState } from "react";
import { Play } from "lucide-react";

// Cloudflare Stream — long ~3.5min explainer
const LONG_VIDEO_UID = "e6a9329e7f334ee6948223b39ca4c551";
const CUSTOMER_SUBDOMAIN = "customer-38242opq113ub1y9.cloudflarestream.com";

const TIMESTAMPS: { label: string; time: number; display: string }[] = [
  { label: "Worried about pushy sales appointments?", time: 18, display: "0:18" },
  { label: "Why one-day showers look cheaper (and what's different)", time: 52, display: "0:52" },
  { label: "What a quality shower should actually cost", time: 94, display: "1:34" },
  { label: "What actually happens after you submit your info", time: 135, display: "2:15" },
  { label: "How we avoid sending you to multiple contractors", time: 168, display: "2:48" },
];

const LongVideoSection = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [activeTime, setActiveTime] = useState<number | null>(null);

  // Cloudflare Stream supports the postMessage Player API:
  // https://developers.cloudflare.com/stream/uploading-videos/player-api/
  const seekTo = (seconds: number) => {
    setActiveTime(seconds);
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) return;
    // Stream player listens for { event: "command", method: "...", value: ... } via postMessage.
    iframe.contentWindow.postMessage(
      { event: "command", func: "setCurrentTime", args: [seconds] },
      "*"
    );
    iframe.contentWindow.postMessage(
      { event: "command", func: "play", args: [] },
      "*"
    );
    // Scroll player into view on mobile
    iframe.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const embedSrc = `https://${CUSTOMER_SUBDOMAIN}/${LONG_VIDEO_UID}/iframe?preload=metadata&poster=https%3A%2F%2F${CUSTOMER_SUBDOMAIN}%2F${LONG_VIDEO_UID}%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D2s`;

  return (
    <section className="bg-muted/30 py-12 sm:py-16 lg:py-20 border-y border-border">
      <div className="max-w-6xl mx-auto px-6 sm:px-12 lg:px-16">
        <div className="text-center mb-8 lg:mb-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Still have questions?
          </p>
          <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-foreground text-balance">
            Not ready to book yet? Watch this first (3 minutes)
          </h2>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto text-balance">
            This explains everything—how the process works, what to expect, and how to avoid common mistakes when choosing a shower remodel.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-10 items-start">
          {/* Vertical 9:16 video player */}
          <div className="lg:col-span-2 flex justify-center">
            <div className="w-full max-w-[320px] sm:max-w-[360px]">
              <div className="relative aspect-[9/16] rounded-lg overflow-hidden shadow-2xl bg-black ring-1 ring-border">
                <iframe
                  ref={iframeRef}
                  src={embedSrc}
                  loading="lazy"
                  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                  title="Full shower remodel explainer"
                />
              </div>
            </div>
          </div>

          {/* Clickable timestamps */}
          <div className="lg:col-span-3">
            <div className="bg-card border border-border rounded-lg p-5 sm:p-6 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
                Jump to what matters to you
              </h3>
              <ul className="space-y-2">
                {TIMESTAMPS.map((ts) => {
                  const isActive = activeTime === ts.time;
                  return (
                    <li key={ts.time}>
                      <button
                        onClick={() => seekTo(ts.time)}
                        className={`w-full text-left flex items-start gap-3 p-3 rounded-md transition-colors touch-manipulation ${
                          isActive
                            ? "bg-cta/10 ring-1 ring-cta/30"
                            : "hover:bg-muted active:bg-muted"
                        }`}
                      >
                        <span className="flex-shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full bg-cta/10 text-cta">
                          <Play className="w-4 h-4 fill-current" />
                        </span>
                        <span className="flex-1">
                          <span className="block text-sm font-semibold text-foreground leading-snug">
                            {ts.label}
                          </span>
                          <span className="block text-xs text-muted-foreground mt-0.5 font-mono">
                            {ts.display}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LongVideoSection;
