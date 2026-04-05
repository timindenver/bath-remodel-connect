import HeroSection from "@/components/HeroSection";
import LocalContractorSection from "@/components/LocalContractorSection";
import TrustBadgesSection from "@/components/TrustBadgesSection";
import ComparisonSection from "@/components/ComparisonSection";
import EducationSection from "@/components/EducationSection";
import ShowerDesignToolSection from "@/components/ShowerDesignToolSection";
import BenefitsSection from "@/components/BenefitsSection";
import ProjectGallerySection from "@/components/ProjectGallerySection";
import BridgeCTASection from "@/components/BridgeCTASection";

import TestimonialsSection from "@/components/TestimonialsSection";
import ProcessSection from "@/components/ProcessSection";
import MultiStepFormSection from "@/components/MultiStepFormSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <LocalContractorSection />
      <TrustBadgesSection />
      <ComparisonSection />
      <EducationSection />
      <BenefitsSection />
      <ProjectGallerySection />
      <BridgeCTASection />
      
      <TestimonialsSection />
      <MultiStepFormSection />
      <FinalCTASection />
      <Footer />
      <StickyMobileCTA />
    </div>
  );
};

export default Index;
