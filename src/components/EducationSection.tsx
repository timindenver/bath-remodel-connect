import solidImg1 from "@/assets/solid-surface-1.webp";
import solidImg2 from "@/assets/solid-surface-2.webp";
import solidImg3 from "@/assets/solid-surface-3.webp";

const EducationSection = () => {
  return (
    <section className="py-12 sm:py-20 lg:py-24 px-4 sm:px-6 bg-secondary">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          <div className="rounded-lg overflow-hidden border border-border">
            <img
              src={solidImg1}
              alt="Modern solid surface shower with glass panel and wooden bath mat"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="rounded-lg overflow-hidden border border-border">
            <img
              src={solidImg2}
              alt="Blue marble solid surface shower wall with brushed nickel fixtures"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="rounded-lg overflow-hidden border border-border">
            <img
              src={solidImg3}
              alt="Craftsman polishing white calacatta solid surface panel"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
