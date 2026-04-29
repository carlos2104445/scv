import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Selam Children's Village — four decades of comprehensive child care, education, and vocational training for Ethiopia's most vulnerable children.",
  openGraph: { title: "About Selam Children's Village", description: "Four decades of nurturing hope and transforming lives." },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
