import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Activities",
  description: "Recent activities at Selam Children's Village — community outreach, training programs, partner visits, celebrations, and organizational milestones.",
  keywords: ["Selam activities", "SCV programs", "community outreach", "Ethiopia charity activities"],
  openGraph: {
    title: "Activities | Selam Children's Village",
    description: "Highlights from our programs, partner visits, and community events.",
  },
};

export default function ActivitiesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
