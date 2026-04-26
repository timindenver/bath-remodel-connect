import { lazy, Suspense, useRef } from "react";
import HeroSection from "@/components/HeroSection";
import LocalContractorSection from "@/components/LocalContractorSection";
import TrustBadgesSection from "@/components/TrustBadgesSection";
import VideoTrustSection from "@/components/VideoTrustSection";
// Eager-load the first below-fold sections — they hydrate almost immediately
// and lazy-loading them was causing large CLS (sections popping in).
import ProcessSection from "@/components/ProcessSection";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import { openLeadForm } from "@/lib/openLeadForm";

// Lazy load deeper below-fold sections to reduce initial bundle size
const LongVideoSection = lazy(() => import("@/components/LongVideoSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const MultiStepFormSection = lazy(() => import("@/components/MultiStepFormSection"));
const WhyMatchingMattersSection = lazy(() => import("@/components/WhyMatchingMattersSection"));
const ComparisonSection = lazy(() => import("@/components/ComparisonSection"));
const EducationSection = lazy(() => import("@/components/EducationSection"));


const FinalCTASection = lazy(() => import("@/components/FinalCTASection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const Footer = lazy(() => import("@/components/Footer"));
const StickyMobileCTA = lazy(() => import("@/components/StickyMobileCTA"));
const FormModal = lazy(() => import("@/components/FormModal"));

// Reserved-space placeholder to prevent layout shift while lazy chunks load
const SectionSkeleton = ({ minHeight = "600px" }: { minHeight?: string }) => (
  <div aria-hidden="true" style={{ minHeight }} />
);

const Index = () => {
  const formRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen">
      {/* Paid-traffic order: Hero → Trust → How it works → Proof → Form → Deeper education → Urgency */}
      <HeroSection />
      <BeforeAfterSection />
      <Suspense fallback={<SectionSkeleton minHeight="700px" />}>
        <TestimonialsSection />
      </Suspense>
      <VideoTrustSection />
      <LocalContractorSection onCheckAvailability={openLeadForm} />
      <TrustBadgesSection />
      <ProcessSection />
      <Suspense fallback={<SectionSkeleton minHeight="800px" />}>
        <div ref={formRef}>
          <MultiStepFormSection onCheckAvailability={openLeadForm} />
        </div>
      </Suspense>
      <Suspense fallback={<SectionSkeleton minHeight="600px" />}>
        <ComparisonSection />
        <EducationSection />
        
        
        <LongVideoSection />
        <WhyMatchingMattersSection />
        <FAQSection />
        <Footer />
        <StickyMobileCTA />
        <FormModal />
      </Suspense>
    </div>
  );
};

export default Index;
