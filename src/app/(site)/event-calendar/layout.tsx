import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Event Calendar",
  description: "Upcoming events at Selam Children's Village — graduations, fundraisers, partner visits, training workshops, and community celebrations.",
  keywords: ["Selam events", "Ethiopia charity events", "SCV calendar", "fundraiser", "graduation"],
  openGraph: {
    title: "Event Calendar | Selam Children's Village",
    description: "Stay up to date with events, workshops, and celebrations at Selam Children's Village.",
  },
};

export default function EventCalendarLayout({ children }: { children: React.ReactNode }) {
  return children;
}
