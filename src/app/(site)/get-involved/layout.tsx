import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Involved",
  description: "Support Selam Children's Village — donate, volunteer, partner with us, or sponsor a child. Every contribution transforms lives.",
  openGraph: { title: "Get Involved | Selam Children's Village" },
};

export default function GetInvolvedLayout({ children }: { children: React.ReactNode }) {
  return children;
}
