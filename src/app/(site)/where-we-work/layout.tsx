import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Where We Work",
  description: "Selam Children's Village operates across Ethiopia — Addis Ababa, Sheno, and Welayita Sodo — providing child care, vocational training, and community support.",
  openGraph: {
    title: "Where We Work | Selam Children's Village",
    description: "Our centers across Ethiopia: Addis Ababa, Sheno, and Welayita Sodo.",
  },
};

export default function WhereWeWorkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
