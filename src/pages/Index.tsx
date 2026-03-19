import HeroSection from "@/components/HeroSection";
import ServiceAreaSection from "@/components/ServiceAreaSection";
import TrustBadgesSection from "@/components/TrustBadgesSection";
import ProjectGallerySection from "@/components/ProjectGallerySection";
import BenefitsSection from "@/components/BenefitsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import DesignToolSection from "@/components/DesignToolSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ServiceAreaSection />
      <TrustBadgesSection />
      <ProjectGallerySection />
      <BenefitsSection />
      <TestimonialsSection />
      <DesignToolSection />
      <Footer />
    </div>
  );
};

export default Index;
