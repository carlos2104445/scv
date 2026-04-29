import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leadership",
  description: "Meet the dedicated leaders of Selam Children's Village — executive board members, senior management, and the extended management team.",
  openGraph: { title: "Leadership | Selam Children's Village" },
};

export default function LeadershipLayout({ children }: { children: React.ReactNode }) {
  return children;
}
