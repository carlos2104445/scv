import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementPopup } from "@/components/global/AnnouncementPopup";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Global announcement — toggle `enabled` from admin settings */}
      <AnnouncementPopup
        enabled={false}
        config={{
          type: "text",
          title: "Welcome to Selam Children's Village",
          body: "<p>Stay tuned for exciting updates and announcements.</p>",
        }}
      />
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  );
}
