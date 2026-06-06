import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources",
  description: "Access Selam Children's Village publications, annual reports, audit reports, newsletters, and organizational policies.",
  openGraph: {
    title: "Resources | Selam Children's Village",
    description: "Publications, reports, and organizational documents from Selam Children's Village.",
  },
};

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
