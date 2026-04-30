import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "SCV Admin", template: "%s | SCV Admin" },
  description: "Selam Children's Village — Content Management System",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
