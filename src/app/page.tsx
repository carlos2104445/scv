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
import { WaysToHelpSection } from "@/components/home/WaysToHelpSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import {
  getHeroSlides, getImpactStats, getProjects, getNews, getEvents,
  getTestimonials, getPartners, getPeople, getSettings,
} from "@/lib/api";
import { ScrollDepthWrapper } from "@/components/global/ScrollDepthWrapper";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Fetch all homepage data in parallel
  const [slides, stats, projects, newsResult, events, testimonials, partners, people, settings] =
    await Promise.all([
      getHeroSlides().catch(() => []),
      getImpactStats().catch(() => []),
      getProjects().catch(() => []),
      getNews(3).catch(() => ({ data: [], total: 0 })),
      getEvents().catch(() => []),
      getTestimonials().catch(() => []),
      getPartners().catch(() => []),
      getPeople().catch(() => []),
      getSettings().catch(() => ({} as Record<string, string>)),
    ]);

  return (
    <>
      <Header />
      <main className="bg-neutral-50 overflow-hidden">
        <HeroSection slides={slides} />
        <ScrollDepthWrapper><MissionVisionSection settings={settings} /></ScrollDepthWrapper>
        <ScrollDepthWrapper><ProjectsSection projects={projects} /></ScrollDepthWrapper>
        <ScrollDepthWrapper><ImpactSection stats={stats} /></ScrollDepthWrapper>
        <ScrollDepthWrapper><NewsSection articles={newsResult.data} /></ScrollDepthWrapper>
        <ScrollDepthWrapper><EventsSection events={events} /></ScrollDepthWrapper>
        <ScrollDepthWrapper><TeamSection people={people} /></ScrollDepthWrapper>
        <ScrollDepthWrapper><TestimonialsSection testimonials={testimonials} /></ScrollDepthWrapper>
        <ScrollDepthWrapper><WaysToHelpSection /></ScrollDepthWrapper>
        <ScrollDepthWrapper><PartnersSection partners={partners} /></ScrollDepthWrapper>
        <ScrollDepthWrapper><NewsletterSection /></ScrollDepthWrapper>
      </main>
      <Footer />
    </>
  );
}
