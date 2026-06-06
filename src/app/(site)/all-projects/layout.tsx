import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Projects",
  description: "Explore Selam Children's Village projects — BEYEPP, EYE, PASEWAY, BRIDGE, BINA, LI-WAY, BBW, Qiyas, and more vocational and community development programs.",
  keywords: ["Selam projects", "BEYEPP", "youth employment", "Ethiopia", "vocational projects", "community development"],
  openGraph: {
    title: "All Projects | Selam Children's Village",
    description: "Our projects empower Ethiopian youth through skills training, employment pathways, and community development.",
  },
};

export default function AllProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
