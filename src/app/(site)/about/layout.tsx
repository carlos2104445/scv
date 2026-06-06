import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Selam Children's Village — four decades of comprehensive child care, education, and vocational training for Ethiopia's most vulnerable children since 1986.",
  keywords: ["Selam Children's Village", "about us", "Ethiopian charity", "child care", "history", "mission", "vision"],
  openGraph: {
    title: "About Selam Children's Village",
    description: "Four decades of nurturing hope and transforming lives through child care, education, and vocational training in Ethiopia.",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
