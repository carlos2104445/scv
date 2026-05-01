import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { MissionVisionSection } from "@/components/home/MissionVisionSection";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { ImpactSection } from "@/components/home/ImpactSection";
import { NewsSection } from "@/components/home/NewsSection";
import { EventsSection } from "@/components/home/EventsSection";
import { TeamSection } from "@/components/home/TeamSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { PartnersSection } from "@/components/home/PartnersSection";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <MissionVisionSection />
        <ProjectsSection />
        <ImpactSection />
        <NewsSection />
        <EventsSection />
        <TeamSection />
        <TestimonialsSection />
        <PartnersSection />
      </main>
      <Footer />
    </>
  );
}
