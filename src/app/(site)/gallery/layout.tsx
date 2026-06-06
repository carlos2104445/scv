import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Browse photos from Selam Children's Village — events, graduations, campus life, vocational training, and community activities in Ethiopia.",
  keywords: ["Selam gallery", "photos", "Ethiopia children", "SCV events", "campus life"],
  openGraph: {
    title: "Gallery | Selam Children's Village",
    description: "Photos from our programs, events, and daily life at Selam Children's Village.",
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
