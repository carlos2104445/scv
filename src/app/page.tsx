import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { MissionVisionSection } from "@/components/home/MissionVisionSection";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { ImpactSection } from "@/components/home/ImpactSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { PartnersSection } from "@/components/home/PartnersSection";
import { WaysToHelpSection } from "@/components/home/WaysToHelpSection";
import { CTABanner } from "@/components/home/CTABanner";
import { ScrollDepthWrapper } from "@/components/global/ScrollDepthWrapper";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="bg-white overflow-hidden">
        <HeroSection />
        <ScrollDepthWrapper><MissionVisionSection /></ScrollDepthWrapper>
        <ScrollDepthWrapper><ImpactSection /></ScrollDepthWrapper>
        <ScrollDepthWrapper><ProjectsSection /></ScrollDepthWrapper>
        <ScrollDepthWrapper><TestimonialsSection /></ScrollDepthWrapper>
        <ScrollDepthWrapper><WaysToHelpSection /></ScrollDepthWrapper>
        <ScrollDepthWrapper><PartnersSection /></ScrollDepthWrapper>
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
