import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Involved",
  description: "Support Selam Children's Village — donate, volunteer, partner with us, or sponsor a child. Every contribution transforms lives in Ethiopia.",
  keywords: ["donate", "volunteer", "sponsor child", "Ethiopia charity", "Selam Children's Village", "partner"],
  openGraph: {
    title: "Get Involved | Selam Children's Village",
    description: "Donate, volunteer, partner, or sponsor a child to support vulnerable children and communities in Ethiopia.",
  },
};

export default function GetInvolvedLayout({ children }: { children: React.ReactNode }) {
  return children;
}
