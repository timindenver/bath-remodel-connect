import HeroSection from "@/components/HeroSection";
import TrustBadgesSection from "@/components/TrustBadgesSection";
import ComparisonSection from "@/components/ComparisonSection";
import EducationSection from "@/components/EducationSection";
import BenefitsSection from "@/components/BenefitsSection";
import ProjectGallerySection from "@/components/ProjectGallerySection";
import BridgeCTASection from "@/components/BridgeCTASection";
import QualificationSection from "@/components/QualificationSection";
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
      <TrustBadgesSection />
      <ComparisonSection />
      <EducationSection />
      <BenefitsSection />
      <ProjectGallerySection />
      <BridgeCTASection />
      <QualificationSection />
      <TestimonialsSection />
      <ProcessSection />
      <MultiStepFormSection />
      <FinalCTASection />
      <Footer />
      <StickyMobileCTA />
    </div>
  );
};

export default Index;
