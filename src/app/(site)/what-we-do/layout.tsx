import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What We Do",
  description: "Selam Children's Village provides comprehensive child care, youth support, vocational training, and community development across Ethiopia.",
  keywords: ["Selam programs", "child care", "youth support", "CYC", "vocational training", "community development"],
  openGraph: {
    title: "What We Do | Selam Children's Village",
    description: "Child care, vocational training, and community development programs empowering vulnerable children and youth in Ethiopia.",
  },
};

export default function WhatWeDoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
