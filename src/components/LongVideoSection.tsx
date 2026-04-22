import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { Stream, type StreamPlayerApi } from "@cloudflare/stream-react";

// Cloudflare Stream — long ~3.5min explainer
const LONG_VIDEO_UID = "e6a9329e7f334ee6948223b39ca4c551";

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
};

const TIMESTAMPS: { label: string; time: number }[] = [
  { label: "Why one-day showers look cheaper (and what's different)", time: 52 },
  { label: "How do we help you avoid mistakes?", time: 80 }, // 1:20
  { label: "What actually happens when I submit my request?", time: 145 }, // 2:25
  { label: "What if I'm not ready?", time: 170 }, // 2:50
  { label: "Will you be getting multiple calls and texts?", time: 210 }, // 3:30
];

const LongVideoSection = () => {
  const playerRef = useRef<StreamPlayerApi | undefined>(undefined);
  const [activeTime, setActiveTime] = useState<number | null>(null);

  const seekTo = (seconds: number) => {
    setActiveTime(seconds);
    const player = playerRef.current;
    if (!player) return;
    try {
      player.currentTime = seconds;
      const playPromise = player.play();
      if (playPromise && typeof playPromise.then === "function") {
        playPromise.catch(() => {
          // Autoplay may be blocked; user can press play manually.
        });
      }
    } catch {
      // no-op
    }
  };

  return (
    <section className="bg-muted/30 py-12 sm:py-16 lg:py-20 border-y border-border">
      <div className="max-w-6xl mx-auto px-6 sm:px-12 lg:px-16">
        <div className="text-center mb-8 lg:mb-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Most homeowners wish they knew this before choosing a shower remodel.
          </p>
          <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-foreground text-balance">
            Before You Choose a Shower Remodel, Watch This (3 Minutes)
          </h2>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto text-balance">
            This quick video will help you understand your options, avoid common mistakes, and make sure you don't end up with a shower you regret.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-10 items-start">
          {/* Vertical 9:16 video player */}
          <div className="lg:col-span-2 flex justify-center">
            <div className="w-full max-w-[320px] sm:max-w-[360px]">
              <div className="relative aspect-[9/16] rounded-lg overflow-hidden shadow-2xl bg-black ring-1 ring-border">
                <div className="absolute inset-0">
                  <Stream
                    src={LONG_VIDEO_UID}
                    streamRef={playerRef}
                    controls
                    preload="metadata"
                    responsive={false}
                    className="w-full h-full"
                    title="Full shower remodel explainer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Clickable timestamps */}
          <div className="lg:col-span-3">
            <div className="bg-card border border-border rounded-lg p-5 sm:p-6 shadow-sm">
              <h3 className="text-base font-bold text-foreground mb-4">
                Start with what matters most to you:
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
                            {formatTime(ts.time)}
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

        {/* Soft CTA */}
        <p className="mt-8 lg:mt-10 text-center text-base sm:text-lg text-muted-foreground italic max-w-2xl mx-auto">
          When you're ready, you can safely check your options below—no pressure.
        </p>
      </div>
    </section>
  );
};

export default LongVideoSection;
