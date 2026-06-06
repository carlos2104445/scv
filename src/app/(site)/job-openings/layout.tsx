import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Job Openings",
  description: "Explore career opportunities at Selam Children's Village — join our team in child care, vocational training, and community development in Ethiopia.",
  keywords: ["Selam jobs", "Ethiopia NGO jobs", "SCV careers", "child care jobs", "vocational training jobs"],
  openGraph: {
    title: "Job Openings | Selam Children's Village",
    description: "Join our team — career opportunities in child care, vocational training, and community development.",
  },
};

export default function JobOpeningsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
