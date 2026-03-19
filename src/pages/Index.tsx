import HeroSection from "@/components/HeroSection";
import ServiceAreaSection from "@/components/ServiceAreaSection";
import BenefitsSection from "@/components/BenefitsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ServiceAreaSection />
      <BenefitsSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default Index;
