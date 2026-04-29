import type { Metadata } from "next";
import "./globals.css";
import { organizationJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: {
    default: "Selam Children's Village",
    template: "%s | Selam Children's Village",
  },
  description:
    "Selam Children's Village is an Ethiopian non-profit organization dedicated to transforming lives through comprehensive child care, youth development, vocational training, and community support programs since 1986.",
  keywords: [
    "Selam Children's Village",
    "Ethiopian charity",
    "children's home",
    "orphan care",
    "TVET college",
    "vocational training",
    "Addis Ababa",
    "non-profit",
    "child welfare",
    "community support",
  ],
  authors: [{ name: "Selam Children's Village" }],
  creator: "Selam Children's Village",
  metadataBase: new URL("https://www.selamchildrenvillage.org"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Selam Children's Village",
    title: "Selam Children's Village",
    description:
      "Transforming lives through comprehensive child care, youth development, and vocational training since 1986.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@selamchildren",
    creator: "@selamchildren",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd()),
          }}
        />
      </body>
    </html>
  );
}

