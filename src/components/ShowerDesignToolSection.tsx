import { Monitor, Smartphone } from "lucide-react";
import showerDesktop from "@/assets/shower-design-desktop.jpg";
import showerMobile from "@/assets/shower-design-mobile.png";

const ShowerDesignToolSection = () => {
  return (
    <section className="py-12 sm:py-20 lg:py-24 px-4 sm:px-6 bg-card">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4">
          Use Our Free & Easy Shower Design Tool
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto mb-4">
          No download required — design your dream shower right from your browser while you wait for your quote.
        </p>
        <p className="text-muted-foreground text-sm sm:text-base mb-10">
          Works beautifully on both <span className="font-semibold text-foreground">mobile</span> and <span className="font-semibold text-foreground">desktop</span>.
        </p>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Desktop view */}
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2 text-accent font-semibold">
              <Monitor className="w-5 h-5" />
              <span>Desktop</span>
            </div>
            <div className="rounded-xl overflow-hidden border border-border shadow-lg">
              <img
                src={showerDesktop}
                alt="Shower design tool on desktop showing a woman customizing her shower layout"
                className="w-full object-cover"
              />
            </div>
          </div>

          {/* Mobile view */}
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2 text-accent font-semibold">
              <Smartphone className="w-5 h-5" />
              <span>Mobile</span>
            </div>
            <div className="rounded-xl overflow-hidden border border-border shadow-lg max-w-[280px] mx-auto">
              <img
                src={showerMobile}
                alt="Shower design tool on mobile showing shower customization options"
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowerDesignToolSection;
