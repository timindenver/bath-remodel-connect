import { useState } from "react";
import designToolImg from "@/assets/design-tool.jpg";

const DesignToolSection = () => {
  const [showTool, setShowTool] = useState(false);

  return (
    <section className="py-20 px-6 bg-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
            Design Before You Buy
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
            Use our free DIY design tool to visualize your perfect shower or tub surround — then order with confidence.
          </p>
        </div>

        {!showTool ? (
          <div className="relative max-w-4xl mx-auto rounded-lg overflow-hidden group cursor-pointer" onClick={() => setShowTool(true)}>
            <img
              src={designToolImg}
              alt="Woman using the online shower design tool on her laptop"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center transition-opacity group-hover:bg-foreground/50">
              <button
                className="bg-accent text-accent-foreground font-semibold px-8 py-4 rounded-md text-lg shadow-lg transition-transform group-hover:scale-105"
              >
                Launch Design Tool
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto rounded-lg overflow-hidden shadow-lg border border-border">
            <iframe
              src="https://www.vistaquartz.com/design"
              title="Shower Design Tool"
              className="w-full border-0"
              style={{ height: "80vh", minHeight: "600px" }}
              allow="fullscreen"
              referrerPolicy="no-referrer"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default DesignToolSection;
