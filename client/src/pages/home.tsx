import Header from "../components/header";
import Hero from "../components/hero";
import ProblemsSection from "../components/problems-section";
import PurposeSection from "../components/purpose-section";
import FeaturesSection from "../components/features-section";
import HowItWorksSection from "../components/howItWorks";
import BenefitsSection from "../components/benefits-section";
import TestimonialsSection from "../components/TestimonialsSection";
import CtaSection from "../components/cta-section";
import StatsSection from "../components/stats-section";
import Footer from "../components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <ProblemsSection />
      <PurposeSection />
      <FeaturesSection />
      <HowItWorksSection />
      <BenefitsSection />
      <TestimonialsSection />
      <CtaSection />
      <StatsSection />
      <Footer />
    </main>
  );
}
