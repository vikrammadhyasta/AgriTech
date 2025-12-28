import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import StatsSection from "@/components/home/StatsSection";
import ContactSection from "@/components/home/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <FeaturedProducts />
        <StatsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
