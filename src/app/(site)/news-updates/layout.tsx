import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News & Updates",
  description: "Stay informed about the latest activities, achievements, and stories of transformation from Selam Children's Village in Ethiopia.",
  keywords: ["Selam news", "Ethiopia children", "SCV updates", "vocational training news", "charity news"],
  openGraph: {
    title: "News & Updates | Selam Children's Village",
    description: "Latest news, events, and stories from Selam Children's Village — child care, vocational training, and community development in Ethiopia.",
  },
};

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
