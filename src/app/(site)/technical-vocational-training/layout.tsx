import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TVET College",
  description: "Selam TVET College offers vocational training across 11 departments — electrical, construction, metal manufacturing, IT, hospitality, and more.",
  openGraph: { title: "TVET College | Selam Children's Village" },
};

export default function TVETLayout({ children }: { children: React.ReactNode }) {
  return children;
}
