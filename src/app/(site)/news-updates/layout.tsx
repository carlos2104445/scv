import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News & Updates",
  description: "Stay informed about the latest activities, achievements, and stories of transformation from Selam Children's Village.",
  openGraph: { title: "News & Updates | Selam Children's Village" },
};

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
