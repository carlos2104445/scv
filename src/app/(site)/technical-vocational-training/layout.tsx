import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TVET College",
  description: "Selam Technical & Vocational College offers training across 11 departments — electrical, construction, metal manufacturing, IT, hospitality, automotive, and more.",
  keywords: ["TVET", "vocational training", "Selam College", "Ethiopia", "technical education", "skills development"],
  openGraph: {
    title: "TVET College | Selam Children's Village",
    description: "Selam Technical & Vocational College — empowering Ethiopian youth with marketable skills across 11 departments.",
  },
};

export default function TVETLayout({ children }: { children: React.ReactNode }) {
  return children;
}
