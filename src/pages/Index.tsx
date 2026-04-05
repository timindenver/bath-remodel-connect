import { lazy, Suspense } from "react";
import HeroSection from "@/components/HeroSection";
import LocalContractorSection from "@/components/LocalContractorSection";
import TrustBadgesSection from "@/components/TrustBadgesSection";

// Lazy load below-fold sections to reduce initial bundle size
const ComparisonSection = lazy(() => import("@/components/ComparisonSection"));
const EducationSection = lazy(() => import("@/components/EducationSection"));
const ShowerDesignToolSection = lazy(() => import("@/components/ShowerDesignToolSection"));
const BenefitsSection = lazy(() => import("@/components/BenefitsSection"));
const ProjectGallerySection = lazy(() => import("@/components/ProjectGallerySection"));
const BridgeCTASection = lazy(() => import("@/components/BridgeCTASection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const ProcessSection = lazy(() => import("@/components/ProcessSection"));
const MultiStepFormSection = lazy(() => import("@/components/MultiStepFormSection"));
const FinalCTASection = lazy(() => import("@/components/FinalCTASection"));
const Footer = lazy(() => import("@/components/Footer"));
const StickyMobileCTA = lazy(() => import("@/components/StickyMobileCTA"));

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <LocalContractorSection />
      <TrustBadgesSection />
      <Suspense fallback={null}>
        <ComparisonSection />
        <EducationSection />
        <ShowerDesignToolSection />
        <BenefitsSection />
        <ProjectGallerySection />
        <BridgeCTASection />
        <TestimonialsSection />
        <MultiStepFormSection />
        <FinalCTASection />
        <Footer />
        <StickyMobileCTA />
      </Suspense>
    </div>
  );
};

export default Index;
